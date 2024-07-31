import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema.ts",
  dbCredentials: {
    url: "postgresql://neondb_owner:HBN8ZO4aisIv@ep-flat-truth-a53xbhhf.us-east-2.aws.neon.tech/neondb?sslmode=require",
  },
});
