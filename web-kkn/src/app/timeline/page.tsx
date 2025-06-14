import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { Navbar } from "../../components/ui/navbar";

export default function TimelineDemo() {
  const data = [
    {
      title: "Week 1",
      content: (
        <h2 className="text-4xl md:text-6xl font-semibold leading-tight mb-2 text-neutral-500 dark:text-neutral-300 ">
          Coming Soon
        </h2>
      ),
    },
  ];
  return (
    <div className="relative w-full overflow-clip">
      <Navbar />
      <main className="flex flex-col items-center justify-center text-center h-screen">
        <div className='flex flex-col items-center justify-center text-center bg-primary text-secondary rounded-2xl p-6 m-4 h-[90%] w-[95%] max-w-8xl'>
          {/* Top Text */}
          <p className="text-sm mb-2">KKN PPM UGM 2025</p>

          {/* Section Title */}
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-2">
            Jejak Langkah <span className="italic">KKN Tegalombo</span>
          </h1>
          <h1 className="text-2xl md:text-3xl font-medium leading-tight mb-6">
            Kisah Perjalanan, Dedikasi, dan Inspirasi
          </h1>

          {/* Decorative element */}
          <div className="w-16 h-1 bg-gradient-to-r from-accent to-secondary my-4"></div>
        </div>
      </main>
      <Timeline data={data} />
    </div>
  );
}
