import db from "@/lib/db";

export default async function getAssets() {
  try {
    const assets = await db.images.findMany();
    return assets;
  } catch (err) {
    throw new Error(err);
  }
}
