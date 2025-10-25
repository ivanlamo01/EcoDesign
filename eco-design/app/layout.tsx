import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  weight: ["700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "EcoDesign PVC | Aberturas de Alta Eficiencia en San Martín de los Andes",
  description:
    "Aberturas de PVC de alta eficiencia con ingeniería y diseño desde San Martín de los Andes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.variable} ${merriweather.variable} antialiased scroll-smooth`}>
        {children}
      </body>
    </html>
  );
}
