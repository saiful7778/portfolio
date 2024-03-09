import db from "@/lib/db";

export default async function getSettings() {
  try {
    const settingsArray = await db.settings.findMany();
    const settings = settingsArray[0];
    if (!settings) {
      throw "No settings data are available";
    }
    return settings;
  } catch (err) {
    throw new Error(err);
  }
}
