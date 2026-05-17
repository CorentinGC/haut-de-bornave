"use client";

import { useState, type FormEvent } from "react";
import type { SiteContent } from "@/content/types";

type Status = "idle" | "sending" | "ok" | "error";

/**
 * Formulaire de contact / devis — composant React contrôlé. Poste vers
 * /api/contact (Route Handler + Resend). Validation client + honeypot
 * anti-spam (champ caché "company"). Voir docs/contact-form.md.
 */
export function ContactForm({ form }: { form: SiteContent["contact"]["form"] }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Capturer le formulaire AVANT tout await : React détache
    // e.currentTarget (=> null) une fois le handler retourné.
    const formEl = e.currentTarget;
    const fd = new FormData(formEl);
    const data = Object.fromEntries(fd.entries());

    if (!data.name || !data.email || !data.message) {
      setError(form.required);
      setStatus("error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email))) {
      setError(form.invalidEmail);
      setStatus("error");
      return;
    }

    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("ok");
      formEl.reset();
    } catch {
      setError(form.error);
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="contact-form-card" role="status">
        <p className="form-success">✓ {form.success}</p>
      </div>
    );
  }

  return (
    <form className="contact-form-card form" onSubmit={onSubmit} noValidate>
      {/* Honeypot anti-spam : doit rester vide. */}
      <div aria-hidden="true" className="hp-field">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="form-row">
        <label htmlFor="cf-name">
          {form.name} *
          <input id="cf-name" name="name" type="text" required autoComplete="name" />
        </label>
        <label htmlFor="cf-email">
          {form.email} *
          <input id="cf-email" name="email" type="email" required autoComplete="email" />
        </label>
      </div>

      <div className="form-row">
        <label htmlFor="cf-phone">
          {form.phone}
          <input id="cf-phone" name="phone" type="tel" autoComplete="tel" />
        </label>
        <label htmlFor="cf-dates">
          {form.dates}
          <input
            id="cf-dates"
            name="dates"
            type="text"
            placeholder={form.datesPlaceholder}
          />
        </label>
      </div>

      <label htmlFor="cf-subject">
        {form.subject}
        <input id="cf-subject" name="subject" type="text" />
      </label>

      <label htmlFor="cf-message">
        {form.message} *
        <textarea id="cf-message" name="message" rows={5} required />
      </label>

      {status === "error" && error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="btn btn--primary"
        disabled={status === "sending"}
      >
        <span className="btn__inner">
          {status === "sending" ? form.sending : form.send}
        </span>
      </button>
    </form>
  );
}
