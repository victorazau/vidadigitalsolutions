"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Send server-side event via API route
function sendServerEvent(eventName: string, customData?: Record<string, unknown>) {
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      eventName,
      sourceUrl: window.location.href,
      customData,
    }),
  }).catch(() => {});
}

// Track page views on route changes
export function TrackingEvents() {
  const pathname = usePathname();

  useEffect(() => {
    // GA4 page view
    if (window.gtag) {
      window.gtag("config", "G-6L8QCB30PB", { page_path: pathname });
    }

    // Client-side Meta Pixel
    if (window.fbq) {
      window.fbq("track", "PageView");

      if (pathname === "/book") {
        window.fbq("track", "Schedule");
        window.fbq("track", "Lead", { content_name: "Book a Call", content_category: "Booking" });
      }

      if (pathname.startsWith("/blog/")) {
        window.fbq("track", "ViewContent", { content_type: "blog_article", content_name: pathname.replace("/blog/", "") });
      }
    }

    // Server-side events for key pages (CAPI)
    if (pathname === "/book") {
      sendServerEvent("Lead", { content_name: "Book a Call", content_category: "Booking" });
      sendServerEvent("Schedule");
    }
    if (pathname.startsWith("/blog/")) {
      sendServerEvent("ViewContent", { content_type: "blog_article", content_name: pathname.replace("/blog/", "") });
    }
  }, [pathname]);

  return null;
}

// WhatsApp CTA click
export function trackWhatsAppClick() {
  // Client-side
  if (window.fbq) {
    window.fbq("track", "Contact", { content_name: "WhatsApp Click" });
    window.fbq("track", "Lead", { content_name: "WhatsApp CTA", content_category: "Contact" });
  }
  if (window.gtag) {
    window.gtag("event", "whatsapp_click", { event_category: "Contact", event_label: "WhatsApp CTA" });
  }
  // Server-side
  sendServerEvent("Contact", { content_name: "WhatsApp Click" });
  sendServerEvent("Lead", { content_name: "WhatsApp CTA", content_category: "Contact" });
}

// Book a Call CTA click
export function trackBookingClick() {
  // Client-side
  if (window.fbq) {
    window.fbq("track", "Schedule");
    window.fbq("track", "Lead", { content_name: "Book a Call CTA", content_category: "Booking" });
  }
  if (window.gtag) {
    window.gtag("event", "booking_click", { event_category: "Booking", event_label: "Book a Call CTA" });
  }
  // Server-side
  sendServerEvent("Schedule", { content_name: "Book a Call CTA" });
  sendServerEvent("Lead", { content_name: "Book a Call CTA", content_category: "Booking" });
}
