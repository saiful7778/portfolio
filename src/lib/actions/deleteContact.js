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
      return {
        success: false,
        message: "contact doesn't exist",
      };
    }
    const data = await prisma.contact.delete({
      where: { id },
    });
    return {
      success: true,
      data,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: err,
    };
  } finally {
    await prisma.$disconnect();
  }
}
