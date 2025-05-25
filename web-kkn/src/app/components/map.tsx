'use client'

export default function MapEmbed() {
  return (
    <div className="relative px-6 md:px-24 py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#333]">
        📍 Lokasi Kami
      </h2>

      <div className="overflow-hidden rounded-xl shadow-lg transition-transform hover:scale-[1.01] duration-300">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15812.066564706629!2d110.37534578715822!3d-7.788059799999991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a59dbb9ce126f%3A0xabf78af946563018!2sMap%20Raport%20Murah%20Jogja!5e0!3m2!1sen!2sid!4v1747471391602!5m2!1sen!2sid"
          width="100%"
          height="450"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  )
}
