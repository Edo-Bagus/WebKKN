import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import TeamMember, { ITeamMember } from "@/models/TeamMember";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // Ambil query parameter
    const { searchParams } = new URL(req.url);
    const cluster = searchParams.get("cluster");
    const faculty = searchParams.get("faculty");
    const major = searchParams.get("major");

    // Buat objek filter dinamis
    const filter: Record<string, string> = {};
    if (cluster) filter.cluster = cluster;
    if (faculty) filter.faculty = faculty;
    if (major) filter.major = major;

    const members = await TeamMember.find(filter).sort({ name: 1 });

    return NextResponse.json({ members }, { status: 200 });
  } catch (error) {
    console.error("GET /api/team-members error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengambil data anggota tim" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body: Partial<ITeamMember> = await req.json();

    // Validasi field wajib
    if (
      !body.name ||
      !body.cluster ||
      !body.faculty ||
      !body.major ||
      !body.email
    ) {
      return NextResponse.json(
        {
          error:
            "Field wajib (name, cluster, faculty, major, email) tidak boleh kosong",
        },
        { status: 400 }
      );
    }

    const newMember = await TeamMember.create(body);

    return NextResponse.json(
      { message: "Anggota tim berhasil ditambahkan", member: newMember },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("POST /api/team-members error:", error);

    // Use type guard
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error
    ) {
      return NextResponse.json(
        { error: "Email sudah digunakan. Gunakan email yang berbeda." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Terjadi kesalahan saat menyimpan anggota tim" },
      { status: 500 }
    );
  }
}
