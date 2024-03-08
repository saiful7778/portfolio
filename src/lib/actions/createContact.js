"use server";
import prisma from "../../../prisma";

export default async function createContact(contactData) {
  try {
    await prisma.contact.create({
      data: contactData,
    });
  } catch (err) {
    throw new Error(err);
  }
}
