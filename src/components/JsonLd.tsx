/**
 * Injecte un bloc JSON-LD. Le `<` est échappé (<) pour prévenir
 * toute injection XSS via les chaînes (recommandation Next.js docs/json-ld).
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
