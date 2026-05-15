import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Limpiar tablas existentes para evitar duplicados (opcional pero recomendado)
  await prisma.tour.deleteMany();
  await prisma.vacationPackage.deleteMany();
  await prisma.article.deleteMany();

  /* =========================================
     TOURS (todos los datos de lib/tours.ts)
  ========================================= */
  await prisma.tour.createMany({
    data: [
      // Los Cabos
      {
        slug: "snorkeling-cabo",
        name: "Snorkel en el Arco de Cabo",
        price: 89,
        times: ["9:00 AM", "1:00 PM"],
        description:
          "Explora el famoso Arco y la playa del Amor con snorkel guiado.",
        image:
          "https://plus.unsplash.com/premium_photo-1682091874987-687e0c1026b8?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Water",
        location: "Los Cabos",
        featured: false,
      },
      {
        slug: "cabo-pulmo-snorkel",
        name: "Cabo Pulmo Snorkeling",
        price: 202,
        times: ["8:00 AM", "12:00 PM"],
        description: "Arrecife vivo en el Parque Nacional Cabo Pulmo.",
        image:
          "https://plus.unsplash.com/premium_photo-1661265851801-e523847e3932?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Water",
        location: "Los Cabos",
        featured: false,
      },
      {
        slug: "whale-watching-cabo",
        name: "Avistamiento de Ballenas",
        price: 185,
        times: ["8:00 AM", "12:00 PM"],
        description: "Temporada de ballenas jorobadas con guía experto.",
        image:
          "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?q=80&w=2070&auto=format&fit=crop",
        category: "Wildlife",
        location: "Los Cabos",
        featured: true,
      },
      {
        slug: "luxury-yacht-cabo",
        name: "Crucero de Lujo al Atardecer",
        price: 119,
        times: ["5:00 PM"],
        description: "Yate privado con barra libre y vistas al Pacífico.",
        image:
          "https://images.unsplash.com/photo-1580166463495-ab4d21922c22?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Luxury",
        location: "Los Cabos",
        featured: true,
      },
      {
        slug: "atv-cabo",
        name: "ATV por el Desierto",
        price: 109,
        times: ["9:00 AM", "1:00 PM"],
        description: "Recorrido en cuatrimoto entre dunas y cañones.",
        image:
          "https://plus.unsplash.com/premium_photo-1661962915429-e902c54e6fdd?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Adventure",
        location: "Los Cabos",
        featured: false,
      },
      // ==================== CABO ESCAPE ($85) ====================
    {
      slug: "cabo-escape-snorkel-am",
      name: "Cabo Escape: Snorkel AM",
      price: 85,
      times: ["9:00 AM", "1:00 PM"],
      description: "🤿 Snorkel en área protegida con guía. Incluye: equipo de snorkel, lunch con tacos preparados al momento, barra de ensaladas y salsas, barra libre nacional (cerveza, margaritas, refrescos), música y ambiente divertido. Entrada al muelle incluida.",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1470&auto=format",
      category: "Water",
      location: "Los Cabos",
      featured: false,
    },
    {
      slug: "cabo-escape-whale-watching",
      name: "Cabo Escape: Whale Watching",
      price: 85,
      times: ["8:00 AM"],
      description: "🐋 Avistamiento de ballenas jorobadas. Incluye: desayuno estilo mexicano (fruta, jugo, café, chilaquiles, huevos revueltos, tocino), barra libre nacional (mimosas, Bloody Marys, cervezas, margaritas, jugos y refrescos para niños). Entrada al muelle incluida.",
      image: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?q=80&w=2070&auto=format",
      category: "Wildlife",
      location: "Los Cabos",
      featured: false,
    },
    {
      slug: "cabo-escape-snorkel-fun",
      name: "Cabo Escape: Snorkel Fun",
      price: 85,
      times: ["10:00 AM", "2:00 PM"],
      description: "🤿 Snorkel divertido para toda la familia. Incluye: equipo completo, lunch tipo Baja Blast (tacos de res y pollo, guacamole, salsas), barra libre nacional, música a bordo. Entrada al muelle incluida.",
      image: "https://plus.unsplash.com/premium_photo-1682091874987-687e0c1026b8?q=80&w=1548&auto=format",
      category: "Water",
      location: "Los Cabos",
      featured: false,
    },
    {
      slug: "cabo-escape-sunset-fajitas",
      name: "Cabo Escape: Sunset Fajitas",
      price: 85,
      times: ["6:00 PM"],  // Real: 6-8 PM
      description: "🌅 Atardecer en el mar (6:00 PM a 8:00 PM). Incluye: fajitas de pollo, res o vegetarianas, guacamole, pico de gallo, quesadillas, barra libre nacional, vista espectacular desde la cubierta. Entrada al muelle incluida.",
      image: "https://images.unsplash.com/photo-1580166463495-ab4d21922c22?q=80&w=1470&auto=format",
      category: "Luxury",
      location: "Los Cabos",
      featured: false,
    },

    // ==================== CABO WAVE ($85) ====================
    {
      slug: "cabo-wave-snorkel-am",
      name: "Cabo Wave: Snorkel AM",
      price: 85,
      times: ["9:00 AM", "1:00 PM"],
      description: "🤿 Snorkel matutino. Incluye: equipo de snorkel, guía, almuerzo ligero, barra libre nacional, música. Entrada al muelle incluida.",
      image: "https://plus.unsplash.com/premium_photo-1661265851801-e523847e3932?q=80&w=1548&auto=format",
      category: "Water",
      location: "Los Cabos",
      featured: false,
    },
    {
      slug: "cabo-wave-whale-watching",
      name: "Cabo Wave: Whale Watching",
      price: 85,
      times: ["8:00 AM"],
      description: "🐋 Avistamiento de ballenas. Incluye: desayuno mexicano (chilaquiles, fruta, café), barra libre nacional, guía experto. Entrada al muelle incluida.",
      image: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?q=80&w=2070&auto=format",
      category: "Wildlife",
      location: "Los Cabos",
      featured: false,
    },
    {
      slug: "cabo-wave-snorkel-fun",
      name: "Cabo Wave: Snorkel Fun",
      price: 85,
      times: ["10:00 AM", "2:00 PM"],
      description: "🤿 Diversión asegurada. Incluye: equipo, snack, barra libre, música. Entrada al muelle incluida.",
      image: "https://plus.unsplash.com/premium_photo-1682091874987-687e0c1026b8?q=80&w=1548&auto=format",
      category: "Water",
      location: "Los Cabos",
      featured: false,
    },
    {
      slug: "cabo-wave-sunset-sessions",
      name: "Cabo Wave: Sunset Sessions",
      price: 85,
      times: ["6:00 PM"],  // Real: 6-8 PM
      description: "🌅 Cena buffet al atardecer (6:00 PM a 8:00 PM). Incluye: buffet (taquitos, ensaladas, esquites, fajitas, tamales, empanadas, barra de salsas), bebidas signature, barra libre nacional, DJ y música en vivo (según disponibilidad), actividad familiar. Entrada al muelle incluida.",
      image: "https://images.unsplash.com/photo-1580166463495-ab4d21922c22?q=80&w=1470&auto=format",
      category: "Luxury",
      location: "Los Cabos",
      featured: false,
    },

    // ==================== PIRATAS ($85) ====================
    {
      slug: "piratas-snorkel-am",
      name: "Piratas: Snorkel AM",
      price: 85,
      times: ["9:00 AM", "1:00 PM"],
      description: "🤿 Snorkel con temática pirata. Incluye: equipo de snorkel, guía en área protegida, nado entre peces tropicales, almuerzo (burritos de carne y pollo, ensalada de pasta, salchichas, papas fritas, guacamole, salsas), barra libre nacional, música y actividades piratas a bordo. Entrada al muelle incluida.",
      image: "https://plus.unsplash.com/premium_photo-1661265851801-e523847e3932?q=80&w=1548&auto=format",
      category: "Water",
      location: "Los Cabos",
      featured: false,
    },
    {
      slug: "piratas-whale-watching",
      name: "Piratas: Whale Watching (Thar She Blows)",
      price: 85,
      times: ["8:00 AM"],
      description: "🐋 Avistamiento de ballenas estilo pirata. Incluye: desayuno, barra libre, show pirata a bordo, guía especializado. Entrada al muelle incluida.",
      image: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?q=80&w=2070&auto=format",
      category: "Wildlife",
      location: "Los Cabos",
      featured: false,
    },
    {
      slug: "piratas-snorkel-treasure-quest",
      name: "Piratas: Snorkel Treasure Quest",
      price: 85,
      times: ["10:00 AM", "2:00 PM"],
      description: "🏴‍☠️ Búsqueda del tesoro submarino. Incluye: equipo de snorkel, guía, almuerzo, barra libre, actividades interactivas para niños y adultos. Entrada al muelle incluida.",
      image: "https://plus.unsplash.com/premium_photo-1682091874987-687e0c1026b8?q=80&w=1548&auto=format",
      category: "Adventure",
      location: "Los Cabos",
      featured: false,
    },
    {
      slug: "piratas-sunset-yo-ho-show",
      name: "Piratas: Sunset Yo Ho Show",
      price: 85,
      times: ["6:00 PM"],  // Real: 6-8 PM
      description: "🌅 Atardecer con show pirata (6:00 PM a 8:00 PM). Incluye: cena completa (costillas BBQ, pollo, pierna de cerdo al horno, puré, verduras, ensalada, mazorca, pan recién horneado), barra libre nacional (cerveza y cócteles), show pirata con acrobacias, lucha de espadas y animación, vista espectacular del atardecer. Entrada al muelle incluida.",
      image: "https://images.unsplash.com/photo-1580166463495-ab4d21922c22?q=80&w=1470&auto=format",
      category: "Luxury",
      location: "Los Cabos",
      featured: false,
    },

    // ==================== TU ENAMORADO ($165) ====================
    {
      slug: "tu-enamorado-whale-watching",
      name: "Tu Enamorado: Whale Watching",
      price: 165,
      times: ["8:00 AM"],
      description: "🐋 Avistamiento de ballenas premium. Incluye: desayuno gourmet, barra libre, guía especializado, entradas al muelle. Experiencia íntima y de lujo.",
      image: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?q=80&w=2070&auto=format",
      category: "Wildlife",
      location: "Los Cabos",
      featured: true,
    },
    {
      slug: "tu-enamorado-wind-sea",
      name: "Tu Enamorado: Wind & Sea",
      price: 165,
      times: ["11:00 AM"],
      description: "⛵ Vela y aventura. Incluye: navegación, snorkel en lugares exclusivos, almuerzo gourmet, barra libre premium, entradas al muelle.",
      image: "https://images.unsplash.com/photo-1553603227-2358aabe821e?q=80&w=1632&auto=format",
      category: "Water",
      location: "Los Cabos",
      featured: false,
    },
    {
      slug: "tu-enamorado-sunset-sails",
      name: "Tu Enamorado: Sunset Sails",
      price: 165,
      times: ["5:00 PM"],  // Real: 5-8 PM (3 horas)
      description: "🌅 Velero al atardecer (5:00 PM a 8:00 PM). Incluye: cena romántica, barra libre premium, música en vivo, entradas al muelle. Ideal para parejas.",
      image: "https://images.unsplash.com/photo-1580166463495-ab4d21922c22?q=80&w=1470&auto=format",
      category: "Luxury",
      location: "Los Cabos",
      featured: true,
    },

    // ==================== YATES (por hora) ====================
    {
      slug: "yacht-azimut-encore-70ft",
      name: "70ft Azimut Encore Yacht (por hora)",
      price: 700,
      times: ["Flexible - 3 horas mínimo"],
      description: "🛥️ Yate de lujo 70 FT AZIMUT ENCORE. Tarifa: $700 USD por hora (mínimo 3 horas). Capacidad base: hasta 10 invitados. Invitado adicional: +$120 USD. Cuenta con: 3 habitaciones, 3 baños, paddleboards, equipo de snorkel, floating mat, toallas. Ideal para grupos privados. (Precio mostrado es por hora, no incluye tarifa por invitados extra).",
      image: "https://images.unsplash.com/photo-1580166463495-ab4d21922c22?q=80&w=1470&auto=format",
      category: "Luxury",
      location: "Los Cabos",
      featured: true,
    },
    {
      slug: "yacht-viking-avicci-90ft",
      name: "90ft Viking Avicci Yacht (por hora)",
      price: 1000,
      times: ["Flexible - 3 horas mínimo"],
      description: "🛥️ Yate de lujo 90 FT VIKING AVICCI. Tarifa: $1,000 USD por hora (mínimo 3 horas). Capacidad base: hasta 12 invitados. Invitado adicional: +$100 USD. Cuenta con: 4 habitaciones, 3 baños, kayak, paddleboards, equipo de snorkel, floating mat, toallas. (Precio mostrado es por hora, no incluye tarifa por invitados extra).",
      image: "https://images.unsplash.com/photo-1580166463495-ab4d21922c22?q=80&w=1470&auto=format",
      category: "Luxury",
      location: "Los Cabos",
      featured: true,
    },
    {
      slug: "yacht-maiora-lady-katana-100ft",
      name: "100ft Maiora Lady Katana Yacht (por hora)",
      price: 1100,
      times: ["Flexible - 3 horas mínimo"],
      description: "🛥️ Yate de lujo 100 FT MAIORA LADY KATANA. Tarifa: $1,100 USD por hora (mínimo 3 horas). Capacidad base: hasta 14 invitados. Invitado adicional: +$130 USD. Cuenta con: 4 habitaciones, 3 baños, kayak, paddleboards, equipo de snorkel, floating mat, toallas. (Precio mostrado es por hora, no incluye tarifa por invitados extra).",
      image: "https://images.unsplash.com/photo-1580166463495-ab4d21922c22?q=80&w=1470&auto=format",
      category: "Luxury",
      location: "Los Cabos",
      featured: true,
    },

    // ==================== DIAMANTE TOURS (USD) ====================
    {
      slug: "diamante-kayak-manglares",
      name: "Diamante Tours: Kayak por los Manglares",
      price: 65,  // 1300 MXN
      times: ["9:00 AM"],
      description: "🌿🚣‍♂️ Recorre hermosos manglares desde el agua. Duración: 3.5 horas. Incluye: equipo completo de kayak, guía certificado, bebidas y snacks, fotos y video incluidos. Vive una experiencia única conectando con la naturaleza.",
      image: "https://images.unsplash.com/photo-1552083375-b1442ee90a8d?q=80&w=1470&auto=format",
      category: "Adventure",
      location: "Los Cabos",
      featured: false,
    },
    {
      slug: "diamante-sandboarding-dunas",
      name: "Diamante Tours: Sandboarding en las Dunas",
      price: 65,  // 1300 MXN
      times: ["6:30 AM", "4:15 PM"],
      description: "🌅🏂 Deslízate por las dunas del Mogote con vistas paradisíacas. Turno matutino (6:30 AM) o vespertino (4:15 PM). Duración 3-4 horas. Incluye: transporte ida y regreso, tabla de sandboarding, goggles protectores, bebida hidratante, guía certificado, 10 fotografías profesionales. Vive la aventura entre arena y mar.",
      image: "https://images.unsplash.com/photo-1509319117199-1deb71cfc01f?q=80&w=1470&auto=format",
      category: "Adventure",
      location: "Los Cabos",
      featured: false,
    },
    {
      slug: "diamante-velero-balandra",
      name: "Diamante Tours: Paseo Privado en Velero - Tour Balandra",
      price: 530,  // 10600 MXN
      times: ["8:00 AM"],
      description: "⛵🌊 Tour privado de 10 horas a Balandra (máx 6 personas). Incluye: capitán y marinero, bebidas y alimentos, equipo de snorkel, 2 kayaks, 1 paddle board, música. Persona extra +$40 USD (800 MXN). Explora una de las playas más hermosas de México.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1473&auto=format",
      category: "Luxury",
      location: "Los Cabos",
      featured: true,
    },
    {
      slug: "diamante-velero-playas-cercanas",
      name: "Diamante Tours: Paseo Privado en Velero - Playas Cercanas",
      price: 445,  // 8900 MXN
      times: ["9:00 AM"],
      description: "⛵🌊 Tour privado de 8 horas a playas cercanas (máx 6 personas). Incluye: capitán y marinero, bebidas y alimentos, equipo de snorkel, 2 kayaks, 1 paddle board, música. Persona extra +$40 USD. Perfecto para snorkel, kayak y un día completo en el mar.",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1470&auto=format",
      category: "Luxury",
      location: "Los Cabos",
      featured: false,
    },
    {
      slug: "diamante-velero-atardecer",
      name: "Diamante Tours: Paseo Privado en Velero - Atardecer",
      price: 280,  // 5600 MXN
      times: ["3:00 PM"],
      description: "⛵🌅 Tour privado de 4 horas al atardecer (máx 6 personas). Incluye: capitán y marinero, vino, tabla de quesos y carnes frías, equipo de snorkel, 2 kayaks, 1 paddle board, música. Persona extra +$40 USD. Disfruta un increíble atardecer en el mar.",
      image: "https://images.unsplash.com/photo-1580166463495-ab4d21922c22?q=80&w=1470&auto=format",
      category: "Luxury",
      location: "Los Cabos",
      featured: true,
    },  
    // Tour Isla Espíritu Santo + Balandra (6h)
    {
      slug: "diamante-espiritu-santo-balandra",
      name: "Diamante Tours: Isla Espíritu Santo y Bahía Balandra",
      price: 75, // 1500 MXN
      times: ["8:00 AM"],
      description: "🏝️ Recorrido de 6 horas todo incluido a la Isla Espíritu Santo. Visita: Bahía Balandra (playa más hermosa de México), Bahía San Gabriel, Arco de los Sueños, snorkel en Los Islotes con lobos marinos. Incluye: picnic en playa con ceviche, sandwiches dulces y salados, fruta, agua, refrescos, alcohol de cortesía, equipo de snorkel, chaleco salvavidas, guía biólogo marino, capitán certificado.",
      image: "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?q=80&w=2070&auto=format",
      category: "Water",
      location: "La Paz",
      featured: true,
    },
    // Nado con Tiburón Ballena (4 turnos)
    {
      slug: "diamante-tiburon-ballena",
      name: "Diamante Tours: Nado y Avistamiento de Tiburón Ballena",
      price: 75, // 1500 MXN
      times: ["8:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"],
      description: "🦈 Sumérgete con el pez más grande del océano. Duración 2 horas. Incluye: equipo de snorkel, guía certificado, capitán certificado, chalecos salvavidas, barritas energéticas, fruta de temporada, aguas y refrescos. Turnos: 8-11 AM, 11 AM-1 PM, 1-3 PM, 3-5 PM. Experiencia única en la Bahía de La Paz.",
      image: "https://images.unsplash.com/photo-1620095198790-2f663d67677d?q=80&w=1470&auto=format",
      category: "Wildlife",
      location: "La Paz",
      featured: true,
    },
    // Ballena Gris en Puerto Chale (sin transporte)
    {
      slug: "diamante-ballena-gris-sin-transporte",
      name: "Diamante Tours: Ballena Gris en Puerto Chale (sin transporte)",
      price: 50, // 1000 MXN
      times: ["8:00 AM"],
      description: "🐋 Avistamiento de ballena gris en Puerto Chale. Duración 2 horas. Incluye: recorrido en lancha, capitán certificado. Precio por adulto $1000 MXN, niños menores de 7 años $700 MXN. (El precio mostrado es por adulto). Sin transporte. Opción con transporte disponible en otro producto.",
      image: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?q=80&w=2070&auto=format",
      category: "Wildlife",
      location: "La Paz",
      featured: false,
    },
    // Ballena Gris en Puerto Chale (con transporte)
    {
      slug: "diamante-ballena-gris-con-transporte",
      name: "Diamante Tours: Ballena Gris en Puerto Chale (con transporte)",
      price: 135, // 2700 MXN
      times: ["6:00 AM"],
      description: "🐋 Avistamiento de ballena gris con transporte desde La Paz. Duración total aprox. 6 horas (2h ida, 2h tour, 2h vuelta). Incluye: transporte ida y vuelta, desayuno regional, tour de 2 horas, capitán certificado. Precios: adultos $2700 MXN, niños de 8 años $2300 MXN, niños 1-3 años $1250 MXN. (Precio mostrado por adulto).",
      image: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?q=80&w=2070&auto=format",
      category: "Wildlife",
      location: "La Paz",
      featured: false,
    },
    // Paseo al Arco de Cabo San Lucas + Ballena Jorobada
    {
      slug: "diamante-arco-ballena-jorobada",
      name: "Diamante Tours: Arco de Cabo San Lucas y Ballena Jorobada",
      price: 50, // 1000 MXN
      times: ["9:00 AM", "12:00 PM"],
      description: "🐋🌊 Paseo de 2 horas por la bahía de Cabo San Lucas. Observa el famoso Arco, la playa del Amor, y en temporada, espectaculares ballenas jorobadas. Incluye: capitán certificado. Precios: adultos $1000 MXN, niños $800 MXN. (Precio mostrado por adulto).",
      image: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?q=80&w=2070&auto=format",
      category: "Wildlife",
      location: "Los Cabos",
      featured: false,
    },
    // Pesca Deportiva en Isla Espíritu Santo (precio tentativo)
    {
      slug: "diamante-pesca-espiritu-santo",
      name: "Diamante Tours: Pesca Deportiva en Isla Espíritu Santo",
      price: 150, // precio tentativo (consultar)
      times: ["7:00 AM"],
      description: "🎣 Aventura de pesca deportiva de 6-7 horas en Isla Espíritu Santo. Zona con gran actividad de peces. Incluye: embarcación, capitán, equipo de pesca, bebidas y snacks. Precio por consultar (referencia $150 USD por adulto). Comunícate con nosotros para tarifas exactas.",
      image: "https://images.unsplash.com/photo-1620095198790-2f663d67677d?q=80&w=1470&auto=format",
      category: "Adventure",
      location: "La Paz",
      featured: false,
    },
    // Yate La Nena (8h, 12 pax, 35,000 MXN)
    {
      slug: "diamante-yate-la-nena",
      name: "Diamante Tours: Yate La Nena (8 horas)",
      price: 1750, // 35,000 MXN / 20
      times: ["8:00 AM"],
      description: "🛥️ Yate de lujo de 42 pies, capacidad 12 personas. Recorrido de 8 horas por el Mar de Cortés. Incluye: capitán certificado, alimentos y bebidas, paddle board, espacios interiores de lujo. Precio total por embarcación: $35,000 MXN (≈ $1,750 USD). Ideal para grupos privados.",
      image: "https://images.unsplash.com/photo-1580166463495-ab4d21922c22?q=80&w=1470&auto=format",
      category: "Luxury",
      location: "La Paz",
      featured: true,
    },
    // Renta de embarcaciones privadas (precio variable)
    {
      slug: "diamante-renta-embarcacion-privada",
      name: "Diamante Tours: Renta de Embarcación Privada",
      price: 0, // precio bajo demanda
      times: ["8:00 AM"],
      description: "⛵ Renta de embarcaciones de alta calidad (Diamante Negro, Diamante Blanco, Diamante 1, 3, 7) para recorridos privados de 8 horas. Incluye: capitán certificado, guía, alimentos y bebidas, equipo de snorkel, chalecos salvavidas, sanitario, equipo de sonido, asientos acolchonados, techo. Precio variable según la embarcación. Contáctanos para cotizar.",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1470&auto=format",
      category: "Luxury",
      location: "La Paz",
      featured: false,
    },
    ],
  });

  /* =========================================
     VACATION PACKAGES 
  ========================================= */
  await prisma.vacationPackage.createMany({
    data: [
          // ========== NUEVOS PAQUETES CORAZÓN RESORT & SPA ==========
      {
      slug: "corazon-sea-stay-getaway",
      name: "Sea & Stay Getaway Package",
      days: 4, // 5 days/4 nights
      price: 402.0,
      resort: "Corazón Resort & Spa",
      location: "Los Cabos", // Asumimos ubicación en Los Cabos, puedes cambiarlo
      category: "Luxury",
      features: [
        "5 day / 4 night stay",
        "Deluxe one bedroom suite with king bed",
        "Ocean view and pool views from private terrace",
        "Kitchenette, mini refrigerator, and more",
        "Over $1,000 of savings!"
      ],
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2070&auto=format&fit=crop",
      featured: true,
    },
    {
      slug: "corazon-sea-stay-week",
      name: "Sea & Stay Week Package",
      days: 7, // 8 days/7 nights
      price: 656.6,
      resort: "Corazón Resort & Spa",
      location: "Los Cabos",
      category: "Luxury",
      features: [
        "8 day / 7 night stay",
        "Deluxe one bedroom suite with king bed",
        "Ocean view and pool views from private terrace",
        "Kitchenette, mini refrigerator, and more",
        "Over $1,500 of savings!"
      ],
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop",
      featured: true,
    },
    {
      slug: "corazon-premium-getaway",
      name: "Premium Getaway Package",
      days: 4, // 5 days/4 nights
      price: 938.0,
      resort: "Corazón Resort & Spa",
      location: "Los Cabos",
      category: "Premium",
      features: [
        "5 day / 4 night stay",
        "Two bedroom executive with private jacuzzi",
        "Full size kitchen with cooking amenities",
        "Over $2,000 of savings!"
      ],
      image: "https://images.unsplash.com/photo-1678913308053-316cee77afe9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      featured: true,
    },
    {
      slug: "corazon-premium-week",
      name: "Premium Week Package",
      days: 7, // 8 days/7 nights
      price: 1594.6,
      resort: "Corazón Resort & Spa",
      location: "Los Cabos",
      category: "Premium",
      features: [
        "8 day / 7 night stay",
        "Two bedroom executive with private jacuzzi",
        "Full size kitchen with cooking amenities",
        "Over $2,500 of savings!"
      ],
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop",
      featured: true,
    },
    ],
  });

  /* =========================================
     ARTICLES (todos los datos de lib/news.ts)
  ========================================= */
  await prisma.article.createMany({
    data: [
      {
        slug: "cancun-airport-transport",
        title: "Cómo moverte del Aeropuerto de Cancún a tu hotel",
        category: "Guide",
        region: "Cancún",
        description:
          "Transporte seguro, precios y recomendaciones para turistas.",
        image:
          "https://images.unsplash.com/photo-1536657464919-892534f60d6e?q=80&w=2070&auto=format&fit=crop",
        content:
          "El aeropuerto de Cancún recibe millones de turistas cada año. Las mejores opciones son: ADO bus (económico), transfer privado (cómodo) o renta de auto (flexible). Evita taxis sin identificación oficial.",
        date: "Abril 2026",
        featured: true,
      },
      {
        slug: "cdmx-gastronomy-tour",
        title: "Tour gastronómico por la CDMX: de mercados a alta cocina",
        category: "Food",
        region: "CDMX",
        description:
          "Descubre los sabores más auténticos de la Ciudad de México.",
        image:
          "https://images.unsplash.com/photo-1505483531331-fc3cf89fd0fa?q=80&w=2070&auto=format&fit=crop",
        content:
          "Desde tacos al pastor en el centro hasta restaurantes con estrella Michelin en Polanco. No te pierdas el mercado de San Juan y una cata de mezcal.",
        date: "Abril 2026",
        featured: true,
      },
      {
        slug: "cabo-whale-watching-2026",
        title: "Temporada de ballenas en Los Cabos 2026",
        category: "Experience",
        region: "Los Cabos",
        description:
          "Las mejores fechas y tours para avistar ballenas jorobadas.",
        image:
          "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?q=80&w=2070&auto=format&fit=crop",
        content:
          "De diciembre a abril, las ballenas llegan a Baja California Sur. Contrata tours con biólogos marinos y respeta las normas de avistamiento.",
        date: "Marzo 2026",
        featured: true,
      },
      {
        slug: "tulum-ruins-guide",
        title: "Guía completa para visitar las ruinas de Tulum",
        category: "Guide",
        region: "Tulum",
        description: "Horarios, precios, y cómo evitar multitudes.",
        image:
          "https://images.unsplash.com/photo-1518638150340-f706e86654de?q=80&w=2070&auto=format&fit=crop",
        content:
          "Llega temprano (antes de las 8 am) para tener las ruinas casi vacías. Lleva protector biodegradable, sombrero y agua. El acantilado con vista al mar es impresionante.",
        date: "Marzo 2026",
        featured: false,
      },
      {
        slug: "puerto-vallarta-hidden-beaches",
        title: "Playas escondidas en Puerto Vallarta que debes conocer",
        category: "Travel",
        region: "Puerto Vallarta",
        description:
          "Desde Playa Las Ánimas hasta Yelapa, solo accesibles por agua.",
        image:
          "https://images.unsplash.com/photo-1516302752625-fcc5c5d17bb5?q=80&w=2070&auto=format&fit=crop",
        content:
          "Toma un water taxi desde el muelle de Los Muertos. Playa Colomitos es una pequeña joya rodeada de selva. Lleva efectivo para comida y bebida.",
        date: "Febrero 2026",
        featured: false,
      },
      {
        slug: "merida-yucatan-safe",
        title: "¿Mérida es seguro para viajar? Datos 2026",
        category: "Insight",
        region: "Mérida",
        description: "Una de las ciudades más seguras de México y de América.",
        image:
          "https://images.unsplash.com/photo-1598801094040-5e2d31e6b6e5?q=80&w=2070&auto=format&fit=crop",
        content:
          "Mérida ha sido reconocida como la ciudad más segura de México. Su centro histórico, los cenotes cercanos y la gastronomía hacen de ella un destino imperdible.",
        date: "Enero 2026",
        featured: false,
      },
      {
        slug: "chichen-itza-2026",
        title: "Chichén Itzá: nuevas reglas para turistas en 2026",
        category: "News",
        region: "Yucatán",
        description:
          "Prohibición de selfie sticks, horarios y accesos renovados.",
        image:
          "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?q=80&w=2070&auto=format&fit=crop",
        content:
          "A partir de marzo de 2026 ya no se permiten trípodes ni bastones para selfies. También se ha limitado el aforo diario para preservar el sitio. Compra boletos en línea con anticipación.",
        date: "Enero 2026",
        featured: true,
      },
      {
        slug: "gdl-tequila-train",
        title: "El Tren del Tequila: experiencia desde Guadalajara",
        category: "Experience",
        region: "Guadalajara",
        description:
          "Un viaje en tren con degustaciones y paisajes agaveros.",
        image:
          "https://images.unsplash.com/photo-1591159952402-74f2a7b0a8a4?q=80&w=2070&auto=format&fit=crop",
        content:
          "El Tequila Express recorre los campos de agave y termina en una destilería tradicional. Incluye música en vivo y comida típica. Reserva con meses de anticipación.",
        date: "Diciembre 2025",
        featured: false,
      },
    ],
  });

  console.log("✅ Database seeded with all tours, vacations and articles");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });