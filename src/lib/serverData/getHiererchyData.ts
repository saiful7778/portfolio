import db from "@/lib/db";
import type { pathDataType } from "@/lib/staticData";

export default async function getHiererchyData() {
  try {
    const hiererchyData = await db.hiererchy.findFirst();
    if (!hiererchyData) {
      throw new Error("Hiererchy data not found");
    }
    const data = hiererchyData?.hiererchyData as pathDataType[];
    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
}
