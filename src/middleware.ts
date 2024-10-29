import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Access the user's session
    const token = req.nextauth.token;

    // If there is no token, redirect to the login page
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Allow access if token is present
    return NextResponse.next();
  },
  {
    callbacks: {
      // Specify the URL patterns to protect with this middleware
      authorized: ({ token }) => !!token, // Only allow if the user has a token
    },
  },
);

export const config = {
  matcher: ["/admin/:path*"], // List of paths to protect
};
