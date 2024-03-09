"use server";
import db from "@/lib/db";

export default async function deleteUser(id) {
  try {
    const existUser = await db.user.findUnique({
      where: { id },
    });
    if (!existUser) {
      throw "User doesn't exist";
    }
    await db.user.delete({
      where: { id },
    });
  } catch (err) {
    throw new Error(err);
  }
}
