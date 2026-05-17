/**
 * Données de contenu (articles.fr).
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

import type { Article } from "./types";

/**
 * Guide local « Que visiter » — articles SEO longue traîne (top-of-funnel).
 * Maillés en interne vers les gîtes. Ajouter un article : voir
 * docs/blog-que-visiter.md.
 */
export const articlesFr: Article[] = [
  {
    slug: "plus-belles-plages-deshaies",
    cover: "/media/lieux/plage-de-grande-anse-a-deshaies-guadeloupe-6.webp",
    category: "Plages",
    title: "Les plus belles plages autour de Deshaies",
    excerpt:
      "Grande Anse, La Perle, Leroux, Petite Anse : le guide des plages de sable doré à quelques minutes du domaine.",
    readingTime: "5 min",
    distance: "5 à 15 min en voiture",
    sections: [
      {
        heading: "Plage de Grande Anse",
        paragraphs: [
          "À quelques minutes du domaine, la majestueuse Plage de Grande Anse est l'une des plus belles plages de Basse-Terre. Son immense étendue de sable doré, bordée de collines verdoyantes, offre un décor spectaculaire typique de la côte caraïbe.",
          "Idéale pour la baignade en famille, les couchers de soleil et la promenade, c'est la plage la plus emblématique de Deshaies — et l'un des décors de la série « Meurtres au Paradis » (Death in Paradise).",
        ],
      },
      {
        heading: "Plage de Leroux (Ferry)",
        paragraphs: [
          "Située dans le quartier de Ferry à Deshaies, juste en contrebas du domaine, la Plage de Leroux séduit par son atmosphère paisible et authentique. Plus intime que Grande Anse, cette plage de sable doré bordée de cocotiers est idéale pour la baignade, le snorkeling ou un moment de calme face à la mer des Caraïbes.",
        ],
      },
      {
        heading: "Plage de la Perle",
        paragraphs: [
          "Plus sauvage, la Plage de la Perle est appréciée pour ses eaux claires et son cadre préservé, idéale pour la baignade et le snorkeling. Un spot prisé des amoureux de nature.",
        ],
      },
    ],
    relatedGites: ["gran-kaz", "kaz-an-nou", "ti-kaz-la"],
    seo: {
      title:
        "Les plus belles plages de Deshaies (Grande Anse, La Perle, Leroux)",
      description:
        "Guide des plages autour de Deshaies en Guadeloupe : Grande Anse, La Perle, Leroux, Petite Anse — à quelques minutes du Domaine de Bornave.",
    },
  },
  {
    slug: "jardin-botanique-deshaies",
    cover: "/media/lieux/le-port-deshaies-en-guadeloupe-3.webp",
    category: "À visiter",
    title: "Le Jardin Botanique de Deshaies",
    excerpt:
      "Sept hectares de jardins tropicaux, plus de 1 000 espèces, flamants et aras : l'incontournable de Deshaies, ancienne propriété de Coluche.",
    readingTime: "3 min",
    distance: "≈ 10 min en voiture",
    sections: [
      {
        paragraphs: [
          "Le Jardin Botanique de Deshaies est l'une des visites incontournables de la côte sous le vent. Aménagé sur l'ancienne propriété de l'humoriste Coluche, il déploie sur sept hectares plus de mille espèces de plantes tropicales, des bassins à nénuphars, une volière d'aras et des flamants roses.",
          "Une promenade ombragée, ludique et pédagogique, idéale pour les familles comme pour les amoureux de nature, à seulement quelques minutes du Domaine de Bornave.",
        ],
      },
    ],
    relatedGites: ["kaz-an-nou", "gran-kaz"],
    seo: {
      title: "Jardin Botanique de Deshaies – Visite & accès depuis Bornave",
      description:
        "Visiter le Jardin Botanique de Deshaies (ancienne propriété de Coluche) : 7 ha, 1 000+ espèces, aras et flamants, à quelques minutes du Domaine de Bornave.",
    },
  },
  {
    slug: "reserve-cousteau-plongee-snorkeling",
    cover:
      "/media/lieux/plage-de-grande-anse-a-deshaies-guadeloupe-13.webp",
    category: "Activités",
    title: "Plongée & snorkeling à la Réserve Cousteau",
    excerpt:
      "Les fonds marins de la Réserve Cousteau, au large de Pigeon (Bouillante), comptent parmi les plus beaux des Caraïbes.",
    readingTime: "3 min",
    distance: "≈ 30 min en voiture",
    sections: [
      {
        paragraphs: [
          "À une trentaine de minutes du domaine, la Réserve Cousteau au large de Pigeon (Bouillante) est le spot incontournable pour la plongée et le snorkeling en Guadeloupe : tortues, poissons tropicaux, jardins de corail et le célèbre buste de Cousteau immergé.",
          "Des sorties masque-tuba et plongée bouteille partent quotidiennement de la plage de Malendure. Une excursion idéale pour une journée découverte depuis Deshaies.",
        ],
      },
    ],
    relatedGites: ["ti-kaz-la", "rayon-jaune"],
    seo: {
      title: "Réserve Cousteau : plongée & snorkeling depuis Deshaies",
      description:
        "Plongée et snorkeling à la Réserve Cousteau (Pigeon, Bouillante) : tortues, coraux, faune tropicale — à ≈ 30 min du Domaine de Bornave, Deshaies.",
    },
  },
  {
    slug: "pointe-noire-maison-du-cacao",
    cover:
      "/media/lieux/coucher-de-soleil-depuis-tainos-cottage-a-deshaies-en-guadeloupe-9-scaled.webp",
    category: "À visiter",
    title: "Pointe-Noire & la Maison du Cacao",
    excerpt:
      "Vers le sud, Pointe-Noire offre une Basse-Terre plus sauvage : Maison du Cacao, Maison du Bois, rivières et le Zoo des Mamelles.",
    readingTime: "4 min",
    distance: "10 à 25 min en voiture",
    sections: [
      {
        paragraphs: [
          "Depuis nos gîtes, en direction du sud, la commune de Pointe-Noire dévoile une autre facette de la Basse-Terre, plus sauvage et profondément ancrée dans la nature et les traditions.",
          "La Maison du Cacao fait découvrir le cacao et le savoir-faire local autour d'une dégustation. Plus loin, le Parc des Mamelles et son zoo, nichés au cœur de la forêt tropicale, proposent un parcours entre passerelles suspendues et espèces emblématiques de la Caraïbe — idéal en famille.",
        ],
      },
    ],
    relatedGites: ["kaz-an-nou", "gran-kaz"],
    seo: {
      title: "Pointe-Noire, Maison du Cacao & Zoo des Mamelles | Bornave",
      description:
        "Que faire à Pointe-Noire depuis Deshaies : Maison du Cacao, Maison du Bois, Zoo des Mamelles, rivières et randonnées — à 10-25 min du Domaine de Bornave.",
    },
  },
  {
    slug: "comment-venir-deshaies-aeroport",
    cover: "/media/domaine/vue-aerienne-deshaies.png",
    category: "Pratique",
    title: "Comment venir à Deshaies depuis l'aéroport",
    excerpt:
      "Depuis l'aéroport Pôle Caraïbes (Pointe-à-Pitre), rejoindre Deshaies et le domaine : itinéraire, durée, location de voiture.",
    readingTime: "3 min",
    sections: [
      {
        paragraphs: [
          "Le Domaine de Bornave se situe à Deshaies, sur la côte sous le vent de la Basse-Terre. Depuis l'aéroport international Guadeloupe Pôle Caraïbes (Pointe-à-Pitre), comptez environ 1 h à 1 h 15 de route par la côte.",
          "La location d'une voiture est vivement recommandée : elle vous permet de profiter librement des plages, du Jardin Botanique et des excursions sur la côte sous le vent. À votre arrivée, Serge vous accueille et vous guide pour la fin du trajet jusqu'au domaine.",
        ],
      },
    ],
    relatedGites: ["gran-kaz", "ti-kaz-la"],
    seo: {
      title: "Comment venir à Deshaies depuis l'aéroport de Pointe-à-Pitre",
      description:
        "Accès au Domaine de Bornave à Deshaies depuis l'aéroport Pôle Caraïbes : ≈ 1 h de route, location de voiture conseillée, accueil par Serge.",
    },
  },
  {
    slug: "quand-venir-guadeloupe-deshaies",
    cover:
      "/media/lieux/coucher-de-soleil-sur-grande-anse-deshaies-en-guadeloupe-4-2.webp",
    category: "Pratique",
    title: "Quand venir à Deshaies en Guadeloupe ?",
    excerpt:
      "Saison sèche, saison humide, périodes idéales : tout pour choisir le meilleur moment de votre séjour.",
    readingTime: "3 min",
    sections: [
      {
        paragraphs: [
          "La Guadeloupe se visite toute l'année grâce à son climat tropical. La saison sèche, le « carême », de décembre à avril, offre le plus de soleil et reste la période la plus demandée — pensez à réserver plusieurs mois à l'avance.",
          "De juillet à novembre, la saison plus humide alterne averses courtes et belles éclaircies, avec une nature luxuriante et des tarifs souvent plus doux. Hors haute saison, le domaine retrouve tout son calme : un moment idéal pour une parenthèse à deux.",
        ],
      },
    ],
    relatedGites: ["rayon-jaune", "rayon-bleu"],
    seo: {
      title: "Quand venir en Guadeloupe ? Meilleure période pour Deshaies",
      description:
        "Quand partir à Deshaies, Guadeloupe : saison sèche (déc.-avril), saison humide, conseils de réservation pour votre séjour au Domaine de Bornave.",
    },
  },
];
