import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "../db/schema";

const sql = neon(
  "postgresql://neondb_owner:HBN8ZO4aisIv@ep-flat-truth-a53xbhhf.us-east-2.aws.neon.tech/neondb?sslmode=require"
);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Resetting database");
    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.userSubscription);

    


    console.log("Reset finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();
