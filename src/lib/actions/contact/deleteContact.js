"use server";
import prisma from "../../../../prisma";

export default async function deleteContact(id) {
  try {
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
  }
}
