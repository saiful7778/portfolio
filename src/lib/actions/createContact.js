"use server";
import prisma from "../../../prisma";
import { connectToDB } from "../server-helper";

export default async function createContact(contactData) {
  try {
    await connectToDB();
    await prisma.contact.create({
      data: contactData,
    });
  } catch (err) {
    throw new Error(err);
  } finally {
    await prisma.$disconnect();
  }
}
