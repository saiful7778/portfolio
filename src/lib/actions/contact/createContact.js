"use server";
import db from "@/lib/db";

export default async function createContact(contactData) {
  try {
    await db.contact.create({
      data: contactData,
    });
  } catch (err) {
    throw new Error(err);
  }
}
