export type Room = {
  id: string;
  name: string;
  description: string;
  capacity: number;
  priceFrom: number; // ZMW per night
  amenities: string[];
};

// Placeholder inventory — replace with confirmed room types, rates,
// and real photography before launch (see PRD section 8).
export const rooms: Room[] = [
  {
    id: "standard",
    name: "Standard Room",
    description:
      "A warm, well-appointed room for travelers who want comfort without excess.",
    capacity: 2,
    priceFrom: 650,
    amenities: ["En-suite bathroom", "Air conditioning", "Free Wi-Fi"],
  },
  {
    id: "deluxe",
    name: "Deluxe Room",
    description:
      "More space and a private sitting area, ideal for longer stays.",
    capacity: 3,
    priceFrom: 950,
    amenities: ["En-suite bathroom", "Air conditioning", "Free Wi-Fi", "Work desk"],
  },
  {
    id: "suite",
    name: "Executive Suite",
    description:
      "The lodge's finest room — a private retreat for guests who want the full experience.",
    capacity: 4,
    priceFrom: 1450,
    amenities: [
      "En-suite bathroom",
      "Air conditioning",
      "Free Wi-Fi",
      "Lounge area",
      "Breakfast included",
    ],
  },
];
