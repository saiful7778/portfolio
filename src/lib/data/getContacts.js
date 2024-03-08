import db from "@/lib/db";

export default async function getContacts() {
  try {
    const contacts = await db.contact.findMany();
    return contacts;
  } catch (err) {
    throw new Error(err);
  }
}
