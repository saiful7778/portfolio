"use server";
import { connectToDB } from "@/lib/server-helper";
import prisma from "../../../prisma";

export default async function deleteImageData(id) {
  try {
    await connectToDB();
    const exitContact = await prisma.images.findFirst({
      where: { id },
    });
    if (!exitContact) {
      throw new Error("Image doesn't exist");
    }
    const data = await prisma.images.delete({
      where: { id },
    });
    return data;
  } catch (err) {
    throw new Error(err);
  } finally {
    await prisma.$disconnect();
  }
}
