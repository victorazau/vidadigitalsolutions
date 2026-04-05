import { BookingPage } from "./BookingPage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Book a Call | Vida Digital Solutions",
  description: "Schedule a free 30-minute discovery call with Vida Digital Solutions. Let's discuss how to automate and scale your business.",
}

export default function Book() {
  return <BookingPage />
}
