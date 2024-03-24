"use server";
import db from "@/lib/db";
import { settingsSchema } from "@/schemas/settings";

export default async function setSettings(id, data) {
  try {
    const isValid = await settingsSchema.isValid(data);
    if (!id || !isValid) {
      throw "Invalid input data";
    }
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
