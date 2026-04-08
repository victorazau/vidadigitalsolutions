import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const INDEXNOW_KEY = "b4d7e2f1a3c5968e0d2b4f7a1c3e5d8f";
const HOST = "vidadigitalsolutions.com";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { urls } = body;

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: "Missing urls array" }, { status: 400 });
    }

    // Submit to IndexNow (Bing + Yandex)
    const payload = {
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
      urlList: urls.map((u: string) => u.startsWith("http") ? u : `https://${HOST}${u}`),
    };

    const [bingRes, yandexRes] = await Promise.allSettled([
      fetch("https://www.bing.com/indexnow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }),
      fetch("https://yandex.com/indexnow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }),
    ]);

    return NextResponse.json({
      ok: true,
      bing: bingRes.status === "fulfilled" ? bingRes.value.status : "failed",
      yandex: yandexRes.status === "fulfilled" ? yandexRes.value.status : "failed",
      urlsSubmitted: payload.urlList.length,
    });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
