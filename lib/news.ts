// lib/news.ts
export interface Article {
  slug: string;
  title: string;
  category: string;   // Guide, News, Food, Experience, Insight, Travel
  region: string;     // Cancún, CDMX, Los Cabos, Tulum, Puerto Vallarta, etc.
  description: string;
  image: string;
  content: string;
  date: string;
}

export const articles: Article[] = [
  {
    slug: "cancun-airport-transport",
    title: "Cómo moverte del Aeropuerto de Cancún a tu hotel",
    category: "Guide",
    region: "Cancún",
    description: "Transporte seguro, precios y recomendaciones para turistas.",
    image: "https://images.unsplash.com/photo-1536657464919-892534f60d6e?q=80&w=2070&auto=format&fit=crop",
    date: "Abril 2026",
    content: `El aeropuerto de Cancún recibe millones de turistas cada año. Las mejores opciones son: ADO bus (económico), transfer privado (cómodo) o renta de auto (flexible). Evita taxis sin identificación oficial.`,
  },
  {
    slug: "cdmx-gastronomy-tour",
    title: "Tour gastronómico por la CDMX: de mercados a alta cocina",
    category: "Food",
    region: "CDMX",
    description: "Descubre los sabores más auténticos de la Ciudad de México.",
    image: "https://images.unsplash.com/photo-1505483531331-fc3cf89fd0fa?q=80&w=2070&auto=format&fit=crop",
    date: "Abril 2026",
    content: `Desde tacos al pastor en el centro hasta restaurantes con estrella Michelin en Polanco. No te pierdas el mercado de San Juan y una cata de mezcal.`,
  },
  {
    slug: "cabo-whale-watching-2026",
    title: "Temporada de ballenas en Los Cabos 2026",
    category: "Experience",
    region: "Los Cabos",
    description: "Las mejores fechas y tours para avistar ballenas jorobadas.",
    image: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?q=80&w=2070&auto=format&fit=crop",
    date: "Marzo 2026",
    content: `De diciembre a abril, las ballenas llegan a Baja California Sur. Contrata tours con biólogos marinos y respeta las normas de avistamiento.`,
  },
  {
    slug: "tulum-ruins-guide",
    title: "Guía completa para visitar las ruinas de Tulum",
    category: "Guide",
    region: "Tulum",
    description: "Horarios, precios, y cómo evitar multitudes.",
    image: "https://images.unsplash.com/photo-1518638150340-f706e86654de?q=80&w=2070&auto=format&fit=crop",
    date: "Marzo 2026",
    content: `Llega temprano (antes de las 8 am) para tener las ruinas casi vacías. Lleva protector biodegradable, sombrero y agua. El acantilado con vista al mar es impresionante.`,
  },
  {
    slug: "puerto-vallarta-hidden-beaches",
    title: "Playas escondidas en Puerto Vallarta que debes conocer",
    category: "Travel",
    region: "Puerto Vallarta",
    description: "Desde Playa Las Ánimas hasta Yelapa, solo accesibles por agua.",
    image: "https://images.unsplash.com/photo-1516302752625-fcc5c5d17bb5?q=80&w=2070&auto=format&fit=crop",
    date: "Febrero 2026",
    content: `Toma un water taxi desde el muelle de Los Muertos. Playa Colomitos es una pequeña joya rodeada de selva. Lleva efectivo para comida y bebida.`,
  },
  {
    slug: "merida-yucatan-safe",
    title: "¿Mérida es seguro para viajar? Datos 2026",
    category: "Insight",
    region: "Mérida",
    description: "Una de las ciudades más seguras de México y de América.",
    image: "https://images.unsplash.com/photo-1598801094040-5e2d31e6b6e5?q=80&w=2070&auto=format&fit=crop",
    date: "Enero 2026",
    content: `Mérida ha sido reconocida como la ciudad más segura de México. Su centro histórico, los cenotes cercanos y la gastronomía hacen de ella un destino imperdible.`,
  },
  {
    slug: "chichen-itza-2026",
    title: "Chichén Itzá: nuevas reglas para turistas en 2026",
    category: "News",
    region: "Yucatán",
    description: "Prohibición de selfie sticks, horarios y accesos renovados.",
    image: "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?q=80&w=2070&auto=format&fit=crop",
    date: "Enero 2026",
    content: `A partir de marzo de 2026 ya no se permiten trípodes ni bastones para selfies. También se ha limitado el aforo diario para preservar el sitio. Compra boletos en línea con anticipación.`,
  },
  {
    slug: "gdl-tequila-train",
    title: "El Tren del Tequila: experiencia desde Guadalajara",
    category: "Experience",
    region: "Guadalajara",
    description: "Un viaje en tren con degustaciones y paisajes agaveros.",
    image: "https://images.unsplash.com/photo-1591159952402-74f2a7b0a8a4?q=80&w=2070&auto=format&fit=crop",
    date: "Diciembre 2025",
    content: `El Tequila Express recorre los campos de agave y termina en una destilería tradicional. Incluye música en vivo y comida típica. Reserva con meses de anticipación.`,
  },
];