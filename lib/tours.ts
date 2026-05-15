// lib/tours.ts
export interface Tour {
  slug: string;
  name: string;
  price: number;
  times: string[];
  description: string;
  image: string;
  category: string;   // Water, Adventure, Wildlife, Luxury, Land, Fishing, etc.
  location: string;   // "Los Cabos", "Cancún", "CDMX", "Tulum", etc.
}

export const tours: Tour[] = [
  // ========== LOS CABOS ==========
  {
    slug: "snorkeling-cabo",
    name: "Snorkel en el Arco de Cabo",
    price: 89,
    times: ["9:00 AM", "1:00 PM"],
    description: "Explora el famoso Arco y la playa del Amor con snorkel guiado.",
    image: "https://images.unsplash.com/photo-1544551763-cede7b5a4a6f?q=80&w=2070&auto=format&fit=crop",
    category: "Water",
    location: "Los Cabos",
  },
  {
    slug: "cabo-pulmo-snorkel",
    name: "Cabo Pulmo Snorkeling",
    price: 202,
    times: ["8:00 AM", "12:00 PM"],
    description: "Arrecife vivo en el Parque Nacional Cabo Pulmo.",
    image: "https://images.unsplash.com/photo-1519817914152-22f90e38a7a3?q=80&w=2070&auto=format&fit=crop",
    category: "Water",
    location: "Los Cabos",
  },
  {
    slug: "whale-watching-cabo",
    name: "Avistamiento de Ballenas",
    price: 185,
    times: ["8:00 AM", "12:00 PM"],
    description: "Temporada de ballenas jorobadas con guía experto.",
    image: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?q=80&w=2070&auto=format&fit=crop",
    category: "Wildlife",
    location: "Los Cabos",
  },
  {
    slug: "luxury-yacht-cabo",
    name: "Crucero de Lujo al Atardecer",
    price: 119,
    times: ["5:00 PM"],
    description: "Yate privado con barra libre y vistas al Pacífico.",
    image: "https://images.unsplash.com/photo-1531694611355-7c47b9f36a2b?q=80&w=2070&auto=format&fit=crop",
    category: "Luxury",
    location: "Los Cabos",
  },
  {
    slug: "atv-cabo",
    name: "ATV por el Desierto",
    price: 109,
    times: ["9:00 AM", "1:00 PM"],
    description: "Recorrido en cuatrimoto entre dunas y cañones.",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=2070&auto=format&fit=crop",
    category: "Adventure",
    location: "Los Cabos",
  },

  // ========== CANCÚN ==========
  {
    slug: "chichen-itza-tour",
    name: "Tour a Chichén Itzá desde Cancún",
    price: 120,
    times: ["7:00 AM"],
    description: "Visita la maravilla del mundo con guía y transporte incluido.",
    image: "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?q=80&w=2070&auto=format&fit=crop",
    category: "Land",
    location: "Cancún",
  },
  {
    slug: "isla-mujeres-catamaran",
    name: "Catamarán a Isla Mujeres",
    price: 99,
    times: ["9:00 AM", "12:00 PM"],
    description: "Navegación con barra libre y snorkel en el Parque Garrafón.",
    image: "https://images.unsplash.com/photo-1565801851366-ff6ee3dc1a5f?q=80&w=2070&auto=format&fit=crop",
    category: "Water",
    location: "Cancún",
  },
  {
    slug: "cancun-jungle-tour",
    name: "Jungle Tour en lancha rápida",
    price: 75,
    times: ["10:00 AM", "2:00 PM"],
    description: "Conduce tu propia lancha por la laguna Nichupté.",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=2070&auto=format&fit=crop",
    category: "Adventure",
    location: "Cancún",
  },

  // ========== CDMX ==========
  {
    slug: "teotihuacan-hot-air",
    name: "Vuelo en Globo sobre Teotihuacán",
    price: 199,
    times: ["6:00 AM"],
    description: "Amanecer increíble sobre las pirámides del Sol y la Luna.",
    image: "https://images.unsplash.com/photo-1542693192-7c2f5fec6dcb?q=80&w=2070&auto=format&fit=crop",
    category: "Adventure",
    location: "CDMX",
  },
  {
    slug: "xochimilco-trajinera",
    name: "Trajinera en Xochimilco con comida",
    price: 45,
    times: ["12:00 PM", "3:00 PM"],
    description: "Recorre los canales con mariachi y degustación de antojitos.",
    image: "https://images.unsplash.com/photo-1588953931075-7e99c8c4d2c8?q=80&w=2070&auto=format&fit=crop",
    category: "Land",
    location: "CDMX",
  },
  {
    slug: "cdmx-bike-tour",
    name: "Bike Tour por el Centro Histórico",
    price: 39,
    times: ["10:00 AM", "4:00 PM"],
    description: "Recorre el Zócalo, Bellas Artes y Alameda en bicicleta.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop",
    category: "Land",
    location: "CDMX",
  },

  // ========== TULUM ==========
  {
    slug: "tulum-cenote-adventure",
    name: "Tres Cenotes + Ruinas de Tulum",
    price: 110,
    times: ["8:00 AM"],
    description: "Nada en cenotes cristalinos y visita la zona arqueológica.",
    image: "https://images.unsplash.com/photo-1544551763-46a0bb0cdfa6?q=80&w=2070&auto=format&fit=crop",
    category: "Water",
    location: "Tulum",
  },
  {
    slug: "tulum-zipline",
    name: "Tirolesa y Rappel en la selva",
    price: 89,
    times: ["10:00 AM", "1:00 PM"],
    description: "Circuito de tirolesas sobre la selva maya.",
    image: "https://images.unsplash.com/photo-1594310800685-497fbdd7bb33?q=80&w=2070&auto=format&fit=crop",
    category: "Adventure",
    location: "Tulum",
  },

  // ========== PUERTO VALLARTA ==========
  {
    slug: "pv-marietas-islands",
    name: "Islas Marietas: Playa Escondida",
    price: 130,
    times: ["9:00 AM"],
    description: "Tour a la famosa playa oculta y snorkel.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop",
    category: "Water",
    location: "Puerto Vallarta",
  },
  {
    slug: "pv-cooking-class",
    name: "Clase de Cocina Mexicana",
    price: 75,
    times: ["11:00 AM"],
    description: "Aprende a hacer mole, tamales y salsa desde cero.",
    image: "https://images.unsplash.com/photo-1551504734-5ee1d4a1479b?q=80&w=2070&auto=format&fit=crop",
    category: "Land",
    location: "Puerto Vallarta",
  },

  // más tours cortos para mantener legible
  {
    slug: "cozumel-diving",
    name: "Buceo en Cozumel (2 tanques)",
    price: 150,
    times: ["8:00 AM"],
    description: "Arrecifes de coral y vida marina impresionante.",
    image: "https://images.unsplash.com/photo-1544551763-46a0bb0cdfa6?q=80&w=2070&auto=format&fit=crop",
    category: "Water",
    location: "Cozumel",
  },
];