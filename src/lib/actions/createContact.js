"use server";
import prisma from "../../../prisma";
import { connectToDB } from "../server-helper";

export default async function createContact(contactData) {
  try {
    await connectToDB();
    const data = await prisma.contact.create({
      data: contactData,
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
