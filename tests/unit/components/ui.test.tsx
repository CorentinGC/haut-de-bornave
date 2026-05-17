import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Btn, FaqList, Breadcrumbs, Marquee } from "@/components/ui";

describe("ui primitives", () => {
  it("Btn interne rend un lien stylé avec flèche", () => {
    render(
      <Btn href="/fr/contact" variant="primary">
        Réserver
      </Btn>,
    );
    const a = screen.getByRole("link", { name: /Réserver/ });
    expect(a).toHaveAttribute("href", "/fr/contact");
    expect(a).toHaveClass("btn", "btn--primary");
  });

  it("Btn externe ouvre dans un nouvel onglet sécurisé", () => {
    render(
      <Btn href="https://wa.me/x" external arrow={false}>
        WhatsApp
      </Btn>,
    );
    const a = screen.getByRole("link", { name: "WhatsApp" });
    expect(a).toHaveAttribute("target", "_blank");
    expect(a).toHaveAttribute("rel", "noopener");
  });

  it("FaqList rend des details accessibles (q en h3)", () => {
    render(
      <FaqList items={[{ q: "Question ?", a: "Réponse." }]} title="FAQ" />,
    );
    expect(
      screen.getByRole("heading", { name: "Question ?", level: 3 }),
    ).toBeInTheDocument();
    expect(screen.getByText("Réponse.")).toBeInTheDocument();
  });

  it("Breadcrumbs marque la dernière entrée comme page courante", () => {
    render(
      <Breadcrumbs
        trail={[{ name: "Accueil", href: "/fr" }, { name: "Gîtes" }]}
      />,
    );
    expect(screen.getByRole("link", { name: "Accueil" })).toHaveAttribute(
      "href",
      "/fr",
    );
    expect(screen.getByText("Gîtes")).toHaveAttribute("aria-current", "page");
  });

  it("Marquee duplique les items pour le défilement infini", () => {
    render(<Marquee items={["A", "B"]} />);
    expect(screen.getAllByText("A")).toHaveLength(2);
  });
});
