// Meta Conversions API (Server-Side)
// Sends events directly to Meta's servers — not blocked by ad blockers

const PIXEL_ID = "1241390329847733";
const API_VERSION = "v21.0";
const ENDPOINT = `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events`;

interface MetaEventData {
  event_name: string;
  event_time: number;
  action_source: "website";
  event_source_url: string;
  user_data: {
    client_ip_address?: string;
    client_user_agent?: string;
    fbc?: string; // Facebook click ID from _fbc cookie
    fbp?: string; // Facebook browser ID from _fbp cookie
    country?: string[];
  };
  custom_data?: Record<string, unknown>;
}

export async function sendMetaEvent({
  eventName,
  sourceUrl,
  ipAddress,
  userAgent,
  fbc,
  fbp,
  country,
  customData,
}: {
  eventName: string;
  sourceUrl: string;
  ipAddress?: string;
  userAgent?: string;
  fbc?: string;
  fbp?: string;
  country?: string;
  customData?: Record<string, unknown>;
}) {
  const accessToken = process.env.META_CAPI_TOKEN;
  if (!accessToken) return; // Skip if not configured

  const eventData: MetaEventData = {
    event_name: eventName,
    event_time: Math.floor(Date.now() / 1000),
    action_source: "website",
    event_source_url: sourceUrl,
    user_data: {
      ...(ipAddress && { client_ip_address: ipAddress }),
      ...(userAgent && { client_user_agent: userAgent }),
      ...(fbc && { fbc }),
      ...(fbp && { fbp }),
      ...(country && { country: [country.toLowerCase()] }),
    },
    ...(customData && { custom_data: customData }),
  };

  try {
    await fetch(`${ENDPOINT}?access_token=${accessToken}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [eventData],
      }),
    });
  } catch {
    // Silent fail — don't block the request
  }
}
