"use server";
import db from "@/lib/db";
import { contactSchema } from "@/schemas/contact";

export default async function createContact(contactData) {
  try {
    const isValid = await contactSchema.isValid(contactData);
    if (!isValid) {
      throw "Invalid input data";
    }
    await db.contact.create({
      data: contactData,
    });
  } catch (err) {
    throw new Error(err);
  }
}
