/**
 * Normalise une image source « lourde » (ex. originaux Wikimedia plein
 * format) en WebP web-optimisé : redimensionne le plus grand côté à
 * MAX_EDGE px max (sans agrandir), encode en WebP qualité Q. Utilisé par
 * scripts/fetch-media.sh pour les entrées `optimize: true` de media.json.
 * Usage : node scripts/optimize-image.cjs <src> <dest.webp>
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

const sharp = require("sharp");

const MAX_EDGE = 2000;
const QUALITY = 80;

const [, , src, dest] = process.argv;
if (!src || !dest) {
  console.error("usage: node scripts/optimize-image.cjs <src> <dest>");
  process.exit(1);
}

sharp(src)
  .rotate()
  .resize({
    width: MAX_EDGE,
    height: MAX_EDGE,
    fit: "inside",
    withoutEnlargement: true,
  })
  .webp({ quality: QUALITY })
  .toFile(dest)
  .then(({ width, height, size }) => {
    console.log(`opt   ${dest} (${width}x${height}, ${Math.round(size / 1024)} KB)`);
  })
  .catch((err) => {
    console.error(`OPT-FAIL ${src} -> ${dest}: ${err.message}`);
    process.exit(1);
  });
