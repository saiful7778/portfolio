"use server";
import db from "../../db";

export default async function verifyToken(token: string, id: string) {
  try {
    const dbToken = await db.token.findFirst({
      where: {
        token,
      },
    });
    if (!dbToken) {
      throw new Error("Token is unavailable");
    }
    if (dbToken.expires < BigInt(Date.now())) {
      throw new Error("Token is expire");
    }
    const [user, deleteToken] = await db.$transaction([
      db.user.update({
        where: {
          id,
        },
        data: {
          isVerified: true,
        },
      }),
      db.token.delete({
        where: {
          userId: id,
          token: token,
        },
      }),
    ]);
    return {
      isVerified: user.isVerified,
      token: deleteToken.id,
    };
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
}
