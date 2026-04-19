import { ExecArgs } from "@medusajs/framework/types"
import {
  ContainerRegistrationKeys,
  Modules,
} from "@medusajs/framework/utils"
import {
  createRegionsWorkflow,
  createShippingOptionsWorkflow,
  createShippingProfilesWorkflow,
  createStockLocationsWorkflow,
  createSalesChannelsWorkflow,
  createTaxRegionsWorkflow,
  linkSalesChannelsToStockLocationWorkflow,
  updateStoresWorkflow,
} from "@medusajs/medusa/core-flows"

export default async function setupIndonesia({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const link = container.resolve(ContainerRegistrationKeys.LINK)
  const fulfillmentModuleService = container.resolve(Modules.FULFILLMENT)
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL)
  const storeModuleService = container.resolve(Modules.STORE)
  const regionModuleService = container.resolve(Modules.REGION)

  const [store] = await storeModuleService.listStores()

  // ─── 1. Update store currency to support IDR ───
  logger.info("Updating store to support IDR...")
  await updateStoresWorkflow(container).run({
    input: {
      selector: { id: store.id },
      update: {
        supported_currencies: [
          { currency_code: "idr", is_default: true },
          { currency_code: "usd", is_default: false },
        ],
      },
    },
  })
  logger.info("✅ Store updated with IDR support")

  // ─── 2. Buat atau ambil Region Indonesia ───
  logger.info("Setting up Indonesia region...")
  const existingRegions = await regionModuleService.listRegions({
    name: "Indonesia",
  })

  let region: any
  if (existingRegions.length > 0) {
    region = existingRegions[0]
    logger.info(`✅ Found existing Indonesia region: ${region.id}`)
  } else {
    const { result: regionResult } = await createRegionsWorkflow(container).run({
      input: {
        regions: [
          {
            name: "Indonesia",
            currency_code: "idr",
            countries: ["id"],      // ← Kode negara Indonesia
            payment_providers: ["pp_system_default"],
          },
        ],
      },
    })
    region = regionResult[0]
    logger.info(`✅ Created Indonesia region: ${region.id}`)
  }

  // ─── 3. Tax region untuk Indonesia ───
  logger.info("Setting up tax regions...")
  try {
    await createTaxRegionsWorkflow(container).run({
      input: [{ country_code: "id", provider_id: "tp_system" }],
    })
    logger.info("✅ Tax region created for Indonesia")
  } catch {
    logger.info("ℹ️ Tax region already exists, skipping...")
  }

  // ─── 4. Default Sales Channel ───
  logger.info("Setting up sales channel...")
  let salesChannels = await salesChannelModuleService.listSalesChannels({
    name: "Default Sales Channel",
  })

  if (!salesChannels.length) {
    const { result } = await createSalesChannelsWorkflow(container).run({
      input: {
        salesChannelsData: [{ name: "Default Sales Channel" }],
      },
    })
    salesChannels = result
  }
  const defaultSalesChannel = salesChannels[0]
  logger.info(`✅ Sales channel: ${defaultSalesChannel.id}`)

  // ─── 5. Warehouse Indonesia ───
  logger.info("Creating Indonesia warehouse...")
  const existingLocations = await container
    .resolve(Modules.STOCK_LOCATION)
    .listStockLocations({ name: "Gudang Indonesia" })

  let stockLocation: any
  if (existingLocations.length > 0) {
    stockLocation = existingLocations[0]
    logger.info(`✅ Found existing warehouse: ${stockLocation.id}`)
  } else {
    const { result: locationResult } = await createStockLocationsWorkflow(
      container
    ).run({
      input: {
        locations: [
          {
            name: "Gudang Indonesia",
            address: {
              city: "Jakarta",
              country_code: "ID",
              address_1: "Jl. Indonesia No. 1",
            },
          },
        ],
      },
    })
    stockLocation = locationResult[0]
    logger.info(`✅ Created warehouse: ${stockLocation.id}`)
  }

  // Update store default location
  await updateStoresWorkflow(container).run({
    input: {
      selector: { id: store.id },
      update: { default_location_id: stockLocation.id },
    },
  })

  // Link sales channel ke stock location
  await linkSalesChannelsToStockLocationWorkflow(container).run({
    input: { id: stockLocation.id, add: [defaultSalesChannel.id] },
  })

  // Link fulfillment provider ke stock location
  try {
    await link.create({
      [Modules.STOCK_LOCATION]: { stock_location_id: stockLocation.id },
      [Modules.FULFILLMENT]: { fulfillment_provider_id: "manual_manual" },
    })
  } catch {
    logger.info("ℹ️ Stock location already linked to fulfillment provider")
  }

  // ─── 6. Shipping Profile ───
  logger.info("Setting up shipping profile...")
  const existingProfiles = await fulfillmentModuleService.listShippingProfiles({
    type: "default",
  })

  let shippingProfile = existingProfiles[0]
  if (!shippingProfile) {
    const { result } = await createShippingProfilesWorkflow(container).run({
      input: { data: [{ name: "Default Shipping Profile", type: "default" }] },
    })
    shippingProfile = result[0]
  }
  logger.info(`✅ Shipping profile: ${shippingProfile.id}`)

  // ─── 7. Fulfillment Set dengan Indonesia geo zone ───
  logger.info("Creating fulfillment set for Indonesia...")
  const existingSets = await fulfillmentModuleService.listFulfillmentSets({
    name: "Pengiriman Indonesia",
  })

  let fulfillmentSet: any
  if (existingSets.length > 0) {
    fulfillmentSet = existingSets[0]
    logger.info(`✅ Found existing fulfillment set: ${fulfillmentSet.id}`)
  } else {
    fulfillmentSet = await fulfillmentModuleService.createFulfillmentSets({
      name: "Pengiriman Indonesia",
      type: "shipping",
      service_zones: [
        {
          name: "Indonesia",
          geo_zones: [
            {
              country_code: "id",  // ← Indonesia
              type: "country",
            },
          ],
        },
      ],
    })
    logger.info(`✅ Created fulfillment set: ${fulfillmentSet.id}`)
  }

  // Link warehouse ke fulfillment set
  try {
    await link.create({
      [Modules.STOCK_LOCATION]: { stock_location_id: stockLocation.id },
      [Modules.FULFILLMENT]: { fulfillment_set_id: fulfillmentSet.id },
    })
  } catch {
    logger.info("ℹ️ Already linked")
  }

  // ─── 8. Shipping Options dengan harga IDR ───
  logger.info("Creating shipping options...")
  const serviceZoneId = fulfillmentSet.service_zones?.[0]?.id

  if (!serviceZoneId) {
    logger.error("❌ No service zone found!")
    return
  }

  try {
    await createShippingOptionsWorkflow(container).run({
      input: [
        {
          name: "Reguler (3-5 hari)",
          price_type: "flat",
          provider_id: "manual_manual",
          service_zone_id: serviceZoneId,
          shipping_profile_id: shippingProfile.id,
          type: {
            label: "Reguler",
            description: "Estimasi tiba 3-5 hari kerja",
            code: "regular",
          },
          prices: [
            {
              currency_code: "idr",
              amount: 15000,  // Rp 15.000
            },
            {
              region_id: region.id,
              amount: 15000,
            },
          ],
          rules: [
            { attribute: "enabled_in_store", value: "true", operator: "eq" },
            { attribute: "is_return", value: "false", operator: "eq" },
          ],
        },
        {
          name: "Express (1-2 hari)",
          price_type: "flat",
          provider_id: "manual_manual",
          service_zone_id: serviceZoneId,
          shipping_profile_id: shippingProfile.id,
          type: {
            label: "Express",
            description: "Estimasi tiba 1-2 hari kerja",
            code: "express",
          },
          prices: [
            {
              currency_code: "idr",
              amount: 35000,  // Rp 35.000
            },
            {
              region_id: region.id,
              amount: 35000,
            },
          ],
          rules: [
            { attribute: "enabled_in_store", value: "true", operator: "eq" },
            { attribute: "is_return", value: "false", operator: "eq" },
          ],
        },
        {
          name: "Same Day (hari ini)",
          price_type: "flat",
          provider_id: "manual_manual",
          service_zone_id: serviceZoneId,
          shipping_profile_id: shippingProfile.id,
          type: {
            label: "Same Day",
            description: "Tiba di hari yang sama (area tertentu)",
            code: "same_day",
          },
          prices: [
            {
              currency_code: "idr",
              amount: 60000,  // Rp 60.000
            },
            {
              region_id: region.id,
              amount: 60000,
            },
          ],
          rules: [
            { attribute: "enabled_in_store", value: "true", operator: "eq" },
            { attribute: "is_return", value: "false", operator: "eq" },
          ],
        },
      ],
    })
    logger.info("✅ Shipping options created!")
  } catch (err: any) {
    logger.error(`❌ Error creating shipping options: ${err.message}`)
  }

  // ─── 9. Midtrans sebagai payment provider di region ───
  logger.info("Adding Midtrans to Indonesia region...")
  try {
    // ✅ PERUBAHAN: Gunakan Link Module untuk menghubungkan Region dengan Payment Provider
    await link.create({
      [Modules.REGION]: { region_id: region.id },
      [Modules.PAYMENT]: { payment_provider_id: "pp_midtrans_midtrans" },
    })
    
    await link.create({
      [Modules.REGION]: { region_id: region.id },
      [Modules.PAYMENT]: { payment_provider_id: "pp_system_default" },
    })

    logger.info("✅ Midtrans and default payment added to Indonesia region")
  } catch (err: any) {
    // Kalau sudah pernah di-link sebelumnya, dia akan masuk ke catch ini (aman)
    logger.info(`ℹ️ Info / Already linked: ${err.message}`)
  }

  logger.info("🎉 Setup Indonesia selesai!")
  logger.info(`Region ID baru: ${region.id}`)
  logger.info("Sekarang update .env.local storefront dengan:")
  logger.info("NEXT_PUBLIC_DEFAULT_REGION=id")
}