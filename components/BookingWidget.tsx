"use client";

import { useState } from "react";
import { rooms } from "@/data/rooms";

type BookingWidgetProps = {
  compact?: boolean; // true when rendered inside the sticky bar
  initialRoomId?: string;
};

export default function BookingWidget({
  compact = false,
  initialRoomId,
}: BookingWidgetProps) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [roomId, setRoomId] = useState(initialRoomId ?? rooms[0].id);
  const [status, setStatus] = useState<"idle" | "checking" | "error">("idle");

  function handleCheckAvailability(e: React.FormEvent) {
    e.preventDefault();

    if (!checkIn || !checkOut) {
      setStatus("error");
      return;
    }

    setStatus("checking");

    // TODO: replace with a real call to your availability API route,
    // e.g. POST /api/availability { checkIn, checkOut, guests, roomId }
    // For now this just routes the guest to a placeholder booking page
    // with the selection carried as query params.
    const params = new URLSearchParams({
      checkIn,
      checkOut,
      guests: String(guests),
      room: roomId,
    });
    window.location.href = `/book?${params.toString()}`;
  }

  if (compact) {
    return (
      <form
        onSubmit={handleCheckAvailability}
        className="flex flex-wrap items-center gap-2 md:gap-3"
      >
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="rounded-md bg-cream/10 border border-cream/20 px-2 py-1.5 text-xs md:text-sm text-cream placeholder:text-cream/50 focus:outline-none focus:ring-2 focus:ring-gold"
          aria-label="Check-in date"
        />
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="rounded-md bg-cream/10 border border-cream/20 px-2 py-1.5 text-xs md:text-sm text-cream focus:outline-none focus:ring-2 focus:ring-gold"
          aria-label="Check-out date"
        />
        <button
          type="submit"
          className="rounded-md bg-gold px-4 py-1.5 text-xs md:text-sm font-semibold text-charcoal hover:bg-gold/90 transition-colors"
        >
          Check Availability
        </button>
      </form>
    );
  }

  return (
    <form
      onSubmit={handleCheckAvailability}
      className="relative w-full max-w-3xl rounded-2xl border border-gold/30 bg-charcoal/80 backdrop-blur-md p-5 md:p-7 shadow-2xl"
    >
      <div className="woven-divider absolute -top-[3px] left-6 right-6 rounded-full" />

      <p className="mb-4 font-display text-sm tracking-wide text-gold uppercase">
        Reserve your stay
      </p>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
        <label className="col-span-1 flex flex-col gap-1">
          <span className="text-xs text-cream/70">Check-in</span>
          <input
            type="date"
            required
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="rounded-lg bg-cream/10 border border-cream/20 px-3 py-2 text-sm text-cream focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </label>

        <label className="col-span-1 flex flex-col gap-1">
          <span className="text-xs text-cream/70">Check-out</span>
          <input
            type="date"
            required
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="rounded-lg bg-cream/10 border border-cream/20 px-3 py-2 text-sm text-cream focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </label>

        <label className="col-span-1 flex flex-col gap-1">
          <span className="text-xs text-cream/70">Guests</span>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="rounded-lg bg-cream/10 border border-cream/20 px-3 py-2 text-sm text-cream focus:outline-none focus:ring-2 focus:ring-gold"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n} className="text-charcoal">
                {n} {n === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </label>

        <label className="col-span-1 flex flex-col gap-1">
          <span className="text-xs text-cream/70">Room</span>
          <select
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="rounded-lg bg-cream/10 border border-cream/20 px-3 py-2 text-sm text-cream focus:outline-none focus:ring-2 focus:ring-gold"
          >
            {rooms.map((r) => (
              <option key={r.id} value={r.id} className="text-charcoal">
                {r.name}
              </option>
            ))}
          </select>
        </label>

        <div className="col-span-2 md:col-span-1 flex items-end">
          <button
            type="submit"
            className="w-full rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-charcoal hover:bg-gold/90 transition-colors"
          >
            {status === "checking" ? "Checking…" : "Check Availability"}
          </button>
        </div>
      </div>

      {status === "error" && (
        <p className="mt-3 text-sm text-red-300">
          Please choose both a check-in and check-out date.
        </p>
      )}

      <p className="mt-4 text-xs text-cream/60">
        Prefer to speak to someone directly? WhatsApp{" "}
        <a
          href="https://wa.me/260976327007"
          className="underline decoration-gold text-gold hover:text-cream"
        >
          +260 976 327 007
        </a>
        .
      </p>
    </form>
  );
}
