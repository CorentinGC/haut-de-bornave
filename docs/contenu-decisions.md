# Décisions de contenu — incohérences du site source

Le contenu FR est repris **verbatim** de `leshautsdebornave.com`. Le site
source contient des incohérences ; elles ont été tranchées ici (rien n'a été
inventé). **À faire valider par l'exploitant.**

| # | Incohérence source | Décision appliquée |
|---|--------------------|--------------------|
| 1 | Surface des Rayons de Soleil : 30/20 m² (accueil) vs ~40 m² (page dédiée) | Retenu **≈ 40 m²** (page dédiée, plus détaillée). À confirmer. |
| 2 | Kaz An Nou : « 3 lits queen + 1 canapé convertible » vs « +2 canapés-lits » | Retenu **3 lits queen + 1 canapé convertible** (page dédiée). |
| 3 | FAQ Ti Kaz La : réponse mentionnant « Kaz An Nou » | **Corrigée** → « Ti Kaz La ». |
| 4 | Kaz An Nou : « En séjournant au Gran Kaz… » | **Corrigé** → « En séjournant à Kaz An Nou… ». |
| 5 | Liens cassés source (`/rayons-de-soleil/`, préfixe `/les-gites/`) | **Normalisés** vers les vrais slugs (`/gites/<slug>`, `/rayons-de-soleil`). |
| 6 | Email légal corrompu `contact@ex.comaiditions.com` | Remplacé par **`contact@leshautsdebornave.fr`** (placeholder à valider). |
| 7 | Pas de mentions légales / CGV / politique de confidentialité réelles | Page `/mentions-legales` = cadre minimal (cookies + RGPD). Champs éditeur (raison sociale, SIRET, hébergeur) **à compléter par l'exploitant** — non inventés. `noindex`. |
| 8 | Note agrégée : « 9.8 » (hero .fr) vs avis 8–10/10 | `SITE.rating` = **9.6 / 10, 5 avis** (moyenne des avis affichés). À ajuster avec les vraies données Booking. |
| 9 | Coordonnées GPS exactes du domaine inconnues | `SITE.geo` = approx. quartier **Ferry/Leroux** (16.298, -61.787). **À remplacer** par la position réelle (impact SEO local / `VacationRental`). |
| 10 | Réseaux sociaux | Facebook `bornave971`, Instagram `les_hauts_de_bornave` (du `.com`). |

## À fournir par l'exploitant

- Position GPS précise du domaine (Google Maps « copier les coordonnées »).
- Mentions légales complètes (raison sociale, statut, SIRET, hébergeur,
  directeur de publication) + éventuelles CGV/CGL.
- Adresse email professionnelle réelle + domaine vérifié Resend.
- Note/volume d'avis officiels (Booking, Google) pour `aggregateRating`.
- Surfaces/couchages définitifs des Rayons de Soleil et Kaz An Nou.

> Toute correction se fait dans `src/content/fr.ts` (+ `en.ts`) et/ou
> `src/lib/site.ts`. Ne jamais inventer une donnée manquante : la signaler ici.
