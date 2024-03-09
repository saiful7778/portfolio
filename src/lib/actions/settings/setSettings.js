"use server";
import db from "@/lib/db";

export default async function setSettings(id, data) {
  try {
    const res = await db.settings.upsert({
      where: {
        id: id,
      },
      update: data,
      create: data,
    });
    if (!res) {
      throw "Data can not created";
    }
    return res;
  } catch (err) {
    throw new Error(err);
  }
}
