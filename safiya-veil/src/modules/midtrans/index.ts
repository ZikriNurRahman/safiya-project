import { ModuleProvider, Modules } from "@medusajs/framework/utils"
import MidtransPaymentService from "./service"

// ✅ PERUBAHAN: Menggunakan ModuleProvider khusus untuk PAYMENT
export default ModuleProvider(Modules.PAYMENT, {
  services: [MidtransPaymentService],
})