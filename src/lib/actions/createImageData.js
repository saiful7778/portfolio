"use server";
import prisma from "../../../prisma";

export default async function createImageData(imageData) {
  try {
    const data = await prisma.images.create({
      data: imageData,
    });
    return data;
  } catch (err) {
    throw new Error(err);
  }
}
