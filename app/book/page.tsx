import { rooms } from "@/data/rooms";

export default function BookPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const checkIn = searchParams.checkIn as string | undefined;
  const checkOut = searchParams.checkOut as string | undefined;
  const guests = searchParams.guests as string | undefined;
  const roomId = (searchParams.room as string | undefined) ?? rooms[0].id;
  const room = rooms.find((r) => r.id === roomId) ?? rooms[0];

  return (
    <main className="min-h-screen bg-charcoal px-4 py-16 text-cream md:px-8">
      <div className="mx-auto max-w-xl">
        <p className="font-display italic text-gold text-sm">Reservation</p>
        <h1 className="mt-2 font-display text-3xl">Confirm your stay</h1>

        <div className="mt-8 rounded-xl border border-cream/10 p-6">
          <h2 className="font-display text-xl">{room.name}</h2>
          <p className="mt-1 text-sm text-cream/70">{room.description}</p>
          <dl className="mt-4 grid grid-cols-2 gap-y-2 text-sm">
            <dt className="text-cream/60">Check-in</dt>
            <dd>{checkIn ?? "—"}</dd>
            <dt className="text-cream/60">Check-out</dt>
            <dd>{checkOut ?? "—"}</dd>
            <dt className="text-cream/60">Guests</dt>
            <dd>{guests ?? "—"}</dd>
            <dt className="text-cream/60">Rate</dt>
            <dd>K{room.priceFrom} / night</dd>
          </dl>
        </div>

        {/*
          TODO — this is where the real flow continues:
          1. Guest details form (name, phone, email, requests)
          2. Payment step:
             - Airtel Money / MTN MoMo via Flutterwave or DPO Group
             - Card payment via the same gateway
             - Deposit vs. full payment toggle
          3. On success: write the reservation to your CMS/database,
             send email + WhatsApp confirmation with a reference number.

          For now this page is a placeholder so the booking widget has
          somewhere real to send guests while payment integration is built.
        */}
        <div className="mt-8 rounded-xl border border-dashed border-gold/40 p-6 text-sm text-cream/70">
          Guest details and payment (Airtel Money / MTN MoMo / Card) go here
          next — see the PRD, section 5 &amp; 6, for the full flow.
        </div>

        <a
          href="https://wa.me/260976327007"
          className="mt-6 inline-block rounded-md bg-gold px-4 py-2 text-sm font-semibold text-charcoal hover:bg-gold/90"
        >
          Or confirm via WhatsApp instead
        </a>
      </div>
    </main>
  );
}
