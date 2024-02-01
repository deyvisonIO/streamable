import { envSchema } from "./schema.mjs"

export const env = envSchema.parse(process.env)
