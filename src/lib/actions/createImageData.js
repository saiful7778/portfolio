"use server";
import prisma from "../../../prisma";
import { connectToDB } from "../server-helper";

export default async function createImageData(imageData) {
  try {
    await connectToDB();
    const data = await prisma.images.create({
      data: imageData,
    });
    return data;
  } catch (err) {
    throw new Error(err);
  } finally {
    await prisma.$disconnect();
  }
}
