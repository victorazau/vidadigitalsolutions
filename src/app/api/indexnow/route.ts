import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const INDEXNOW_KEY = "b4d7e2f1a3c5968e0d2b4f7a1c3e5d8f";
const HOST = "vidadigitalsolutions.com";
const GOOGLE_INDEXING_SCOPE = "https://www.googleapis.com/auth/indexing";

type ServiceAccount = {
  client_email: string;
  private_key: string;
  token_uri?: string;
};

/* ── Utils for JWT signing in Edge Runtime ─────────────────────── */

function base64UrlEncode(input: string | ArrayBuffer): string {
  const bytes =
    typeof input === "string"
      ? new TextEncoder().encode(input)
      : new Uint8Array(input);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function pemToArrayBuffer(pem: string): ArrayBuffer {
  const b64 = pem
    .replace(/-----BEGIN [^-]+-----/g, "")
    .replace(/-----END [^-]+-----/g, "")
    .replace(/\s+/g, "");
  const binary = atob(b64);
  const buf = new ArrayBuffer(binary.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < binary.length; i++) view[i] = binary.charCodeAt(i);
  return buf;
}

async function getGoogleAccessToken(sa: ServiceAccount): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const claim = {
    iss: sa.client_email,
    scope: GOOGLE_INDEXING_SCOPE,
    aud: sa.token_uri || "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };

  const unsigned = `${base64UrlEncode(JSON.stringify(header))}.${base64UrlEncode(
    JSON.stringify(claim),
  )}`;

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    pemToArrayBuffer(sa.private_key),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const sigBytes = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    new TextEncoder().encode(unsigned),
  );

  const jwt = `${unsigned}.${base64UrlEncode(sigBytes)}`;

  const tokenRes = await fetch(claim.aud, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!tokenRes.ok) {
    const text = await tokenRes.text();
    throw new Error(`Google token exchange failed: ${tokenRes.status} ${text}`);
  }

  const data = (await tokenRes.json()) as { access_token: string };
  return data.access_token;
}

async function notifyGoogle(
  urls: string[],
): Promise<{ ok: boolean; submitted: number; errors: string[]; skipped?: string }> {
  const keyJson = process.env.GOOGLE_INDEXING_KEY;
  if (!keyJson) {
    return { ok: false, submitted: 0, errors: [], skipped: "missing GOOGLE_INDEXING_KEY env var" };
  }

  let sa: ServiceAccount;
  try {
    sa = JSON.parse(keyJson);
  } catch {
    return { ok: false, submitted: 0, errors: ["invalid GOOGLE_INDEXING_KEY (not JSON)"] };
  }

  const token = await getGoogleAccessToken(sa);

  const errors: string[] = [];
  const results = await Promise.allSettled(
    urls.map((u) =>
      fetch("https://indexing.googleapis.com/v3/urlNotifications:publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ url: u, type: "URL_UPDATED" }),
      }).then(async (r) => {
        if (!r.ok) {
          const txt = await r.text();
          throw new Error(`${u}: ${r.status} ${txt}`);
        }
        return r;
      }),
    ),
  );

  let submitted = 0;
  for (const r of results) {
    if (r.status === "fulfilled") submitted++;
    else errors.push(String(r.reason));
  }

  return { ok: errors.length === 0, submitted, errors };
}

/* ── Route handler ─────────────────────────────────────────────── */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { urls } = body as { urls?: string[] };

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: "Missing urls array" }, { status: 400 });
    }

    const fullUrls = urls.map((u) =>
      u.startsWith("http") ? u : `https://${HOST}${u}`,
    );

    // Defensive: only allow URLs of our own domain
    const ownUrls = fullUrls.filter((u) => {
      try {
        return new URL(u).hostname.endsWith(HOST);
      } catch {
        return false;
      }
    });

    if (ownUrls.length === 0) {
      return NextResponse.json({ error: "No valid URLs for own domain" }, { status: 400 });
    }

    // IndexNow payload (Bing + Yandex)
    const indexnowPayload = {
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
      urlList: ownUrls,
    };

    const [bingRes, yandexRes, googleRes] = await Promise.allSettled([
      fetch("https://www.bing.com/indexnow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(indexnowPayload),
      }),
      fetch("https://yandex.com/indexnow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(indexnowPayload),
      }),
      notifyGoogle(ownUrls),
    ]);

    return NextResponse.json({
      ok: true,
      urlsSubmitted: ownUrls.length,
      bing:
        bingRes.status === "fulfilled"
          ? bingRes.value.status
          : `failed: ${String(bingRes.reason)}`,
      yandex:
        yandexRes.status === "fulfilled"
          ? yandexRes.value.status
          : `failed: ${String(yandexRes.reason)}`,
      google:
        googleRes.status === "fulfilled"
          ? googleRes.value
          : { ok: false, submitted: 0, errors: [String(googleRes.reason)] },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed", detail: String(err) },
      { status: 500 },
    );
  }
}

export async function GET() {
  const keyJson = process.env.GOOGLE_INDEXING_KEY;
  if (!keyJson) {
    return NextResponse.json({ error: "missing GOOGLE_INDEXING_KEY" }, { status: 500 });
  }
  try {
    const sa = JSON.parse(keyJson) as ServiceAccount & { project_id?: string };
    return NextResponse.json({
      ok: true,
      client_email: sa.client_email,
      project_id: sa.project_id,
      private_key_length: sa.private_key?.length,
      private_key_starts: sa.private_key?.slice(0, 40),
      private_key_ends: sa.private_key?.slice(-40),
    });
  } catch (err) {
    return NextResponse.json({ error: "invalid JSON", detail: String(err) }, { status: 500 });
  }
}
