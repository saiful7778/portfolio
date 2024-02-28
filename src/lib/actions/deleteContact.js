"use server";
import { connectToDB } from "@/lib/server-helper";
import prisma from "../../../prisma";

export default async function deleteContact(id) {
  try {
    await connectToDB();
    const exitContact = await prisma.contact.findFirst({
      where: { id },
    });
    if (!exitContact) {
      throw new Error("contact doesn't exist");
    }
    const data = await prisma.contact.delete({
      where: { id },
    });
    return data;
  } catch (err) {
    throw new Error(err);
  } finally {
    await prisma.$disconnect();
  }
}
