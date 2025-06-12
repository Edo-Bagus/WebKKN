'use client'

import Image from 'next/image'
import {
  IconBrandInstagram,
  IconBrandLinkedin,
  IconMail,
} from '@tabler/icons-react'

export default function MemberCard({ article }: any) {
  const author = article.author

  return (
    <div className="col-span-1">
      <div className="bg-[#3E3B32] rounded-2xl p-6 shadow-lg text-center flex flex-col items-center">
        {/* Foto profil */}
        <div className="w-24 h-24 relative mb-4">
          <Image
            src={author.photoUrl || '/images/person.jpg'}
            alt={author.name}
            fill
            className="rounded-full object-cover"
          />
        </div>

        {/* Nama dan info */}
        <h3 className="text-xl font-semibold text-white mb-1">{author.name}</h3>
        <p className="text-sm text-gray-300 mb-4">{`${author.major} - ${author.faculty}`}</p>

        {/* Sosial Media */}
        <div className="flex items-center gap-4">
          {author.instagram && (
            <a
              href={author.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-accent hover:text-[#bc2a8d] transition"
            >
              <IconBrandInstagram className="h-5 w-5" />
            </a>
          )}
          {author.linkedIn && (
            <a
              href={author.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-accent hover:text-[#0077b5] transition"
            >
              <IconBrandLinkedin className="h-5 w-5" />
            </a>
          )}
          {author.email && (
            <a
              href={`mailto:${author.email}`}
              aria-label="Email"
              className="text-accent hover:text-[#d1d5db] transition"
            >
              <IconMail className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
