import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#494633',    // dark olive - warna kuat untuk elemen utama
        secondary: '#E0C49A',  // beige gold - pendukung
        accent: '#F5F0E3',     // creamy - aksen dan background soft
        success: '#769656',    // hijau olive natural (sesuai tone)
        warning: '#D4A373',    // warm orange (serasi dengan beige)
        error: '#B54747',      // earthy red (masih harmonis, tidak terlalu neon)
        neutral: {
          100: '#F5F0E3',      // putih creamy
          300: '#C8C2B0',      // abu beige muda
          500: '#8C8973',      // abu olive
          700: '#494633',      // dark olive (sebagai base text heavy)
        },
      },           
    },
  },
  plugins: [],
} satisfies Config;
