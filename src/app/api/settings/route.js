import { readFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function GET() {
  const dataFilePath = path.join(process.cwd(), "settings/data.json");
  try {
    const data = await readFile(dataFilePath, {
      encoding: "utf-8",
      flag: "r",
    });
    return NextResponse.json(
      {
        success: true,
        data: JSON.parse(data),
      },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { success: false, message: "server error" },
      { status: 500 },
    );
  }
}
