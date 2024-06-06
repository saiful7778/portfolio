import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(function middleware(req) {
  const isAuth = !!req.nextauth;

  if (!isAuth) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
  return null;
});

export const config = { matcher: ["/dashboard"] };
