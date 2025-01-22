// /app/page.tsx
import React from "react";
import Header from "./components/header"; // Import Header component
import Image from "next/image";

export default function HomePage() {
  return (
    <div>
      <Header />
      {/* Video Background */}
      <main className="relative w-full h-screen flex items-center justify-center bg-transparent">
        
      <Image
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/images/sample-image.jpg" // Make sure the path is correct
        alt="Sangihe Island"
        layout="fill" // This ensures the image covers the full container
      />

        {/* Overlay Title */}
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
            Welcome to Sangihe Island
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300">
            Discover the beauty, culture, and adventures waiting for you.
          </p>
        </div>

        {/* Overlay Background */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 z-5" />
      </main>

      {/* New Section */}
      <section id="about" className="bg-white py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            About Sangihe Island
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Sangihe Island is a hidden gem in Indonesia, offering breathtaking landscapes, rich culture, and unforgettable adventures. 
            Whether you looking to explore volcanic peaks, dive into vibrant coral reefs, or immerse yourself in local traditions, 
            Sangihe Island has something special for everyone.
          </p>
        </div>
        <div className="mt-8 flex justify-center">
          <a
            href="#explore"
            className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md"
          >
            Explore More
          </a>
        </div>
      </section>
    </div>
  );
}
