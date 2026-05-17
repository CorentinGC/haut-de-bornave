/**
 * Données de contenu (articles.fr).
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

import type { Article } from "./types";

/**
 * Guide local « Que visiter » — articles SEO longue traîne (top-of-funnel),
 * détaillés et géolocalisés, maillés en interne vers les gîtes. L'ordre des
 * articles est couplé à articles.en.ts (même index ↔ même article, cf.
 * src/lib/nav.ts). Ajouter un article : voir docs/blog-que-visiter.md.
 */
export const articlesFr: Article[] = [
  {
    slug: "plus-belles-plages-deshaies",
    cover: "/media/lieux/plage-de-grande-anse-a-deshaies-guadeloupe-6.webp",
    category: "Plages",
    title: "Les plus belles plages autour de Deshaies",
    excerpt:
      "Grande Anse, La Perle, Leroux, Petite Anse, Rifflet : le guide complet des plages de sable doré à quelques minutes du Domaine de Bornave.",
    readingTime: "7 min",
    distance: "5 à 20 min en voiture",
    sections: [
      {
        paragraphs: [
          "Deshaies, sur la côte sous le vent de la Basse-Terre, concentre quelques-unes des plus belles plages de Guadeloupe : du sable doré, des eaux calmes et abritées, des cocotiers et des collines verdoyantes en toile de fond. Depuis les hauteurs du Domaine de Bornave, la plupart sont accessibles en 5 à 20 minutes de voiture, ce qui permet d'en changer chaque jour selon l'envie : baignade en famille, snorkeling, farniente ou coucher de soleil.",
        ],
      },
      {
        heading: "Plage de Grande Anse — l'emblématique",
        paragraphs: [
          "À quelques minutes du domaine, la majestueuse Plage de Grande Anse déroule un immense ruban de sable doré sur près de deux kilomètres, bordé de raisiniers, de cocotiers et de collines couvertes de forêt. C'est la plage la plus connue de Deshaies, idéale pour la baignade en famille, la promenade et les couchers de soleil spectaculaires sur la mer des Caraïbes.",
          "Grande Anse est aussi l'un des décors récurrents de la série britannique « Meurtres au Paradis » (Death in Paradise), tournée à Deshaies — un attrait supplémentaire pour de nombreux visiteurs. La houle pouvant être présente, surveillez les conditions de baignade et privilégiez la zone centrale, plus abritée.",
          "Sur place : restaurants et snacks de plage, location de transats, stationnement. Venez tôt en haute saison pour profiter du calme et garer facilement.",
        ],
      },
      {
        heading: "Plage de Leroux (Ferry) — la plus proche",
        paragraphs: [
          "Située dans le quartier de Ferry, juste en contrebas du domaine, la Plage de Leroux est la plus accessible depuis Bornave. Plus intime et confidentielle que Grande Anse, cette plage de sable doré bordée de cocotiers offre une atmosphère paisible et authentique, fréquentée surtout par les habitants.",
          "Ses eaux généralement calmes en font un excellent choix pour la baignade tranquille, le snorkeling près des rochers et les familles avec enfants. Parfaite pour une fin de journée sans voiture.",
        ],
      },
      {
        heading: "Plage de la Perle — snorkeling & nature",
        paragraphs: [
          "Plus sauvage, la Plage de la Perle séduit par ses eaux claires, son sable clair et son cadre préservé entre Deshaies et Pointe-Noire. Très appréciée pour le snorkeling, elle laisse découvrir poissons et fonds rocheux le long de ses extrémités. La houle peut y être marquée : restez prudent et observez les drapeaux.",
        ],
      },
      {
        heading: "Petite Anse, Rifflet & Clugny — les confidentielles",
        paragraphs: [
          "Pour s'éloigner des sentiers battus, la côte autour de Deshaies réserve d'autres criques : Petite Anse et son ambiance de village de pêcheurs, la sauvage Plage de Rifflet, ou encore la longue Plage de Clugny vers Sainte-Rose. Autant de variantes pour alterner baignade, photo et tranquillité au fil du séjour.",
        ],
      },
      {
        heading: "Conseils pratiques",
        paragraphs: [
          "Prévoyez chaussures d'eau pour les plages rocheuses, masque et tuba, crème solaire respectueuse des récifs et de l'eau. Les matinées sont souvent les plus calmes (mer et fréquentation). Depuis le domaine, Serge vous orientera vers la plage la mieux adaptée à la météo et à la houle du jour.",
        ],
      },
    ],
    relatedGites: ["gran-kaz", "kaz-an-nou", "ti-kaz-la"],
    seo: {
      title:
        "Les plus belles plages de Deshaies (Grande Anse, La Perle, Leroux)",
      description:
        "Guide complet des plages de Deshaies, Guadeloupe : Grande Anse, Leroux, La Perle, Petite Anse, Rifflet — accès, baignade, snorkeling depuis le Domaine de Bornave.",
    },
  },
  {
    slug: "jardin-botanique-deshaies",
    cover: "/media/lieux/le-port-deshaies-en-guadeloupe-3.webp",
    category: "À visiter",
    title: "Le Jardin Botanique de Deshaies",
    excerpt:
      "Sept hectares de jardins tropicaux, plus de 1 000 espèces, aras et flamants roses : l'incontournable de Deshaies, ancienne propriété de Coluche.",
    readingTime: "5 min",
    distance: "≈ 10 min en voiture",
    sections: [
      {
        paragraphs: [
          "Le Jardin Botanique de Deshaies est l'une des visites incontournables de la côte sous le vent et l'une des attractions les plus appréciées de Guadeloupe. Aménagé sur l'ancienne propriété de l'humoriste Coluche, sur les hauteurs au-dessus du bourg, il déploie un parc paysager de sept hectares pensé comme une promenade sensorielle.",
        ],
      },
      {
        heading: "Ce que l'on découvre",
        paragraphs: [
          "Plus de mille espèces de plantes tropicales s'y succèdent : palmeraie, bassins à nénuphars et lotus, jardin de bromélias, mur d'orchidées, cactées, gigantesques arbres du voyageur. Le parcours, ombragé et fléché, ménage des points de vue dégagés sur la baie de Deshaies et la mer des Caraïbes.",
          "Côté faune, le jardin abrite une volière où l'on peut nourrir des aras et des loriquets, un bassin de carpes koï et un groupe de flamants roses très photogénique — un moment fort, surtout avec des enfants.",
        ],
      },
      {
        heading: "Conseils de visite",
        paragraphs: [
          "Comptez environ 1 h 30 à 2 h de promenade à un rythme tranquille. Privilégiez la matinée pour la lumière et la fraîcheur. Chaussures confortables, eau et chapeau recommandés ; un salon de thé avec vue permet de faire une pause. Le site est en pente : prévoir un peu de marche.",
          "À seulement une dizaine de minutes du Domaine de Bornave, le Jardin Botanique se combine idéalement avec une matinée à Grande Anse ou une balade dans le bourg de Deshaies.",
        ],
      },
    ],
    relatedGites: ["kaz-an-nou", "gran-kaz"],
    seo: {
      title: "Jardin Botanique de Deshaies – Visite & accès depuis Bornave",
      description:
        "Visiter le Jardin Botanique de Deshaies (ancienne propriété de Coluche) : 7 ha, 1 000+ espèces, aras et flamants — à ≈ 10 min du Domaine de Bornave.",
    },
  },
  {
    slug: "reserve-cousteau-plongee-snorkeling",
    cover:
      "/media/lieux/plage-de-grande-anse-a-deshaies-guadeloupe-13.webp",
    category: "Activités",
    title: "Plongée & snorkeling à la Réserve Cousteau",
    excerpt:
      "Au large de Pigeon (Bouillante), les fonds de la Réserve Cousteau comptent parmi les plus beaux des Caraïbes : tortues, coraux, faune tropicale.",
    readingTime: "5 min",
    distance: "≈ 30 min en voiture",
    sections: [
      {
        paragraphs: [
          "À une trentaine de minutes du Domaine de Bornave, en descendant la côte sous le vent vers Bouillante, la Réserve Cousteau est LE spot sous-marin de Guadeloupe. Cette aire marine protégée, autour des îlets Pigeon, doit son nom au commandant Cousteau qui en avait salué la richesse. Eaux calmes et claires, faible profondeur près du rivage : un terrain de jeu parfait, des débutants aux plongeurs confirmés.",
        ],
      },
      {
        heading: "Snorkeling & plongée",
        paragraphs: [
          "En masque-tuba, depuis la plage de Malendure ou en navette bateau vers les îlets Pigeon, on observe facilement poissons-perroquets, sergents-majors, gorgones et, avec un peu de chance, des tortues vertes qui broutent les herbiers. Le célèbre buste immergé du commandant Cousteau est l'un des points d'intérêt des plongeurs.",
          "De nombreux clubs proposent baptêmes, plongées exploration et sorties palmes-masque-tuba encadrées au départ de Malendure, ainsi que des excursions en bateau à fond de verre — idéales pour les familles et ceux qui ne plongent pas.",
        ],
      },
      {
        heading: "Bon à savoir",
        paragraphs: [
          "Réservez les sorties à l'avance en haute saison. La matinée offre généralement une meilleure visibilité et une mer plus calme. Prévoyez crème solaire minérale (zone protégée), chaussures d'eau et lycra anti-UV. Combinez la journée avec les chutes et bains chauds de Bouillante à proximité.",
        ],
      },
    ],
    relatedGites: ["ti-kaz-la", "rayon-jaune"],
    seo: {
      title: "Réserve Cousteau : plongée & snorkeling depuis Deshaies",
      description:
        "Plongée et snorkeling à la Réserve Cousteau (Pigeon, Bouillante) : tortues, coraux, buste Cousteau — à ≈ 30 min du Domaine de Bornave, Deshaies.",
    },
  },
  {
    slug: "pointe-noire-maison-du-cacao",
    cover:
      "/media/lieux/coucher-de-soleil-depuis-tainos-cottage-a-deshaies-en-guadeloupe-9-scaled.webp",
    category: "À visiter",
    title: "Pointe-Noire, la Maison du Cacao & le Zoo des Mamelles",
    excerpt:
      "Vers le sud, une Basse-Terre plus sauvage : Maison du Cacao, Maison du Bois, rivières, et le Parc des Mamelles avec son zoo en pleine forêt.",
    readingTime: "6 min",
    distance: "10 à 30 min en voiture",
    sections: [
      {
        paragraphs: [
          "En quittant Deshaies vers le sud, la commune de Pointe-Noire dévoile une autre Basse-Terre : plus sauvage, montagneuse et profondément ancrée dans les traditions artisanales et la forêt tropicale. C'est la porte d'entrée d'une belle journée de découvertes, à 10 à 30 minutes du Domaine de Bornave.",
        ],
      },
      {
        heading: "La Maison du Cacao",
        paragraphs: [
          "Sur la route de Pointe-Noire, la Maison du Cacao retrace l'histoire et le savoir-faire du cacao en Guadeloupe : plantation pédagogique, étapes de transformation de la cabosse à la tablette, et dégustation de chocolat chaud à l'ancienne. Une visite courte, gourmande et idéale en famille.",
        ],
      },
      {
        heading: "Pointe-Noire & l'artisanat du bois",
        paragraphs: [
          "Pointe-Noire est réputée pour le travail du bois ; la Maison du Bois et les ateliers d'artisans valorisent les essences locales et les métiers traditionnels. Le bourg, authentique, donne un aperçu sincère de la vie créole de la côte sous le vent.",
        ],
      },
      {
        heading: "Le Parc des Mamelles & son zoo",
        paragraphs: [
          "En poursuivant vers la Route de la Traversée, le Parc des Mamelles abrite un zoo niché en pleine forêt tropicale. Le parcours, en partie sur des passerelles suspendues dans la canopée, présente des espèces emblématiques de la Caraïbe et d'Amérique (ratons, iguanes, racoons, rapaces…) et inclut un parcours accrobranche. Comptez une demi-journée, idéale avec des enfants.",
        ],
      },
      {
        heading: "Nature & rivières",
        paragraphs: [
          "Les environs offrent rivières et bassins (secteur de la Route de la Traversée et du Parc national), parfaits pour une baignade d'eau douce ou une courte randonnée à l'ombre des fougères arborescentes. Un complément rafraîchissant après la visite.",
        ],
      },
    ],
    relatedGites: ["kaz-an-nou", "gran-kaz"],
    seo: {
      title: "Pointe-Noire, Maison du Cacao & Zoo des Mamelles | Bornave",
      description:
        "Que faire à Pointe-Noire depuis Deshaies : Maison du Cacao, Maison du Bois, Zoo des Mamelles, rivières — à 10-30 min du Domaine de Bornave.",
    },
  },
  {
    slug: "comment-venir-deshaies-aeroport",
    cover: "/media/domaine/vue-aerienne-deshaies.png",
    category: "Pratique",
    title: "Comment venir à Deshaies depuis l'aéroport",
    excerpt:
      "Depuis l'aéroport Pôle Caraïbes (Pointe-à-Pitre) : itinéraire, durée, location de voiture et conseils d'accès au Domaine de Bornave.",
    readingTime: "5 min",
    sections: [
      {
        paragraphs: [
          "Le Domaine de Bornave se situe sur les hauteurs de Deshaies, quartier Ferry, sur la côte sous le vent de la Basse-Terre. Tous les vols long-courriers arrivent à l'aéroport international Guadeloupe Pôle Caraïbes, à Pointe-à-Pitre (Grande-Terre).",
        ],
      },
      {
        heading: "Itinéraire & durée",
        paragraphs: [
          "Depuis l'aéroport, comptez environ 1 h à 1 h 15 de route jusqu'à Deshaies (selon le trafic autour de Pointe-à-Pitre et Baie-Mahault). L'itinéraire le plus simple longe la côte par Sainte-Rose puis descend sur Deshaies. La route est belle mais sinueuse sur la fin : prévoyez une conduite tranquille, surtout de nuit.",
        ],
      },
      {
        heading: "Location de voiture : vivement conseillée",
        paragraphs: [
          "Une voiture est fortement recommandée pour séjourner à Deshaies : elle vous rend autonome pour les plages, le Jardin Botanique, la Réserve Cousteau et les excursions sur la côte sous le vent, peu desservies par les transports en commun. Réservez votre véhicule à l'avance, surtout en haute saison ; les loueurs sont présents à l'aéroport.",
        ],
      },
      {
        heading: "Arrivée au domaine",
        paragraphs: [
          "À l'approche de Deshaies, l'accès au quartier Ferry se fait par une petite route qui monte vers les hauteurs. Serge vous communique l'itinéraire précis avant l'arrivée et vous accueille sur place pour vous guider — un point d'attention utile pour les arrivées en fin de journée.",
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
      "Saison sèche, saison humide, périodes idéales, météo et conseils de réservation pour choisir le meilleur moment de votre séjour.",
    readingTime: "5 min",
    sections: [
      {
        paragraphs: [
          "La Guadeloupe se visite toute l'année grâce à son climat tropical doux, tempéré par les alizés. Le choix de la période dépend surtout de votre tolérance aux averses, de votre budget et de l'affluence recherchée. Deshaies, sur la côte sous le vent, bénéficie d'un ensoleillement généreux.",
        ],
      },
      {
        heading: "La saison sèche (« carême »), décembre à avril",
        paragraphs: [
          "C'est la période la plus ensoleillée et la plus demandée : ciel dégagé, mer souvent calme, chaleur supportable grâce aux alizés. Elle couvre les fêtes de fin d'année, les vacances d'hiver et de printemps. Réservez plusieurs mois à l'avance, surtout pour Noël, le Nouvel An et février.",
        ],
      },
      {
        heading: "La saison humide (« hivernage »), juillet à novembre",
        paragraphs: [
          "Plus chaude et humide, elle alterne belles éclaircies et averses tropicales souvent brèves. La nature est alors d'un vert éclatant et les tarifs plus doux. Le pic d'activité cyclonique se situe en août-septembre : une assurance annulation et un suivi météo sont conseillés. Mai-juin et novembre sont d'excellents compromis (climat agréable, fréquentation modérée).",
        ],
      },
      {
        heading: "Notre conseil",
        paragraphs: [
          "Pour un équilibre soleil / tranquillité / budget, visez l'inter-saison (fin avril-juin, novembre). Hors haute saison, le domaine retrouve tout son calme : une parenthèse idéale à deux. Quelle que soit la période, anticipez la réservation des dates clés et de la voiture.",
        ],
      },
    ],
    relatedGites: ["rayon-jaune", "rayon-bleu"],
    seo: {
      title: "Quand venir en Guadeloupe ? Meilleure période pour Deshaies",
      description:
        "Quand partir à Deshaies, Guadeloupe : saison sèche (déc.-avril), hivernage, météo, inter-saisons et conseils de réservation pour le Domaine de Bornave.",
    },
  },
];
