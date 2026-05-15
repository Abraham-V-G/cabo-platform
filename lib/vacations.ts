// lib/vacations.ts
export interface VacationPackage {
  slug: string;
  name: string;
  days: number;
  price: number;
  resort: string;      // "RIU Palace", "Grand Velas", "Secrets", etc.
  location: string;    // "Cancún", "Los Cabos", "Puerto Vallarta"
  category: string;    // "Luxury", "Family", "Adventure", "All-Inclusive"
  features: string[];
  image: string;
}

export const vacationPackages: VacationPackage[] = [
  {
    slug: "riu-cancun-luxury",
    name: "RIU Palace Las Américas",
    days: 5,
    price: 1250,
    resort: "RIU Palace",
    location: "Cancún",
    category: "Luxury",
    features: ["Todo incluido", "Suite con vista al mar", "Spa", "Traslados"],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
  },
  {
    slug: "grand-velas-cabo",
    name: "Grand Velas Los Cabos",
    days: 7,
    price: 3400,
    resort: "Grand Velas",
    location: "Los Cabos",
    category: "Luxury",
    features: ["Todo incluido premium", "Terraza con jacuzzi", "Golf", "Concierge"],
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=2070&auto=format&fit=crop",
  },
  {
    slug: "secrets-pv",
    name: "Secrets Vallarta Bay",
    days: 6,
    price: 1890,
    resort: "Secrets",
    location: "Puerto Vallarta",
    category: "Adults Only",
    features: ["Todo incluido", "Suite con jacuzzi", "Acceso a restaurantes gourmet"],
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop",
  },
  {
    slug: "family-tulum",
    name: "Dreams Tulum Resort",
    days: 5,
    price: 980,
    resort: "Dreams",
    location: "Tulum",
    category: "Family",
    features: ["Club de niños", "Piscinas", "Entretenimiento diario"],
    image: "https://images.unsplash.com/photo-1532771098148-525cefe10c23?q=80&w=2070&auto=format&fit=crop",
  },
  {
    slug: "adventure-cancun",
    name: "Adventure Week - Cancún",
    days: 4,
    price: 750,
    resort: "Adventure Hotel",
    location: "Cancún",
    category: "Adventure",
    features: ["Excursiones diarias", "Snorkel", "Cenotes", "Transporte"],
    image: "https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?q=80&w=2070&auto=format&fit=crop",
  },
  {
    slug: "hilton-cdmx",
    name: "Hilton Mexico City Reforma",
    days: 3,
    price: 520,
    resort: "Hilton",
    location: "CDMX",
    category: "City Break",
    features: ["Desayuno incluido", "WiFi", "Gimnasio", "Céntrico"],
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop",
  },
];