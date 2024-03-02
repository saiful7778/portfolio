import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { captchaValue } = await req.json();
    if (!captchaValue) {
      return NextResponse.json(
        { success: false, message: "captcha not supplied" },
        { status: 422 },
      );
    }
    const { data } = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SITE_SECRET}&response=${captchaValue}`,
      {
        method: "POST",
      },
    );

    return NextResponse.json(
      {
        success: true,
        data,
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
