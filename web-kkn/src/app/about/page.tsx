"use client";

import { Navbar } from "@/components/ui/navbar";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ITeamMember } from "@/models/TeamMember";
import { Footer } from "@/components/ui/footer";

export default function About() {
  const [, setTeamTestimonials] = useState([]);
  const [saintekCluster, setSaintekCluster] = useState([]);
  const [soshumCluster, setSoshumCluster] = useState([]);
  const [agroCluster, setAgroCluster] = useState([]);
  const [medikaCluster, setMedikaCluster] = useState([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const res = await fetch("/api/team-members");
        const data = await res.json();

        const mapped = data.members.map((member: ITeamMember) => ({
          quote: `Proud to contribute to the development of Tegalombo through ${member.cluster}.`,
          name: member.name,
          designation: `${member.major} - ${member.faculty}`,
          src: member.pictureUrl || "/images/person.jpg",
          cluster: member.cluster,
          instagram: member.instagram,
          linkedin: member.linkedIn,
          email: member.email,
        }));

        setTeamTestimonials(mapped);

        // Split into clusters
        setSaintekCluster(
          mapped.filter((m: ITeamMember) => m.cluster === "Saintek")
        );
        setSoshumCluster(
          mapped.filter((m: ITeamMember) => m.cluster === "Soshum")
        );
        setAgroCluster(mapped.filter((m: ITeamMember) => m.cluster === "Agro"));
        setMedikaCluster(
          mapped.filter((m: ITeamMember) => m.cluster === "Medika")
        );
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <div className="bg-[#494633] min-h-screen text-[#F5F0E3]">
      <Navbar />

      <main className="flex flex-col items-center justify-center text-center p-8 pt-32">
        {/* Top Text */}
        <p className="text-sm mb-2">Kenali Kami Lebih Dekat</p>

        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-6">
          Tentang <span className="italic">Tim Langkara Project</span>
        </h1>

        {/* Decorative element */}
        <div className="w-16 h-1 bg-gradient-to-r from-[#E0C49A] to-[#E0C49A] my-4"></div>

        {/* About Content */}
        <section className="max-w-4xl mt-12 text-base md:text-lg leading-relaxed text-accent space-y-6">
          <p>
            Kami adalah tim penuh semangat dari Universitas Gadjah Mada yang
            menjalankan program KKN-PPM di Tegalombo. Fokus utama kami adalah
            mengembangkan potensi ekowisata, melestarikan warisan budaya, serta
            memberdayakan masyarakat melalui inisiatif berkelanjutan.
          </p>

          <p>
            Kami percaya bahwa dengan bergandengan tangan bersama masyarakat,
            kita dapat membangun masa depan yang tangguh sekaligus tetap
            menghargai kekayaan alam dan budaya Tegalombo.
          </p>

          <p>
            Latar belakang kami yang beragam—mulai dari ilmu sosial, pertanian,
            teknik, hingga kesehatan—menjadi kekuatan untuk berkolaborasi dan
            menghadirkan dampak yang bermakna serta berkelanjutan.
          </p>
        </section>

        <section className="max-w-4xl mt-12 text-base md:text-lg leading-relaxed text-[#dcd6c9]">
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-6 italic">
            Sains & Teknologi
          </h1>

          {saintekCluster.length === 0 ? (
            <p>Loading team members...</p>
          ) : (
            <AnimatedTestimonials testimonials={saintekCluster} />
          )}
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-6 italic">
            Sosial & Humaniora
          </h1>

          {soshumCluster.length === 0 ? (
            <p>Loading team members...</p>
          ) : (
            <AnimatedTestimonials testimonials={soshumCluster} />
          )}
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-6 italic">
            Agrokompleks
          </h1>

          {agroCluster.length === 0 ? (
            <p>Loading team members...</p>
          ) : (
            <AnimatedTestimonials testimonials={agroCluster} />
          )}
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-6 italic">
            Medika
          </h1>

          {medikaCluster.length === 0 ? (
            <p>Loading team members...</p>
          ) : (
            <AnimatedTestimonials testimonials={medikaCluster} />
          )}
        </section>

        {/* About Content */}
        {/* Back to Home Button */}
        <div className="mt-12">
          <Link href="/">
            <button className="bg-[#E0C49A] text-[#494633] px-8 py-3 rounded-full text-lg hover:bg-[#d5b890] transition-colors">
              Back to Home
            </button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
