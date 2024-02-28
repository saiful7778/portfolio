import prisma from "../../prisma";

export async function connectToDB() {
  try {
    await prisma.$connect();
  } catch (err) {
    throw new Error("unable to connect to database");
  }
}
