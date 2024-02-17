import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function POST(req) {
  try {
    const body = await req.json();
    if (!body) {
      return NextResponse.json(
        { success: false, message: "Invalid data" },
        { status: 422 },
      );
    }
    await writeFile(join("/", "src/db", "DB.json"), JSON.stringify(body), {
      encoding: "utf-8",
      flag: "w",
    });
    return NextResponse.json({ success: true, data: true }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { success: false, message: "server error" },
      { status: 500 },
    );
  }
}
