"use server";
import db from "@/lib/db";
import sendMail from "@/lib/sendMail";
import crypto from "crypto";

export default async function sendVerifyEmail(email: string) {
  try {
    const cryptoToken: string = crypto.randomBytes(32).toString("hex");
    const user = await db.user.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
      },
    });
    const token = await db.token.create({
      data: {
        expires: BigInt(Date.now() + 2 * 60 * 60 * 1000),
        userId: String(user?.id),
        token: cryptoToken,
      },
    });

    await sendMail({
      email: String(user?.email),
      subject: "Email verification",
      body: `<p>Click <a href="${process.env.NEXT_PUBLIC_DOMAIN}/verify?token=${token.token}&id=${user?.id}">here</a> to verify your email</p>`,
    });
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
}
