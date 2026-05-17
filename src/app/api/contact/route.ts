import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import { SITE } from "@/lib/site";

/**
 * Route Handler du formulaire de contact/devis.
 * Envoie un email à l'hôte (Serge) via Resend. Seule fonction serverless du
 * site (le reste est prérendu statiquement). Voir docs/contact-form.md.
 *
 * Env requises (vercel env) : RESEND_API_KEY, CONTACT_TO, CONTACT_FROM.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const esc = (s: unknown) =>
  String(s ?? "")
    .replace(/[<>&]/g, (m) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" })[m]!)
    .slice(0, 5000);

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  // Honeypot anti-spam : si rempli, on simule un succès silencieux.
  if (body.company) return NextResponse.json({ ok: true });

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "missing fields" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "invalid email" }, { status: 400 });
  }

  const subject = `Bornave — demande de ${name}${
    body.subject ? ` · ${esc(body.subject)}` : ""
  }`;
  const html = `
    <h2>Nouvelle demande — Les Hauts de Bornave</h2>
    <p><strong>Nom :</strong> ${esc(name)}</p>
    <p><strong>Email :</strong> ${esc(email)}</p>
    <p><strong>Téléphone :</strong> ${esc(body.phone)}</p>
    <p><strong>Dates :</strong> ${esc(body.dates)}</p>
    <p><strong>Objet :</strong> ${esc(body.subject)}</p>
    <p><strong>Message :</strong></p>
    <p>${esc(message).replace(/\n/g, "<br>")}</p>
  `;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO ?? SITE.email;
  const from =
    process.env.CONTACT_FROM ?? "Les Hauts de Bornave <onboarding@resend.dev>";

  if (!apiKey) {
    // Pas de clé (preview/local) : on log la demande sans échouer côté UX.
    console.warn("[contact] RESEND_API_KEY manquante — email non envoyé:", {
      name,
      email,
    });
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject,
      html,
    });
    if (error) throw error;
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] envoi Resend échoué:", err);
    return NextResponse.json({ error: "send failed" }, { status: 502 });
  }
}
