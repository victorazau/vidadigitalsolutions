import { NextRequest, NextResponse } from "next/server";
import { sendMetaEvent } from "@/lib/meta-capi";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventName, sourceUrl, customData } = body;

    if (!eventName) {
      return NextResponse.json({ error: "Missing eventName" }, { status: 400 });
    }

    const ipAddress =
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-forwarded-for") ||
      undefined;
    const userAgent = request.headers.get("user-agent") || undefined;
    const country = request.headers.get("cf-ipcountry") || undefined;

    // Read Meta cookies from request
    const fbc = request.cookies.get("_fbc")?.value;
    const fbp = request.cookies.get("_fbp")?.value;

    await sendMetaEvent({
      eventName,
      sourceUrl: sourceUrl || request.headers.get("referer") || "https://vidadigitalsolutions.com",
      ipAddress,
      userAgent,
      fbc,
      fbp,
      country,
      customData,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
