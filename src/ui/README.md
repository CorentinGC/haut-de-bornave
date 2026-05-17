# src/ui — Bibliothèque atomique

Architecture atomique (atomic design) pour les composants UI réutilisables.

## Structure

```
atoms/        Primitives isolées (Btn, Kicker, Chip…) + *.module.scss
molecules/    Compositions de 2-3 atoms (GiteCard, AvisCard, PricingCard…)
organisms/    Sections complètes (Header, Footer, HeroSplit…)
```

## Conventions

- Chaque composant = `ComponentName.tsx` + `ComponentName.module.scss` co-localisés.
- Les styles globaux (reset, typographie, layout) restent dans `src/styles/lhdb/`.
- Migration progressive : Phase 3 déplace les règles de `lhdb/` vers les modules.
