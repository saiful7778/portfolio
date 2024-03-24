"use server";
import db from "@/lib/db";

export default async function createImageData(imageData) {
  try {
    if (!imageData?.url || !imageData?.alt) {
      throw "Invalid input data";
    }
    const data = await db.images.create({
      data: imageData,
    });
    return data;
  } catch (err) {
    throw new Error(err);
  }
}
