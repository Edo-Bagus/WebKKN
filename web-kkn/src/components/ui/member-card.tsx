'use client'

import Image from "next/image";

export default function MemberCard({ article }: any) {
  return (
    <div className="col-span-1">
      <div className="bg-[#3E3B32] rounded-lg p-6 shadow-lg text-center">
        <div className="w-24 h-24 mx-auto mb-4 relative">
          <Image
            src={article.author.photoUrl || "/images/person.jpg"}
            alt="Author"
            fill
            objectFit="cover"
            className="rounded-full"
          />
        </div>
        <h3 className="text-xl font-semibold text-white">{article.author.name}</h3>
      </div>
    </div>
  );
}
