import { createClient } from "microcms-js-sdk"

if (!process.env.SERVICE_DOMAIN) {
  throw new Error("SERVICE_DOMAIN is not set.")
}

if (!process.env.API_KEY) {
  throw new Error("API_KEY is not set.")
}

export const microCMSClient = createClient({
  serviceDomain: process.env.SERVICE_DOMAIN,
  apiKey: process.env.API_KEY,
})
