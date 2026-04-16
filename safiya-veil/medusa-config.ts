import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  modules: [
  {
    resolve: "@medusajs/medusa/payment",
    options: {
      providers: [
        {
          resolve: "./src/modules/midtrans", // Jalur ke folder modul kita
          id: "midtrans", // Harus sama dengan identifier di service.ts
          options: {
              serverKey: process.env.MIDTRANS_SERVER_KEY || "",
              clientKey: process.env.MIDTRANS_CLIENT_KEY || "",
              isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
            },
        },
      ],
    },
  },
],
})
