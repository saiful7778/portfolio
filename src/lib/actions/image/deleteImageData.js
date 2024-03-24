"use server";
import db from "@/lib/db";

export default async function deleteImageData(id) {
  try {
    if (!id) {
      throw "Invalid input data";
    }
    const exitContact = await db.images.findUnique({
      where: { id },
    });
    if (!exitContact) {
      throw "Image doesn't exist";
    }
    const data = await db.images.delete({
      where: { id },
    });
    return data;
  } catch (err) {
    throw new Error(err);
  }
}
