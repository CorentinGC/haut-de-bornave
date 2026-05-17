/**
 * Jeu d'icônes des encarts « atouts » (react-icons / Lucide — trait fin,
 * cohérent avec l'esthétique éco-lodge de la charte .fr). Clé → composant.
 * @author Eden Solutions <contact@eden-solutions.pro>
 */
import type { IconType } from "react-icons";
import {
  LuWaves,
  LuTreePalm,
  LuHouse,
  LuSailboat,
  LuMartini,
  LuGamepad2,
  LuTent,
  LuFlame,
  LuSparkles,
} from "react-icons/lu";

const ICONS: Record<string, IconType> = {
  pool: LuWaves,
  garden: LuTreePalm,
  gites: LuHouse,
  seaview: LuSailboat,
  bar: LuMartini,
  games: LuGamepad2,
  carbet: LuTent,
  bbq: LuFlame,
};

/** Icône d'encart par clé (fallback discret si clé inconnue). */
export function FeatureIcon({ name, size = 26 }: { name?: string; size?: number }) {
  const Cmp = (name && ICONS[name]) || LuSparkles;
  return <Cmp size={size} aria-hidden="true" focusable="false" />;
}
