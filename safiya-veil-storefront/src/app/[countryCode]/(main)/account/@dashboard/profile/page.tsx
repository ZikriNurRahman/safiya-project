import { Metadata } from "next"
import ProfilePhone from "@modules/account/components/profile-phone"
import ProfileBillingAddress from "@modules/account/components/profile-billing-address"
import ProfileEmail from "@modules/account/components/profile-email"
import ProfileName from "@modules/account/components/profile-name"
import { notFound } from "next/navigation"
import { listRegions } from "@lib/data/regions"
import { retrieveCustomer } from "@lib/data/customer"

export const metadata: Metadata = {
  title: "Profil - Safiya Veil",
  description: "Lihat dan ubah informasi profil kamu.",
}

export default async function Profile() {
  const customer = await retrieveCustomer()
  const regions = await listRegions()

  if (!customer || !regions) notFound()

  return (
    <div className="w-full" data-testid="profile-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-2">
        <h1 className="text-xl font-semibold tracking-wide" style={{ color: "#1a1a1a" }}>
          Profil Saya
        </h1>
        <p className="text-sm font-light" style={{ color: "#6b6b6b" }}>
          Lihat dan perbarui informasi profil kamu, termasuk nama, email, dan nomor telepon.
        </p>
      </div>
      <div className="flex flex-col gap-y-8 w-full">
        <ProfileName customer={customer} />
        <Divider />
        <ProfileEmail customer={customer} />
        <Divider />
        <ProfilePhone customer={customer} />
        <Divider />
        <ProfileBillingAddress customer={customer} regions={regions} />
      </div>
    </div>
  )
}

const Divider = () => <div className="w-full h-px" style={{ backgroundColor: "#e8e0d5" }} />