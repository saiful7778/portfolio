"use server";
import db from "@/lib/db";

export default async function deleteUser(id) {
  try {
    const existUser = await db.user.findFirst({
      where: { id },
    });
    if (!existUser) {
      throw new Error("User doesn't exist");
    }
    await db.user.delete({
      where: { id },
    });
  } catch (err) {
    throw new Error(err);
  }
}
