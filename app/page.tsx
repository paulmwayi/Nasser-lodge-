import BookingWidget from "@/components/BookingWidget";
import StickyBookingBar from "@/components/StickyBookingBar";
import RoomCard from "@/components/RoomCard";
import { rooms } from "@/data/rooms";

export default function Home() {
  return (
    <main className="min-h-screen bg-charcoal text-cream">
      <StickyBookingBar />

      {/* HERO */}
      <section className="relative flex min-h-[92vh] flex-col justify-end">
        {/* Placeholder hero background — replace with real photo/video of the lodge */}
        <div className="absolute inset-0 bg-gradient-to-b from-teal/30 via-charcoal to-charcoal" />
        <div className="absolute inset-0 bg-hero-gradient" />

        <div className="relative z-10 px-4 pb-8 md:px-8 md:pb-10">
          <div className="mx-auto max-w-6xl">
            <p className="mb-3 font-display italic text-gold text-sm md:text-base tracking-wide">
              Mongu · Western Province · Zambia
            </p>
            <h1 className="max-w-2xl font-display text-4xl md:text-6xl leading-[1.05] text-cream">
              Where luxury feels like home.
            </h1>
            <p className="mt-4 max-w-md text-sm md:text-base text-cream/75">
              A lodge on the edge of the Barotse Plain, minutes from Mongu —
              built for rest, real hospitality, and a warm welcome.
            </p>
          </div>
        </div>
      </section>

      {/* BOOKING WIDGET — overlapping the hero, above the fold */}
      <section className="relative z-20 -mt-16 px-4 md:-mt-20 md:px-8">
        <div className="mx-auto flex max-w-6xl justify-center md:justify-start">
          <BookingWidget />
        </div>
      </section>

      {/* ROOMS OVERVIEW */}
      <section id="rooms" className="mx-auto max-w-6xl px-4 py-20 md:px-8">
        <div className="mb-10">
          <p className="font-display italic text-gold text-sm">Rooms</p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl">
            A room for every kind of stay
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </section>

      {/* AMENITIES / DINING */}
      <section id="dining" className="border-t border-cream/10 bg-cream/[0.03]">
        <div className="mx-auto max-w-6xl px-4 py-20 md:px-8">
          <p className="font-display italic text-gold text-sm">Dining &amp; amenities</p>
          <h2 className="mt-2 max-w-xl font-display text-3xl md:text-4xl">
            Meals, grounds, and quiet corners to unwind
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Restaurant & Bar",
                copy: "Local and international dishes, served in a relaxed setting.",
              },
              {
                title: "Gardens & Grounds",
                copy: "Quiet, green spaces just steps from Lusaka Road.",
              },
              {
                title: "Events & Functions",
                copy: "A setting for weddings, conferences, and family gatherings.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-cream/10 p-6"
              >
                <div className="mb-4 aspect-[16/10] w-full rounded-lg bg-gradient-to-br from-clay/30 to-charcoal" />
                <h3 className="font-display text-lg">{item.title}</h3>
                <p className="mt-2 text-sm text-cream/70">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section id="location" className="mx-auto max-w-6xl px-4 py-20 md:px-8">
        <p className="font-display italic text-gold text-sm">Location</p>
        <h2 className="mt-2 font-display text-3xl md:text-4xl">
          In the heart of Mongu
        </h2>
        <p className="mt-4 max-w-xl text-sm text-cream/70">
          Nasser Lodge sits approximately 500 meters from Lusaka Road, close
          to central Mongu and within reach of the Barotse Plain and the
          Kuomboka ceremony grounds.
        </p>
        <div className="mt-8 aspect-[16/9] w-full overflow-hidden rounded-xl border border-cream/10">
          <iframe
            title="Nasser Lodge location map"
            className="h-full w-full"
            loading="lazy"
            src="https://www.google.com/maps?q=Nasser+Lodge,+Mongu,+Zambia&output=embed"
          />
        </div>
      </section>

      {/* REVIEWS */}
      <section className="border-t border-cream/10 bg-cream/[0.03]">
        <div className="mx-auto max-w-6xl px-4 py-20 md:px-8">
          <p className="font-display italic text-gold text-sm">Guests say</p>
          <div className="mt-2 flex items-center gap-3">
            <h2 className="font-display text-3xl md:text-4xl">4.2 out of 5</h2>
            <span className="text-sm text-cream/60">from 41 Google reviews</span>
          </div>
          <p className="mt-6 max-w-xl text-sm text-cream/70">
            Guests consistently highlight the warmth of the welcome, the
            comfort of the rooms, and the quality of service — read more on
            our{" "}
            <a
              href="https://www.facebook.com/"
              className="underline decoration-gold text-gold hover:text-cream"
            >
              Facebook page
            </a>
            .
          </p>
        </div>
      </section>

      {/* CONTACT / FOOTER */}
      <footer id="contact" className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl md:text-3xl">
            Ready to reserve your stay?
          </h2>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <a
              href="tel:+260976327007"
              className="rounded-md border border-cream/20 px-4 py-2 hover:border-gold"
            >
              Call +260 976 327 007
            </a>
            <a
              href="https://wa.me/260976327007"
              className="rounded-md bg-gold px-4 py-2 font-semibold text-charcoal hover:bg-gold/90"
            >
              WhatsApp Us
            </a>
            <a
              href="mailto:nasserlodges49@gmail.com"
              className="rounded-md border border-cream/20 px-4 py-2 hover:border-gold"
            >
              nasserlodges49@gmail.com
            </a>
          </div>
          <p className="mt-10 text-xs text-cream/40">
            © {new Date().getFullYear()} Nasser Lodge, Mongu, Zambia.
          </p>
        </div>
      </footer>
    </main>
  );
}
