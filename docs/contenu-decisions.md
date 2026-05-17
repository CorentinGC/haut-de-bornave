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
| 11 | Articles « Que visiter » : stockage | Migrés en **1 JSON bilingue par article** (`src/content/articles/<slug>.json`) + loader typé. `datePublished` = **2026-05-17** (mise en ligne ; pas de date source réelle — à ajuster si historique connu). |
| 12 | Images de lieux non couvertes par `.com` | Complétées par des images **libres de droits créditées** (Wikimedia CC BY-SA : Réserve Cousteau, Chutes du Carbet, Saut d'Acomat, forêt Parc national, marché créole). Crédits en légende. À remplacer par des photos client si disponibles. |
| 13 | « Death in Paradise » (bourg de Deshaies) | Faits **généraux et vérifiables** uniquement (série tournée à Deshaies, bourg = ville fictive d'Honoré). Aucun nom de commerce ni adresse de décor inventé. |
| 14 | Distances des nouveaux POI (Plage de la Perle, randonnées Basse-Terre…) | **Indicatives**, reprises de `seo/local-poi.md` (« ≈ 10 min », « 30 min à 2 h »). À affiner avec la position GPS réelle du domaine (cf. #9). |

## À fournir par l'exploitant

- Position GPS précise du domaine (Google Maps « copier les coordonnées »).
- Mentions légales complètes (raison sociale, statut, SIRET, hébergeur,
  directeur de publication) + éventuelles CGV/CGL.
- Adresse email professionnelle réelle + domaine vérifié Resend.
- Note/volume d'avis officiels (Booking, Google) pour `aggregateRating`.
- Surfaces/couchages définitifs des Rayons de Soleil et Kaz An Nou.

> Toute correction se fait dans `src/content/fr.ts` (+ `en.ts`) et/ou
> `src/lib/site.ts`. Ne jamais inventer une donnée manquante : la signaler ici.
