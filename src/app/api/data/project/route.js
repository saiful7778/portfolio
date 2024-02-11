import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";
import { connectToDB } from "@/lib/server-helper";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      thumbnail: { url, alt },
      title,
      slug,
      status,
      githubLink,
      liveLink,
      shortDes,
      des,
      projectTime,
    } = body;

    if (
      !url ||
      !alt ||
      !title ||
      !slug ||
      !status ||
      !githubLink ||
      !liveLink ||
      !shortDes ||
      !des ||
      !projectTime
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid data" },
        { status: 422 },
      );
    }

    await connectToDB();
    const existProject = await prisma.project.findUnique({
      where: {
        slug,
      },
    });
    if (existProject) {
      return NextResponse.json(
        { success: false, message: "Project already exist" },
        { status: 400 },
      );
    }

    const project = await prisma.project.create({
      data: body,
    });

    return NextResponse.json({ success: true, data: project }, { status: 201 });
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

export async function GET(req) {
  try {
    const userId = await req.nextUrl;
    console.log(userId);

    // if(!userId){
    //   return NextResponse.json(
    //     { success: false, message: "Invalid data" },
    //     { status: 422 },
    //   );
    // }

    // await connectToDB()
    // const project = await prisma.post.fintFirst({
    //   where:{
    //     id:
    //   }
    // })
    return NextResponse.json({ success: true, data: "" }, { status: 200 });
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
