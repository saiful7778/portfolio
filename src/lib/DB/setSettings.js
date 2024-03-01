"use server";
import prisma from "../../../prisma";
import { connectToDB } from "../server-helper";

export default async function setSettings(id, data) {
  try {
    await connectToDB();
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
  } finally {
    await prisma.$disconnect();
  }
}
