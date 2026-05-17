# Formulaire de contact / devis

Réservation **en direct** (sans intermédiaire), comme sur le site source.
Le formulaire envoie un email à l'hôte (Serge) via **Resend**.

## Flux

1. `src/components/ContactForm.tsx` (client, contrôlé) — validation client
   (champs requis, email), **honeypot** anti-spam (champ caché `company`).
2. `POST /api/contact` → `src/app/api/contact/route.ts` (Node runtime,
   `dynamic = "force-dynamic"` — seule route serveur du site).
3. Revalide nom/email/message, ignore si honeypot rempli, échappe le HTML,
   envoie via Resend (`replyTo` = email du visiteur).

## Variables d'environnement

| Variable | Rôle | Sans la variable |
|----------|------|------------------|
| `RESEND_API_KEY` | Clé API Resend | Demande **loggée** côté serveur, réponse `ok` (`delivered:false`) — l'UX ne casse pas (preview/local) |
| `CONTACT_TO` | Destinataire (Serge) | Défaut `SITE.email` |
| `CONTACT_FROM` | Expéditeur (domaine vérifié Resend) | Défaut `onboarding@resend.dev` |

Configurer en preview **et** production :

```bash
vercel env add RESEND_API_KEY
vercel env add CONTACT_TO
vercel env add CONTACT_FROM
```

> En production réelle : vérifier un domaine d'envoi dans Resend et utiliser
> une adresse `@leshautsdebornave.fr` pour `CONTACT_FROM` (délivrabilité).

## Anti-spam

- Honeypot `company` (caché, `tabindex=-1`) : si rempli → succès silencieux,
  aucun email.
- Échappement systématique des champs dans l'email (anti-injection).
- Évolutions possibles : rate-limiting par IP, Vercel BotID, captcha.

## Tester

```bash
curl -X POST localhost:3000/api/contact -H 'Content-Type: application/json' \
  -d '{"name":"Test","email":"t@example.com","message":"Bonjour"}'
# → {"ok":true,"delivered":true}  (ou delivered:false sans clé)
```

Messages UX (succès/erreur/validation) : `content/{fr,en}.ts` →
`contact.form.*` (bilingue).
