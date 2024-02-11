import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";
import { connectToDB } from "@/lib/server-helper";

export async function GET() {
  try {
    await connectToDB();
    const projects = await prisma.project.findMany();
    return NextResponse.json(
      { success: true, data: projects },
      { status: 200 },
    );
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
