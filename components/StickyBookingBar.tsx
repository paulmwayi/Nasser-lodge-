"use client";

import { useEffect, useState } from "react";
import BookingWidget from "./BookingWidget";

export default function StickyBookingBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      // Show once the guest has scrolled past roughly one hero-height.
      setVisible(window.scrollY > window.innerHeight * 0.8);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="bg-charcoal/95 backdrop-blur border-b border-gold/20 px-4 py-2.5 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <span className="hidden md:block font-display text-sm text-cream">
            Nasser Lodge
          </span>
          <BookingWidget compact />
        </div>
      </div>
    </div>
  );
}
