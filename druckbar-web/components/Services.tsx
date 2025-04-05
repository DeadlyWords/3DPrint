// components/Services.tsx
"use client";

import Carousel from "@/components/Carousel";

const services = [
  {
    title: "3D-Druck",
    desc: "FDM & Resin Druck mit der BambuLab H2D – präzise, schnell und zuverlässig.",
  },
  {
    title: "Lasergravur & Schnitt",
    desc: "Perfekt für Holz, Acryl & mehr – personalisierte Gravuren & präzise Schnitte.",
  },
  {
    title: "Reparatur & Nachhaltigkeit",
    desc: "Lokale Hilfe zur Reparatur defekter Alltagsgegenstände – statt wegwerfen.",
  },
  {
    title: "Sonderanfertigungen",
    desc: "Individuelle Lösungen für kreative Projekte, Prototypen & funktionale Modelle.",
  },
];

export default function Services() {
  return (
    <Carousel
      id="services"
      title="Unsere Leistungen"
      items={services}
      itemKey={(_, i) => i}
      bgColor="white"
      renderItem={(item) => (
        <div className="bg-amber-50 p-6 rounded-lg shadow-sm h-full text-left">
          <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
          <p>{item.desc}</p>
        </div>
      )}
    />
  );
}
