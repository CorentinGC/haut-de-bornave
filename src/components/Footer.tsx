import Link from "next/link";
import type { Locale } from "@/lib/site";
import { SITE } from "@/lib/site";
import type { SiteContent } from "@/content/types";
import { href, mainNav } from "@/lib/nav";

/** Pied de page fidèle au site .fr (fond émeraude profond). */
export function Footer({
  locale,
  content,
}: {
  locale: Locale;
  content: SiteContent;
}) {
  const year = new Date().getFullYear();
  const items = mainNav(content);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <div className="footer__brand">
              <span className="footer__logo" aria-hidden="true" />
              <span className="footer__brand-text">
                Les Hauts De Bornave
                <small>Deshaies · Guadeloupe</small>
              </span>
            </div>
            <p style={{ maxWidth: "36ch", fontSize: ".92rem" }}>
              {content.footer.tagline}
            </p>
            <div className="payments">
              {SITE.payments.map((p) => (
                <span key={p}>{p}</span>
              ))}
            </div>
          </div>

          <div>
            <h5>{content.footer.discover}</h5>
            <ul>
              {items.map((item) => (
                <li key={item.path}>
                  <Link href={href(locale, item.path)}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5>{content.footer.contactCol}</h5>
            <ul>
              <li>
                <Link href={href(locale, "contact")}>
                  {content.nav.contact}
                </Link>
              </li>
              <li>
                <a href={SITE.whatsapp} target="_blank" rel="noopener">
                  WhatsApp · {SITE.host.name}
                </a>
              </li>
              <li>
                <a href={`tel:${SITE.phone.e164}`}>{SITE.phone.display}</a>
              </li>
              <li>
                <Link href={href(locale, "bien-etre")}>
                  {content.nav.bienEtre}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5>{content.footer.followCol}</h5>
            <div className="footer__social">
              <a
                href={SITE.social.facebook}
                target="_blank"
                rel="noopener"
                aria-label="Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 10h4l-.5 4H13v8h-4v-8H6v-4h3V7a3 3 0 013-3h4v4h-3c-.6 0-1 .4-1 1v1z" />
                </svg>
              </a>
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener"
                aria-label="Instagram"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {year} {SITE.name} — {content.footer.rights}
          </span>
          <Link href={href(locale, "mentions-legales")}>
            {content.footer.legal}
          </Link>
        </div>
      </div>
    </footer>
  );
}
