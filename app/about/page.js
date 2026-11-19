import Image from "next/image";

const sections = [
  {
    id: "agency",
    title: "Our Agency",
    paragraphs: [
      "Parfums de Tunisie is a Tunis-based travel agency, located at 22 Rue Eljem. We help local and international travelers discover Tunisia: its Mediterranean coastline, its historical sites and its living culture.",
      "We plan trips, book hotels and flights, and organize guided tours and customized packages for individuals and groups. Our goal is simple: make traveling in Tunisia easy, comfortable and well organized.",
    ],
    images: [
      { src: "/globe.svg", alt: "Parfums de Tunisie agency office" },
      { src: "/globe.svg", alt: "Travelers visiting Sidi Bou Said" },
    ],
  },
  {
    id: "bus",
    title: "Our Bus Service",
    paragraphs: [
      "Our air-conditioned buses connect the main destinations in Tunisia, from Tunis to Hammamet, Sousse, Djerba and the Sahara gateway towns. They are used for excursions, transfers and multi-day tours.",
      "Each bus is regularly maintained and driven by experienced local drivers who know the roads. Whether you travel alone or with a group, you get comfortable seats, luggage space and reliable schedules.",
    ],
    images: [
      { src: "/bus1.png", alt: "Tourist bus on a Tunisian road" },
      { src: "/bus2.png", alt: "Inside a comfortable tour bus" },
    ],
  },
  {
    id: "owner",
    title: "Meet the Owner",
    paragraphs: [
      "Parfums de Tunisie was founded by a professional with a long background in the Tunisian tourism sector, who wanted to combine local knowledge with professional organization.",
      "His vision is to show travelers the real Tunisia: its heritage, its landscapes and its hospitality. He continues to lead the agency and to support the growth of tourism in the country.",
    ],
    images: [{ src: "/owner.png", alt: "Owner of Parfums de Tunisie" }],
  },
];

export const metadata = {
  title: "About Us | Parfums de Tunisie",
  description: "Learn about our agency, our bus service and our founder.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-6xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-center text-4xl font-bold text-orange-800 drop-shadow sm:text-5xl">
        About Us
      </h1>

      {sections.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          className={`flex flex-col gap-6 overflow-hidden rounded-2xl bg-white/90 p-6 shadow-lg md:items-center md:gap-10 md:p-8 ${
            index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
          }`}
        >
          {/* Text */}
          <div className="md:w-1/2">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900 sm:text-3xl">
              {section.title}
            </h2>
            <div className="space-y-4 leading-relaxed text-gray-700">
              {section.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          {/* Images */}
          <div
            className={`grid gap-4 md:w-1/2 ${
              section.images.length > 1 ? "grid-cols-2" : "grid-cols-1"
            }`}
          >
            {section.images.map((img) => (
              <div
                key={img.src}
                className={`relative overflow-hidden rounded-xl ${
                  section.images.length > 1 ? "aspect-[3/4]" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}