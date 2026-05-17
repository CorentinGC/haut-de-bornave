/**
 * Composant UI ContactForm.test.
 * @author Eden Solutions <contact@eden-solutions.pro>
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { ContactForm } from "@/components/ContactForm";
import { getContent } from "@/content";

const form = getContent("fr").contact.form;

afterEach(cleanup);
beforeEach(() => {
  vi.restoreAllMocks();
});

describe("ContactForm", () => {
  it("bloque la soumission si champs requis vides", async () => {
    const fetchSpy = vi.spyOn(global, "fetch");
    render(<ContactForm form={form} />);
    fireEvent.submit(screen.getByRole("button", { name: form.send }).closest("form")!);
    expect(await screen.findByText(form.required)).toBeInTheDocument();
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("refuse un email invalide", async () => {
    render(<ContactForm form={form} />);
    fireEvent.input(screen.getByLabelText(/Nom/), {
      target: { value: "Jean" },
    });
    fireEvent.input(screen.getByLabelText(/Email/), {
      target: { value: "pasunemail" },
    });
    fireEvent.input(screen.getByLabelText(/Message/), {
      target: { value: "Bonjour" },
    });
    fireEvent.submit(
      screen.getByRole("button", { name: form.send }).closest("form")!,
    );
    expect(await screen.findByText(form.invalidEmail)).toBeInTheDocument();
  });

  it("envoie et affiche le succès quand l'API répond OK", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 200 }),
    );
    render(<ContactForm form={form} />);
    fireEvent.input(screen.getByLabelText(/Nom/), {
      target: { value: "Jean" },
    });
    fireEvent.input(screen.getByLabelText(/Email/), {
      target: { value: "jean@example.com" },
    });
    fireEvent.input(screen.getByLabelText(/Message/), {
      target: { value: "Demande de séjour en juillet" },
    });
    fireEvent.submit(
      screen.getByRole("button", { name: form.send }).closest("form")!,
    );
    await waitFor(() =>
      expect(screen.getByText(new RegExp(form.success))).toBeInTheDocument(),
    );
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("affiche une erreur si l'API échoue", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue(
      new Response("nope", { status: 502 }),
    );
    render(<ContactForm form={form} />);
    fireEvent.input(screen.getByLabelText(/Nom/), {
      target: { value: "Jean" },
    });
    fireEvent.input(screen.getByLabelText(/Email/), {
      target: { value: "jean@example.com" },
    });
    fireEvent.input(screen.getByLabelText(/Message/), {
      target: { value: "Demande" },
    });
    fireEvent.submit(
      screen.getByRole("button", { name: form.send }).closest("form")!,
    );
    expect(await screen.findByText(form.error)).toBeInTheDocument();
  });
});
