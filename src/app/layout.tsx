import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/providers/LenisProvider";
import { Cursor } from "@/components/ui/Cursor";
import { Grain } from "@/components/ui/Grain";
import { Loader } from "@/components/loader/Loader";
import { Navigation } from "@/components/ui/Navigation";
import { IDENTITY } from "@/constants/data";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600"],
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: `${IDENTITY.name} — ${IDENTITY.role}`,
  description:
    "AI/ML engineer and full-stack developer. Applied AI, systems, visualization, research.",
  metadataBase: new URL("https://yourdomain.com"),
  openGraph: {
    title: `${IDENTITY.name} — ${IDENTITY.role}`,
    description: "Applied AI, systems, visualization, research.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="bg-ink text-bone antialiased">
        <Loader />
        <Cursor />
        <Grain />
        <Navigation />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
