import type { Metadata } from "next";
import { headers } from "next/headers";
import "./landing.css";
import "./sections.css";
import "./closing.css";
import "./responsive.css";

const baseMetadata: Metadata = {
  title: "Aula Semente | Entenda o Jogo Antes da Pr\u00f3xima Decis\u00e3o",
  description: "Uma aula ao vivo para entender por que suas decis\u00f5es no mercado cripto saem do plano, conhecer o FOSI e enxergar o primeiro princ\u00edpio do M\u00e9todo M.E.S.T.R.E.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: { title: "Aula Semente | N\u00e3o \u00e9 o ativo. \u00c9 o jogo.", description: "Entenda o FOSI e veja o primeiro princ\u00edpio do M\u00e9todo M.E.S.T.R.E.", type: "website", locale: "pt_BR" },
};

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host") || "localhost:3000";
  const forwardedProtocol = requestHeaders.get("x-forwarded-proto");
  const protocol = forwardedProtocol || (host.startsWith("localhost") ? "http" : "https");
  const metadataBase = new URL(protocol + "://" + host);
  const socialImage = new URL("/og.png", metadataBase).toString();
  return {
    ...baseMetadata,
    metadataBase,
    openGraph: { ...baseMetadata.openGraph, images: [{ url: socialImage, width: 1680, height: 936, alt: "Z\u00e9 do Bilh\u00e3o diante do tabuleiro: n\u00e3o \u00e9 o ativo, \u00e9 o jogo" }] },
    twitter: { card: "summary_large_image", title: "Aula Semente | N\u00e3o \u00e9 o ativo. \u00c9 o jogo.", description: baseMetadata.description || "", images: [socialImage] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}