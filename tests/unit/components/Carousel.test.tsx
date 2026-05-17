import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { Carousel } from "@/components/Carousel";
import type { Media } from "@/lib/media";

afterEach(cleanup);

/** Indice courant affiché par le compteur `.current`. */
const current = (c: HTMLElement) =>
  c.querySelector(".current")?.textContent?.trim();

const photos: Media[] = [
  { src: "/media/a.webp", width: 1600, height: 1067, alt: "Photo A Deshaies" },
  { src: "/media/b.webp", width: 1600, height: 1067, alt: "Photo B Deshaies" },
  { src: "/media/c.webp", width: 1600, height: 1067, alt: "Photo C Deshaies" },
];

describe("Carousel", () => {
  it("rend toutes les diapos avec alt et un compteur 1 / N", () => {
    const { container } = render(<Carousel photos={photos} />);
    expect(current(container)).toBe("1");
    expect(container.querySelector(".total")?.textContent).toBe("3");
    expect(screen.getByAltText("Photo A Deshaies")).toBeInTheDocument();
    expect(screen.getByAltText("Photo C Deshaies")).toBeInTheDocument();
  });

  it("le bouton suivant incrémente le compteur", () => {
    const { container } = render(<Carousel photos={photos} />);
    fireEvent.click(screen.getByRole("button", { name: "Image suivante" }));
    expect(current(container)).toBe("2");
  });

  it("le bouton précédent boucle vers la dernière image", () => {
    const { container } = render(<Carousel photos={photos} />);
    fireEvent.click(screen.getByRole("button", { name: "Image précédente" }));
    expect(current(container)).toBe("3");
  });

  it("clic sur une pastille va à l'image correspondante", () => {
    const { container } = render(<Carousel photos={photos} />);
    fireEvent.click(screen.getByRole("button", { name: "Image 3" }));
    expect(current(container)).toBe("3");
  });

  it("ne rend rien si aucune photo", () => {
    const { container } = render(<Carousel photos={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
