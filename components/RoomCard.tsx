import Link from "next/link";
import { Room } from "@/data/rooms";

export default function RoomCard({ room }: { room: Room }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-cream/10 bg-cream/5 hover:border-gold/40 transition-colors">
      {/* Placeholder for real room photography */}
      <div className="aspect-[4/3] w-full bg-gradient-to-br from-clay/40 via-charcoal to-teal/50" />

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="font-display text-xl text-cream">{room.name}</h3>
          <p className="mt-1 text-sm text-cream/70">{room.description}</p>
        </div>

        <ul className="flex flex-wrap gap-2 text-xs text-cream/60">
          {room.amenities.map((a) => (
            <li key={a} className="rounded-full border border-cream/15 px-2 py-1">
              {a}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-sm text-cream/80">
            From <span className="font-semibold text-gold">K{room.priceFrom}</span>{" "}
            / night
          </span>
          <Link
            href={`/book?room=${room.id}`}
            className="rounded-md bg-gold px-3 py-1.5 text-xs font-semibold text-charcoal hover:bg-gold/90 transition-colors"
          >
            Book This Room
          </Link>
        </div>
      </div>
    </div>
  );
}
