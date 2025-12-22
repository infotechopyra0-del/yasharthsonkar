import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
    const isLoginPage = req.nextUrl.pathname === "/admin/login";

    // If user is on login page and has valid token, redirect to dashboard
    if (isLoginPage && token) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }

    // If user is on admin route (not login) and has no token, redirect to login
    if (isAdminRoute && !isLoginPage && !token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
        const isLoginPage = req.nextUrl.pathname === "/admin/login";

        // Allow access to login page without token
        if (isLoginPage) {
          return true;
        }

        // Require token for all other admin routes
        if (isAdminRoute) {
          return !!token;
        }

        // Allow all other routes
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};