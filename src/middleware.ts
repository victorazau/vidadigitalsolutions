import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Only set country cookie if not already set
  if (!request.cookies.get("vds_country")) {
    // Cloudflare injects this header automatically
    const country = request.headers.get("cf-ipcountry") || "US";
    response.cookies.set("vds_country", country, {
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: [
    // Run on all pages except static files and api
    "/((?!_next/static|_next/image|favicon.ico|icons|logos|.*\\.png|.*\\.jpg|.*\\.svg|.*\\.txt).*)",
  ],
};
