import { connectToDB } from "@/lib/server-helper";
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";
import { hash } from "bcrypt";

export async function POST(req) {
  try {
    const { name, email, password, image } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Invalid data" },
        { status: 422 },
      );
    }

    await connectToDB();
    const exist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (exist) {
      return NextResponse.json(
        { success: false, message: "user already exist" },
        { status: 400 },
      );
    }

    const hashedPassword = await hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, hashedPassword, image },
    });

    return NextResponse.json({ success: true, data: user }, { status: 201 });
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
