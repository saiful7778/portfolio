import db from "@/lib/db";
import { pathDataType } from "@/lib/createAppDirHierarchy";

export default async function getHiererchyData() {
  try {
    const hiererchyData = await db.hiererchy.findFirst();
    if (!hiererchyData) {
      throw new Error("Hiererchy data not found");
    }
    const data: pathDataType[] | undefined = hiererchyData?.hiererchyData as
      | pathDataType[]
      | undefined;

    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
}
