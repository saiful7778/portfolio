"use server";
import db from "@/lib/db";

export default async function deleteContact(id) {
  try {
    const exitContact = await db.contact.findFirst({
      where: { id },
    });
    if (!exitContact) {
      throw new Error("contact doesn't exist");
    }
    const data = await db.contact.delete({
      where: { id },
    });
    return data;
  } catch (err) {
    throw new Error(err);
  }
}
