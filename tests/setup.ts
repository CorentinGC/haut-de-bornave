// Setup global Vitest : matchers jest-dom + mock next/font.
import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// next/font/google n'est pas exécutable hors build Next : on le mocke.
vi.mock("next/font/google", () => ({
  Fraunces: () => ({ variable: "--font-fraunces", className: "font-fraunces" }),
  Inter: () => ({ variable: "--font-inter", className: "font-inter" }),
}));
