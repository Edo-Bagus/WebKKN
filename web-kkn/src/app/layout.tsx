import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

import { ReactLenis } from "./utils/lenis";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Langkara Talambo | KKN PPM UGM 2025",
  description:
    "Langkara Talambo adalah inisiatif KKN PPM UGM 2025 yang mengeksplorasi potensi budaya dan alam di Tegalombo, terutama di Desa Tahunan dan Tahunan Baru. Temukan cerita dan tim kami di sini.",
  openGraph: {
    title: "Langkara Talambo | KKN PPM UGM 2025",
    description:
      "Langkara Talambo adalah inisiatif KKN PPM UGM 2025 yang mengeksplorasi potensi budaya dan alam di Tegalombo, terutama di Desa Tahunan dan Tahunan Baru. Temukan cerita dan tim kami di sini.",
    url: "https://langkaratalambo.web.id",
    images: [
      {
        url: "https://res.cloudinary.com/di2xkoxx0/image/upload/v1756446688/IMG_7280_rugzmu.jpg",
        width: 1200,
        height: 630,
        alt: "Langkara Talambo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Langkara Talambo | KKN PPM UGM 2025",
    description:
      "Langkara Talambo adalah inisiatif KKN PPM UGM 2025 yang mengeksplorasi potensi budaya dan alam di Tegalombo, terutama di Desa Tahunan dan Tahunan Baru. Temukan cerita dan tim kami di sini.",
    images: ["https://res.cloudinary.com/di2xkoxx0/image/upload/v1756446688/IMG_7280_rugzmu.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <ReactLenis root>
        <body className={`${playfair.className} antialiased`}>{children}</body>
      </ReactLenis>
    </html>
  );
}
