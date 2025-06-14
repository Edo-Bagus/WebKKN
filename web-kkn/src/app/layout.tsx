import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

import {ReactLenis} from './utils/lenis'

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Langkara Project – Mengungkap Pesona Tegalombo | KKN PPM UGM 2025",
  description: "Langkara Project adalah inisiatif KKN PPM UGM 2025 yang mengeksplorasi potensi budaya dan alam di Tegalombo. Temukan cerita dan tim kami di sini.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <ReactLenis root>
      <body className={`${playfair.className} antialiased`}>

          {children}
        </body>
      </ReactLenis>
    </html>
  );
}
