"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Track page views on route changes (for both GA4 and Meta Pixel)
export function TrackingEvents() {
  const pathname = usePathname();

  useEffect(() => {
    // GA4 page view
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("config", "G-6L8QCB30PB", {
        page_path: pathname,
      });
    }

    // Meta Pixel page view
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "PageView");

      // Track specific events per page
      if (pathname === "/book") {
        window.fbq("track", "Schedule");
        window.fbq("track", "Lead", {
          content_name: "Book a Call",
          content_category: "Booking",
        });
      }

      if (pathname.startsWith("/blog/")) {
        window.fbq("track", "ViewContent", {
          content_type: "blog_article",
          content_name: pathname.replace("/blog/", ""),
        });
      }

      if (pathname === "/") {
        window.fbq("trackCustom", "HomepageView");
      }
    }
  }, [pathname]);

  return null;
}

// Call this when user clicks WhatsApp CTA
export function trackWhatsAppClick() {
  if (typeof window !== "undefined") {
    if (window.fbq) {
      window.fbq("track", "Contact", {
        content_name: "WhatsApp Click",
      });
      window.fbq("track", "Lead", {
        content_name: "WhatsApp CTA",
        content_category: "Contact",
      });
    }
    if (window.gtag) {
      window.gtag("event", "whatsapp_click", {
        event_category: "Contact",
        event_label: "WhatsApp CTA",
      });
    }
  }
}

// Call this when user clicks Book a Call CTA
export function trackBookingClick() {
  if (typeof window !== "undefined") {
    if (window.fbq) {
      window.fbq("track", "Schedule");
      window.fbq("track", "Lead", {
        content_name: "Book a Call CTA",
        content_category: "Booking",
      });
    }
    if (window.gtag) {
      window.gtag("event", "booking_click", {
        event_category: "Booking",
        event_label: "Book a Call CTA",
      });
    }
  }
}
