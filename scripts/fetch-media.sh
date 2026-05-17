#!/usr/bin/env bash
# Télécharge TOUS les médias d'illustration vers /public/media à partir du
# manifeste unique scripts/media.json (photos .com, galerie/marque .fr, et
# images libres de droits créditées : Wikimedia Commons / Unsplash).
# Idempotent : ne re-télécharge pas un fichier déjà présent.
# Voir docs/medias.md pour le pipeline complet (sourcing, licences, crédits).
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MEDIA="$ROOT/public/media"
MANIFEST="$ROOT/scripts/media.json"
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36"

mkdir -p "$MEDIA"/{gites,domaine,lieux,galerie,brand,partenaires}
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

# get <url> <dest-relative-path> <optimize:0|1>
# optimize=1 : source lourde (Wikimedia…) → WebP web-optimisé via sharp.
get() {
  local url="$1" rel="$2" opt="$3" dest="$MEDIA/$2"
  if [[ -s "$dest" ]]; then echo "skip  $rel"; return 0; fi
  if [[ "$opt" == "1" ]]; then
    local raw="$TMP/$(basename "$url")"
    if curl -fsSL -A "$UA" --retry 3 --retry-delay 2 -o "$raw" "$url"; then
      node "$ROOT/scripts/optimize-image.cjs" "$raw" "$dest" \
        && rm -f "$raw" \
        || echo "FAIL  optimize $rel" >&2
    else
      echo "FAIL  $url" >&2
    fi
  else
    if curl -fsSL -A "$UA" --retry 3 --retry-delay 1 -o "$dest" "$url"; then
      echo "ok    $rel"
    else
      echo "FAIL  $url" >&2
    fi
  fi
}

echo "==> Médias depuis scripts/media.json"
# Émet "url<TAB>dir/file<TAB>optimize(0|1)" par entrée (URL en premier).
node -e '
const m = require(process.argv[1]);
for (const e of m) {
  if (!e.url || !e.dir || !e.file) continue;
  process.stdout.write(e.url + "\t" + e.dir + "/" + e.file + "\t" + (e.optimize ? "1" : "0") + "\n");
}' "$MANIFEST" | while IFS=$'\t' read -r url dest opt; do
  [[ -z "$url" || -z "$dest" ]] && continue
  get "$url" "$dest" "$opt"
done

echo
echo "==> Total fichiers présents :"
find "$MEDIA" -type f | wc -l
echo "Terminé. Médias dans public/media/ (manifeste : scripts/media.json)"
