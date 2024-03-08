"use server";
import db from "@/lib/db";

export default async function deleteImageData(id) {
  try {
    const exitContact = await db.images.findFirst({
      where: { id },
    });
    if (!exitContact) {
      throw new Error("Image doesn't exist");
    }
    const data = await db.images.delete({
      where: { id },
    });
    return data;
  } catch (err) {
    throw new Error(err);
  }
}
