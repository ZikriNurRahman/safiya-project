import { HttpTypes } from "@medusajs/types"
import { NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.MEDUSA_BACKEND_URL
const PUBLISHABLE_API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
// ← Ganti default dari "us" ke "id"
const DEFAULT_REGION = process.env.NEXT_PUBLIC_DEFAULT_REGION || "id"

const regionMapCache = {
  regionMap: new Map<string, HttpTypes.StoreRegion>(),
  regionMapUpdated: 0, // ← Set 0 agar selalu refetch saat pertama kali
}

async function getRegionMap(cacheId: string) {
  const { regionMap, regionMapUpdated } = regionMapCache

  if (!BACKEND_URL) {
    throw new Error("MEDUSA_BACKEND_URL not set")
  }

  // Cache selama 30 menit (bukan 1 jam) agar lebih cepat update
  const CACHE_TTL = 30 * 60 * 1000

  if (
    !regionMap.keys().next().value ||
    regionMapUpdated < Date.now() - CACHE_TTL
  ) {
    try {
      const { regions } = await fetch(`${BACKEND_URL}/store/regions`, {
        headers: {
          "x-publishable-api-key": PUBLISHABLE_API_KEY!,
        },
        // Tidak pakai force-cache agar selalu fresh dari backend
        cache: "no-store",
      }).then(async (response) => {
        const json = await response.json()
        if (!response.ok) throw new Error(json.message)
        return json
      })

      if (!regions?.length) {
        throw new Error("No regions found in Medusa Admin")
      }

      // Reset map sebelum rebuild
      regionMapCache.regionMap.clear()
      regions.forEach((region: HttpTypes.StoreRegion) => {
        region.countries?.forEach((c) => {
          regionMapCache.regionMap.set(c.iso_2 ?? "", region)
        })
      })
      regionMapCache.regionMapUpdated = Date.now()
    } catch (err) {
      console.error("[Middleware] Failed to fetch regions:", err)
      // Kalau gagal fetch, return map yang ada (mungkin masih ada isinya)
    }
  }

  return regionMapCache.regionMap
}

async function getCountryCode(
  request: NextRequest,
  regionMap: Map<string, HttpTypes.StoreRegion | number>
) {
  try {
    let countryCode

    const vercelCountryCode = request.headers
      .get("x-vercel-ip-country")
      ?.toLowerCase()

    const urlCountryCode = request.nextUrl.pathname
      .split("/")[1]
      ?.toLowerCase()

    if (urlCountryCode && regionMap.has(urlCountryCode)) {
      countryCode = urlCountryCode
    } else if (vercelCountryCode && regionMap.has(vercelCountryCode)) {
      countryCode = vercelCountryCode
    } else if (regionMap.has(DEFAULT_REGION)) {
      countryCode = DEFAULT_REGION
    } else if (regionMap.keys().next().value) {
      countryCode = regionMap.keys().next().value
    }

    return countryCode
  } catch (error) {
    console.error("[Middleware] Error getting country code:", error)
  }
}

export async function middleware(request: NextRequest) {
  let redirectUrl = request.nextUrl.href
  let response = NextResponse.redirect(redirectUrl, 307)

  let cacheIdCookie = request.cookies.get("_medusa_cache_id")
  let cacheId = cacheIdCookie?.value || crypto.randomUUID()

  try {
    const regionMap = await getRegionMap(cacheId)
    const countryCode = regionMap && (await getCountryCode(request, regionMap))

    const urlHasCountryCode =
      countryCode &&
      request.nextUrl.pathname.split("/")[1].includes(countryCode)

    if (urlHasCountryCode && cacheIdCookie) {
      return NextResponse.next()
    }

    if (urlHasCountryCode && !cacheIdCookie) {
      response.cookies.set("_medusa_cache_id", cacheId, {
        maxAge: 60 * 60 * 24,
      })
      return response
    }

    if (request.nextUrl.pathname.includes(".")) {
      return NextResponse.next()
    }

    const redirectPath =
      request.nextUrl.pathname === "/" ? "" : request.nextUrl.pathname
    const queryString = request.nextUrl.search ? request.nextUrl.search : ""

    if (!urlHasCountryCode && countryCode) {
      redirectUrl = `${request.nextUrl.origin}/${countryCode}${redirectPath}${queryString}`
      response = NextResponse.redirect(`${redirectUrl}`, 307)
    } else if (!urlHasCountryCode && !countryCode) {
      return new NextResponse(
        "No valid regions found. Please set up regions in Medusa Admin.",
        { status: 500 }
      )
    }

    return response
  } catch (err) {
    console.error("[Middleware] Error:", err)
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|assets|png|svg|jpg|jpeg|gif|webp).*)",
  ],
}