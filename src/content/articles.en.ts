/**
 * Données de contenu (articles.en).
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

import type { Article } from "./types";

/** Local guide "What to see" — English mirror of articles.fr.ts
 *  (same order/index: en[i] ↔ fr[i], cf. src/lib/nav.ts). */
export const articlesEn: Article[] = [
  {
    slug: "best-beaches-deshaies",
    cover: "/media/lieux/plage-de-grande-anse-a-deshaies-guadeloupe-6.webp",
    category: "Beaches",
    title: "The best beaches around Deshaies",
    excerpt:
      "Grande Anse, La Perle, Leroux, Petite Anse, Rifflet: the full guide to the golden-sand beaches minutes from the Domaine de Bornave.",
    readingTime: "7 min",
    distance: "5 to 20 min by car",
    sections: [
      {
        paragraphs: [
          "Deshaies, on the leeward coast of Basse-Terre, holds some of the finest beaches in Guadeloupe: golden sand, calm sheltered water, coconut palms and green hills as a backdrop. From the heights of the Domaine de Bornave most are 5 to 20 minutes away by car, so you can switch beach every day depending on your mood — family swimming, snorkelling, lazing or sunset.",
        ],
      },
      {
        heading: "Grande Anse Beach — the iconic one",
        paragraphs: [
          "A few minutes from the estate, the majestic Grande Anse Beach unfolds a vast ribbon of golden sand for nearly two kilometres, lined with sea grapes, coconut palms and forest-covered hills. It is the best-known beach of Deshaies, perfect for family swimming, strolling and spectacular Caribbean sunsets.",
          "Grande Anse is also a recurring filming location of the British series “Death in Paradise”, shot in Deshaies — an extra draw for many visitors. Swell can occur: check conditions and prefer the more sheltered central area.",
          "On site: beach restaurants and snacks, sun-lounger rental, parking. Come early in high season for calm and easy parking.",
        ],
      },
      {
        heading: "Leroux Beach (Ferry) — the closest",
        paragraphs: [
          "In the Ferry district, just below the estate, Leroux Beach is the most accessible from Bornave. More intimate and confidential than Grande Anse, this golden-sand beach lined with coconut palms has a peaceful, authentic feel, mostly enjoyed by locals.",
          "Its generally calm waters make it an excellent choice for quiet swimming, snorkelling near the rocks and families with children. Perfect for an end-of-day dip without the car.",
        ],
      },
      {
        heading: "La Perle Beach — snorkelling & nature",
        paragraphs: [
          "Wilder, La Perle Beach is loved for its clear water, light sand and preserved setting between Deshaies and Pointe-Noire. A favourite for snorkelling along its rocky ends. Swell can be noticeable: stay cautious and watch the flags.",
        ],
      },
      {
        heading: "Petite Anse, Rifflet & Clugny — the hidden ones",
        paragraphs: [
          "To get off the beaten track, the coast around Deshaies hides more coves: Petite Anse and its fishing-village feel, the wild Rifflet Beach, or the long Clugny Beach towards Sainte-Rose — variations to alternate swimming, photos and quiet throughout your stay.",
        ],
      },
      {
        heading: "Practical tips",
        paragraphs: [
          "Bring water shoes for rocky beaches, mask and snorkel, reef-safe sunscreen. Mornings are usually the calmest (sea and crowds). From the estate, Serge will point you to the beach best suited to the day's weather and swell.",
        ],
      },
    ],
    relatedGites: ["gran-kaz", "kaz-an-nou", "ti-kaz-la"],
    seo: {
      title: "The best beaches in Deshaies (Grande Anse, La Perle, Leroux)",
      description:
        "Complete guide to Deshaies beaches, Guadeloupe: Grande Anse, Leroux, La Perle, Petite Anse, Rifflet — access, swimming, snorkelling from the Domaine de Bornave.",
    },
  },
  {
    slug: "deshaies-botanical-garden",
    cover: "/media/lieux/le-port-deshaies-en-guadeloupe-3.webp",
    category: "To visit",
    title: "The Deshaies Botanical Garden",
    excerpt:
      "Seven hectares of tropical gardens, over 1,000 species, macaws and pink flamingos: the must-see of Deshaies, former estate of Coluche.",
    readingTime: "5 min",
    distance: "≈ 10 min by car",
    sections: [
      {
        paragraphs: [
          "The Deshaies Botanical Garden is one of the must-see visits on the leeward coast and one of Guadeloupe's most loved attractions. Set on the former property of the comedian Coluche, on the heights above the village, it unfolds a seven-hectare landscaped park designed as a sensory walk.",
        ],
      },
      {
        heading: "What you'll discover",
        paragraphs: [
          "Over a thousand tropical plant species follow one another: palm grove, water-lily and lotus ponds, bromeliad garden, orchid wall, cacti, giant traveller's trees. The shaded, signposted route opens onto clear views over Deshaies bay and the Caribbean Sea.",
          "For wildlife, the garden has an aviary where you can feed macaws and lorikeets, a koi carp pond and a very photogenic group of pink flamingos — a highlight, especially with children.",
        ],
      },
      {
        heading: "Visiting tips",
        paragraphs: [
          "Allow about 1 h 30 to 2 h at a gentle pace. Prefer the morning for light and cool air. Comfortable shoes, water and a hat recommended; a tea room with a view offers a break. The site is sloped: expect some walking.",
          "Just ten minutes from the Domaine de Bornave, the Botanical Garden combines ideally with a morning at Grande Anse or a stroll in Deshaies village.",
        ],
      },
    ],
    relatedGites: ["kaz-an-nou", "gran-kaz"],
    seo: {
      title: "Deshaies Botanical Garden – Visit & access from Bornave",
      description:
        "Visit the Deshaies Botanical Garden (former estate of Coluche): 7 ha, 1,000+ species, macaws and flamingos — ≈ 10 min from the Domaine de Bornave.",
    },
  },
  {
    slug: "cousteau-reserve-diving-snorkeling",
    cover:
      "/media/lieux/plage-de-grande-anse-a-deshaies-guadeloupe-13.webp",
    category: "Activities",
    title: "Diving & snorkelling at the Cousteau Reserve",
    excerpt:
      "Off Pigeon (Bouillante), the Cousteau Reserve seabed is among the finest in the Caribbean: turtles, corals, tropical wildlife.",
    readingTime: "5 min",
    distance: "≈ 30 min by car",
    sections: [
      {
        paragraphs: [
          "About thirty minutes from the Domaine de Bornave, down the leeward coast towards Bouillante, the Cousteau Reserve is THE underwater spot of Guadeloupe. This protected marine area around the Pigeon islets is named after Commander Cousteau, who praised its richness. Calm clear water and shallow depths near shore make it a perfect playground, from beginners to experienced divers.",
        ],
      },
      {
        heading: "Snorkelling & diving",
        paragraphs: [
          "Snorkelling from Malendure beach or by boat shuttle to the Pigeon islets, you easily spot parrotfish, sergeant-majors, sea fans and, with some luck, green turtles grazing the seagrass. The famous submerged bust of Commander Cousteau is one of the divers' highlights.",
          "Many clubs offer try-dives, exploration dives and guided snorkelling trips from Malendure, plus glass-bottom boat excursions — ideal for families and non-divers.",
        ],
      },
      {
        heading: "Good to know",
        paragraphs: [
          "Book trips ahead in high season. Mornings usually offer better visibility and calmer sea. Bring mineral sunscreen (protected area), water shoes and a UV rash guard. Combine the day with the nearby hot springs and falls of Bouillante.",
        ],
      },
    ],
    relatedGites: ["ti-kaz-la", "rayon-jaune"],
    seo: {
      title: "Cousteau Reserve: diving & snorkelling from Deshaies",
      description:
        "Diving and snorkelling at the Cousteau Reserve (Pigeon, Bouillante): turtles, corals, Cousteau bust — ≈ 30 min from the Domaine de Bornave, Deshaies.",
    },
  },
  {
    slug: "pointe-noire-house-of-cocoa",
    cover:
      "/media/lieux/coucher-de-soleil-depuis-tainos-cottage-a-deshaies-en-guadeloupe-9-scaled.webp",
    category: "To visit",
    title: "Pointe-Noire, the House of Cocoa & the Mamelles Zoo",
    excerpt:
      "South, a wilder Basse-Terre: House of Cocoa, House of Wood, rivers, and the Mamelles Park with its rainforest zoo.",
    readingTime: "6 min",
    distance: "10 to 30 min by car",
    sections: [
      {
        paragraphs: [
          "Leaving Deshaies southward, the town of Pointe-Noire reveals another Basse-Terre: wilder, mountainous and deeply rooted in craft traditions and rainforest. It is the gateway to a great day of discovery, 10 to 30 minutes from the Domaine de Bornave.",
        ],
      },
      {
        heading: "The House of Cocoa",
        paragraphs: [
          "On the road to Pointe-Noire, the House of Cocoa retraces the history and know-how of cocoa in Guadeloupe: an educational plantation, the steps from pod to bar, and an old-fashioned hot-chocolate tasting. A short, gourmet visit, ideal for families.",
        ],
      },
      {
        heading: "Pointe-Noire & wood craft",
        paragraphs: [
          "Pointe-Noire is renowned for woodworking; the House of Wood and artisan workshops showcase local timbers and traditional trades. The authentic village offers a sincere glimpse of Creole life on the leeward coast.",
        ],
      },
      {
        heading: "The Mamelles Park & its zoo",
        paragraphs: [
          "Continuing towards the Route de la Traversée, the Mamelles Park houses a zoo set in the heart of the rainforest. The trail, partly on walkways suspended in the canopy, presents iconic Caribbean and American species (raccoons, iguanas, birds of prey…) and includes a treetop adventure course. Allow half a day, ideal with children.",
        ],
      },
      {
        heading: "Nature & rivers",
        paragraphs: [
          "The surroundings offer rivers and natural pools (Route de la Traversée and National Park area), perfect for a freshwater dip or a short shaded hike under tree ferns. A refreshing complement after the visit.",
        ],
      },
    ],
    relatedGites: ["kaz-an-nou", "gran-kaz"],
    seo: {
      title: "Pointe-Noire, House of Cocoa & Mamelles Zoo | Bornave",
      description:
        "What to do in Pointe-Noire from Deshaies: House of Cocoa, House of Wood, Mamelles Zoo, rivers — 10-30 min from the Domaine de Bornave.",
    },
  },
  {
    slug: "how-to-get-to-deshaies-airport",
    cover: "/media/domaine/vue-aerienne-deshaies.png",
    category: "Practical",
    title: "How to get to Deshaies from the airport",
    excerpt:
      "From Pôle Caraïbes airport (Pointe-à-Pitre): route, duration, car rental and access tips to the Domaine de Bornave.",
    readingTime: "5 min",
    sections: [
      {
        paragraphs: [
          "The Domaine de Bornave sits on the heights of Deshaies, Ferry district, on the leeward coast of Basse-Terre. All long-haul flights land at Guadeloupe Pôle Caraïbes international airport, in Pointe-à-Pitre (Grande-Terre).",
        ],
      },
      {
        heading: "Route & duration",
        paragraphs: [
          "From the airport, allow about 1 h to 1 h 15 to Deshaies (depending on traffic around Pointe-à-Pitre and Baie-Mahault). The simplest route follows the coast via Sainte-Rose then down to Deshaies. The road is scenic but winding at the end: drive calmly, especially at night.",
        ],
      },
      {
        heading: "Car rental: strongly advised",
        paragraphs: [
          "A car is strongly recommended for a stay in Deshaies: it makes you independent for the beaches, the Botanical Garden, the Cousteau Reserve and leeward-coast excursions, poorly served by public transport. Book your vehicle ahead, especially in high season; rental desks are at the airport.",
        ],
      },
      {
        heading: "Arriving at the estate",
        paragraphs: [
          "Approaching Deshaies, access to the Ferry district is via a small road climbing to the heights. Serge sends you the precise directions before arrival and welcomes you on site to guide you — useful for late-day arrivals.",
        ],
      },
    ],
    relatedGites: ["gran-kaz", "ti-kaz-la"],
    seo: {
      title: "How to get to Deshaies from Pointe-à-Pitre airport",
      description:
        "Getting to the Domaine de Bornave in Deshaies from Pôle Caraïbes airport: ≈ 1 h drive, car rental advised, welcome by Serge.",
    },
  },
  {
    slug: "when-to-visit-guadeloupe-deshaies",
    cover:
      "/media/lieux/coucher-de-soleil-sur-grande-anse-deshaies-en-guadeloupe-4-2.webp",
    category: "Practical",
    title: "When to visit Deshaies in Guadeloupe?",
    excerpt:
      "Dry season, wet season, ideal periods, weather and booking tips to choose the best time for your stay.",
    readingTime: "5 min",
    sections: [
      {
        paragraphs: [
          "Guadeloupe can be visited all year round thanks to its mild tropical climate, tempered by the trade winds. The right period depends mainly on your tolerance to showers, your budget and the crowds you want. Deshaies, on the leeward coast, enjoys generous sunshine.",
        ],
      },
      {
        heading: "Dry season (“carême”), December to April",
        paragraphs: [
          "The sunniest and most popular period: clear skies, often calm sea, heat made bearable by the trade winds. It covers the year-end holidays, winter and spring breaks. Book several months ahead, especially for Christmas, New Year and February.",
        ],
      },
      {
        heading: "Wet season (“hivernage”), July to November",
        paragraphs: [
          "Hotter and more humid, it alternates fine spells and often brief tropical showers. Nature is then a vivid green and rates softer. The peak of cyclonic activity is August-September: cancellation insurance and weather monitoring are advised. May-June and November are excellent compromises (pleasant climate, moderate crowds).",
        ],
      },
      {
        heading: "Our advice",
        paragraphs: [
          "For a balance of sun / quiet / budget, aim for the shoulder seasons (late April-June, November). Outside high season, the estate regains all its calm: an ideal getaway for two. Whatever the period, book key dates and the car in advance.",
        ],
      },
    ],
    relatedGites: ["rayon-jaune", "rayon-bleu"],
    seo: {
      title: "When to visit Guadeloupe? Best time for Deshaies",
      description:
        "When to go to Deshaies, Guadeloupe: dry season (Dec-Apr), wet season, shoulder seasons and booking tips for the Domaine de Bornave.",
    },
  },
];
