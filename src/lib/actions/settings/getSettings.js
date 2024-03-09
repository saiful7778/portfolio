"use server";
import db from "@/lib/db";

export default async function getSettings() {
  try {
    const settings = await db.settings.findMany();
    if (!settings) {
      throw "No data available";
    }
    return settings[0];
  } catch (err) {
    throw new Error(err);
  }
}
