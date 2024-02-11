import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";
import { connectToDB } from "@/lib/server-helper";

export async function GET() {
  try {
    await connectToDB();
    const users = await prisma.user.findMany();
    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { success: false, message: "server error" },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
