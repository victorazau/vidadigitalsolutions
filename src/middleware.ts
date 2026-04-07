import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PIXEL_ID = "1241390329847733";
const API_VERSION = "v21.0";
const META_ENDPOINT = `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events`;

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Set country cookie for locale detection
  if (!request.cookies.get("vds_country")) {
    const country = request.headers.get("cf-ipcountry") || "US";
    response.cookies.set("vds_country", country, {
      path: "/",
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    });
  }

  // Server-side Meta CAPI PageView (fire and forget)
  const accessToken = process.env.META_CAPI_TOKEN;
  if (accessToken) {
    const ipAddress = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for") || undefined;
    const userAgent = request.headers.get("user-agent") || undefined;
    const country = request.headers.get("cf-ipcountry") || undefined;
    const fbc = request.cookies.get("_fbc")?.value;
    const fbp = request.cookies.get("_fbp")?.value;
    const url = request.nextUrl.href;

    // Non-blocking: don't await
    fetch(`${META_ENDPOINT}?access_token=${accessToken}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [{
          event_name: "PageView",
          event_time: Math.floor(Date.now() / 1000),
          action_source: "website",
          event_source_url: url,
          user_data: {
            ...(ipAddress && { client_ip_address: ipAddress }),
            ...(userAgent && { client_user_agent: userAgent }),
            ...(fbc && { fbc }),
            ...(fbp && { fbp }),
            ...(country && { country: [country.toLowerCase()] }),
          },
        }],
      }),
    }).catch(() => {});
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icons|logos|api|.*\\.png|.*\\.jpg|.*\\.svg|.*\\.txt|.*\\.xml).*)",
  ],
};
