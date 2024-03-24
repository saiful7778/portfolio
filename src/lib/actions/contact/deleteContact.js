"use server";
import db from "@/lib/db";

export default async function deleteContact(id) {
  try {
    if (!id) {
      throw "Invalid input data";
    }
    const exitContact = await db.contact.findUnique({
      where: { id },
    });
    if (!exitContact) {
      throw "contact doesn't exist";
    }
    const data = await db.contact.delete({
      where: { id },
    });
    return data;
  } catch (err) {
    throw new Error(err);
  }
}
