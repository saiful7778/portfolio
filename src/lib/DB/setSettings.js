"use server";
import prisma from "../../../prisma";

export default async function setSettings(id, data) {
  try {
    const res = await prisma.settings.upsert({
      where: {
        id: id,
      },
      update: data,
      create: data,
    });
    if (!res) {
      throw new Error("Data can not created");
    }
    return res;
  } catch (err) {
    throw new Error(err);
  }
}
