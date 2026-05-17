---
name: ui-review
description: Lance une revue design/UX complète du site via le sous-agent ui-ux-reviewer (analyse code + visuelle MCP chrome-devtools, desktop ET mobile, page par page) puis applique les corrections. Invoquer avec /ui-review (optionnel : préciser une page ou un focus, sinon site entier). À utiliser après des changements fonctionnels ou avant livraison.
---

# Skill — Revue UI/UX du site (via l'agent `ui-ux-reviewer`)

Délègue une **revue design profonde** au sous-agent expert
`.claude/agents/ui-ux-reviewer.md` (DA/UX senior +10 ans) : analyse du code +
revue visuelle via le **MCP chrome-devtools**, **desktop ET mobile**, page par
page, avec correction des défauts (textes illisibles, hovers masquants,
overlaps, médias manquants, contrastes, perf/images) — sans dénaturer la charte
ni casser SEO/tests.

## Pré-requis

1. **MCP chrome-devtools actif** (`.mcp.json`). S'il n'apparaît pas dans les
   outils (`mcp__chrome-devtools__*`), demander à l'utilisateur de **recharger
   Claude Code** (les serveurs MCP se chargent au démarrage de session).
2. **Serveur de prod lancé** sur http://localhost:3000 (l'agent fait sa revue
   dessus) :
   ```
   pkill -f "next start"; npm run build && (npm run start &) ; sleep 6
   ```
   (rebuild d'abord pour refléter le code courant).

## Procédure

1. Vérifier les pré-requis ci-dessus (rebuild + start le serveur).
2. Déterminer le **périmètre** :
   - Argument fourni (ex. `/ui-review contact`, `/ui-review mobile`,
     `/ui-review hovers`) → cibler cette page / cet axe.
   - Sinon → **site entier** (toutes les pages FR, EN si impact layout).
3. **Lancer le sous-agent** via l'outil Agent, `subagent_type:
   "ui-ux-reviewer"`. Prompt à transmettre :
   - le périmètre (page/axe ou site complet) ;
   - l'état courant (ce qui est déjà corrigé, pour ne pas refaire — voir
     derniers commits / `MEMORY.md`) ;
   - rappel des garde-fous : charte `src/styles/lhdb.css` = vérité visuelle
     (peaufiner, pas refaire), contenu via `src/content`, vendeur via
     `config.json`, **SEO intact** (metadata/JSON-LD/hreflang), mobile-first,
     bottom-nav (pas de burger), itérations vérifiées (rebuild → re-screenshot
     desktop+mobile), `npm run verify` + `npm run test:e2e` doivent rester
     verts, optimisation images (sizes/quality/CLS) ;
   - livrable : rapport priorisé **P1→P3 par page** + corrections appliquées.
4. À la fin de l'agent : **relayer son rapport** (synthèse priorisée).
5. **Re-vérifier** : `npm run verify` + `npm run test:e2e` (0 échec). Si un
   test a légitimement changé (markup), mettre le test à jour ; si vrai bug,
   corriger le code.
6. Si l'agent a appliqué des corrections : **commit conventionnel** atomique
   (`fix(ui): …`) puis `git push`.

## Notes

- Cadence conseillée : après chaque lot de changements fonctionnels et avant
  toute livraison (cf. CLAUDE.md §0 — workflow test + review obligatoire).
- Ne pas lancer ce skill et l'agent en parallèle d'un autre agent qui modifie
  l'UI (risque de conflit). Un passage à la fois, vérifié visuellement.
- L'agent est défini dans `.claude/agents/ui-ux-reviewer.md` (mandat complet :
  grille d'audit niveau pro, méthode page par page, perf/images).
