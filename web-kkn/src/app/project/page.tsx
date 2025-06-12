"use client";

import { useEffect, useState } from "react";
import BlogCard from "@/components/ui/blog-card";
import { Navbar } from "../../components/ui/navbar";
import dynamic from "next/dynamic";
import { MultiValue, SingleValue } from "react-select";

type OptionType = {
  label: string;
  value: string;
};

const Select = dynamic(() => import("react-select"), { ssr: false });

export default function ProjectPage() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedClusters, setSelectedClusters] = useState<string[]>([]);
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"terbaru" | "terlama">("terbaru");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ARTICLES_PER_PAGE = 6;


  const [teamMembers, setTeamMembers] = useState<
    { value: string; label: string }[]
  >([]);

  const sortOptions = [
    { value: "terbaru", label: "Waktu Terbaru" },
    { value: "terlama", label: "Waktu Terlama" },
  ];

  const klasterOptions = [
    { value: "saintek", label: "Saintek" },
    { value: "soshum", label: "Soshum" },
    { value: "agro", label: "Agro" },
    { value: "medika", label: "Medika" },
  ];

  useEffect(() => {
    const fetchTeamMembers = async () => {
      const res = await fetch("/api/team-members");
      const { members } = await res.json();
      const team = members.map((member: any) => ({
        value: member._id,
        label: member.name,
      }));
      setTeamMembers(team);
    };

    fetchTeamMembers();
  }, []);

  const fetchProjects = async () => {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (selectedClusters.length)
      params.append("categories", selectedClusters.join(","));
    if (selectedPeople.length)
      params.append("author", selectedPeople.join(","));
    params.append("sort", sortOrder === "terbaru" ? "desc" : "asc");
    params.append("page", currentPage.toString());
    params.append("limit", ARTICLES_PER_PAGE.toString());

    const res = await fetch(`/api/articles?${params.toString()}`);
    const data = await res.json();
    console.log(data.articles)
    setProjects(data.articles);
    setTotalPages(Math.ceil(data.total / ARTICLES_PER_PAGE))
  };

  useEffect(() => {
    fetchProjects();
  }, [search, selectedClusters, selectedPeople, sortOrder, currentPage]);

  useEffect(() => {
    setCurrentPage(1); // reset ke halaman 1 saat filter berubah
  }, [search, selectedClusters, selectedPeople, sortOrder]);


  return (
    <main className="min-h-screen bg-accent px-6 py-10">
      <Navbar />
      <h1 className="text-3xl font-bold text-primary mb-8 text-center">
        Proyek KKN Kami
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filter Sidebar */}
        <aside className="bg-white p-4 rounded-xl shadow col-span-1 space-y-4 self-start">
          <input
            type="text"
            placeholder="Cari proyek..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
          />

          <div>
            <h2 className="font-semibold mb-2">Filter Klaster</h2>
            <Select
              isMulti
              options={klasterOptions}
              value={klasterOptions.filter((option) =>
                selectedClusters.includes(option.value)
              )}
              onChange={(selected) =>
                setSelectedClusters(
                  (selected as MultiValue<OptionType>).map(
                    (option) => option.value
                  )
                )
              }
              placeholder="Pilih klaster..."
              className="text-sm"
              classNamePrefix="react-select"
            />
          </div>

          <div>
            <h2 className="font-semibold mb-2">Filter Orang</h2>
            <Select
              isMulti
              options={teamMembers}
              value={teamMembers.filter((option) =>
                selectedPeople.includes(option.value)
              )}
              onChange={(selected) =>
                setSelectedPeople(
                  (selected as MultiValue<OptionType>).map(
                    (option) => option.value
                  )
                )
              }
              placeholder="Pilih penulis..."
              className="text-sm"
              classNamePrefix="react-select"
            />
          </div>

          <div>
            <h2 className="font-semibold mb-2">Urutkan</h2>
            <Select
              options={sortOptions}
              value={sortOptions.find((opt) => opt.value === sortOrder)}
              onChange={(selected) =>
                setSortOrder(
                  (selected as SingleValue<OptionType>)?.value as
                    | "terbaru"
                    | "terlama"
                )
              }
              className="text-sm"
              classNamePrefix="react-select"
            />
          </div>
        </aside>

        {/* Article Cards */}
        <section className="col-span-1 md:col-span-3">
          {projects.length === 0 ? (
            <p className="text-center text-neutral-500">
              Tidak ada proyek yang ditemukan.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project: any) => (
                <BlogCard key={project.slug} {...project} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded-lg border text-sm ${
                    currentPage === i + 1
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-primary border-neutral-300 hover:bg-neutral-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
          </section>
      </div>
    </main>
  );
}
