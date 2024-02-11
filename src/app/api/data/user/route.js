import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";
import { connectToDB } from "@/lib/server-helper";

export async function PATCH(req) {
  try {
    const { query, data } = await req.json();

    if (!query.id || !query.email) {
      return NextResponse.json(
        { success: false, message: "Invalid data" },
        { status: 422 },
      );
    }

    if (data?.email || data?.id) {
      return NextResponse.json(
        { success: false, message: "You can't update email or id!" },
        { status: 422 },
      );
    }

    await connectToDB();

    const exitUser = await prisma.user.findFirst({
      where: { id: query.id, email: query.email },
    });

    if (!exitUser) {
      return NextResponse.json(
        { success: false, message: "No data found" },
        { status: 404 },
      );
    }
    const user = await prisma.user.update({
      where: {
        id: query.id,
        email: query.email,
      },
      data: data,
    });

    return NextResponse.json({ success: true, data: user }, { status: 200 });
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

export async function DELETE(req) {
  try {
    const userId = await req.nextUrl.searchParams.get("id");

    if (!userId || userId === "undefined") {
      return NextResponse.json(
        { success: false, message: "Invalid data" },
        { status: 422 },
      );
    }

    await connectToDB();
    const exitUser = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!exitUser) {
      return NextResponse.json(
        { success: false, message: "No data found" },
        { status: 404 },
      );
    }

    const data = await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json({ success: true, data: data }, { status: 200 });
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
