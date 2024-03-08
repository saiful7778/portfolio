import db from "@/lib/db";

export default async function getUsers() {
  try {
    const users = await db.user.findMany();
    return users;
  } catch (err) {
    throw new Error(err);
  }
}
