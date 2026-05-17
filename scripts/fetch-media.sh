#!/usr/bin/env bash
# Télécharge TOUS les médias d'illustration depuis les sites source
# (leshautsdebornave.com = CDN photos, leshautsdebornave.fr = logo + galerie)
# vers /public/media. Idempotent : ne re-télécharge pas un fichier déjà présent.
# Voir docs/medias.md pour le pipeline complet.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MEDIA="$ROOT/public/media"
COM="https://leshautsdebornave.com/wp-content/uploads/2026/02"
COM3="https://leshautsdebornave.com/wp-content/uploads/2026/03"
FR="https://leshautsdebornave.fr/assets"
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36"

mkdir -p "$MEDIA"/{gites,domaine,lieux,galerie,brand,partenaires}

# get <url> <dest-relative-path>
get() {
  local url="$1" dest="$MEDIA/$2"
  if [[ -s "$dest" ]]; then echo "skip  $2"; return 0; fi
  if curl -fsSL -A "$UA" --retry 3 --retry-delay 1 -o "$dest" "$url"; then
    echo "ok    $2"
  else
    echo "FAIL  $url" >&2
  fi
}

echo "==> Photos .com (depuis scripts/media-com-urls.txt)"
while IFS= read -r url; do
  [[ -z "$url" ]] && continue
  fname="$(basename "$url")"
  low="$(echo "$fname" | tr '[:upper:]' '[:lower:]')"
  case "$low" in
    gran-kaz-*|kaz-an-nou-*|ti-kaz-la-*|le-rayon-*) sub="gites" ;;
    le-domaine-*|les-hauts-de-bornave-*|les-hauts-de-bornave-deshaies-*) sub="domaine" ;;
    plage-*|le-port-*|coucher-de-soleil-*) sub="lieux" ;;
    *) sub="domaine" ;;
  esac
  get "$url" "$sub/$low"
done < "$ROOT/scripts/media-com-urls.txt"

echo "==> Galerie .fr (01..36.jpg)"
for i in $(seq -w 1 36); do
  get "$FR/images/galerie/${i}.jpg" "galerie/galerie-${i}.jpg"
done

echo "==> Marque & divers .fr"
get "$FR/logo.svg"                              "brand/logo-les-hauts-de-bornave.svg"
get "$FR/images/vue-aerienne-deshaies.png"      "domaine/vue-aerienne-deshaies.png"
get "$FR/partenaires/ecoute-toi-logo.png"       "partenaires/ecoute-toi-logo.png"

echo "==> Logo .com (fallback raster)"
get "$COM/LOGO-Hauts-Bornave.webp"              "brand/logo-hauts-bornave.webp"

echo
echo "==> Total fichiers téléchargés :"
find "$MEDIA" -type f | wc -l
echo "Terminé. Médias dans public/media/"
