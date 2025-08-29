'use client'

import { useRef } from 'react'

export default function MemberCard({ article }: any) {
  const author = article.author
  const videoRef = useRef<HTMLVideoElement>(null)


  return (
    <div className="col-span-1">
      <div className="bg-[#3E3B32] rounded-2xl p-6 shadow-lg text-center flex flex-col items-center">
        {/* Video profil */}
        <div className="w-24 h-24 relative mb-4">
          <video
            ref={videoRef}
            src={author.pictureUrl || '/videos/default.mp4'}
            className="rounded-full object-cover w-full h-full"
            autoPlay
            playsInline            muted
            loop
          />
        </div>

        {/* Nama dan info */}
        <h3 className="text-xl font-semibold text-white mb-1">{author.name}</h3>
        <p className="text-sm text-gray-300 mb-4">{`${author.major} - ${author.faculty}`}</p>
      </div>
    </div>
  )
}
