"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="scroll-smooth snap-y snap-mandatory">
      <Navbar />

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center text-white snap-start"
      >
        <Image
          src="/landing_bg.png"
          alt="3D printing background"
          fill
          className="object-cover opacity-30 -z-10"
          priority
        />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center px-6"
        >
          <h1 className="text-5xl font-bold mb-4 drop-shadow">
            Willkommen bei DruckBar
          </h1>
          <p className="max-w-xl mx-auto text-lg">
            Hochwertiger 3D-Druck, Laserschneiden & Reparaturen in Hof – lokal &
            nachhaltig.
          </p>
        </motion.div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="min-h-screen bg-white py-24 px-6 text-center snap-start"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-8 text-gray-800"
        >
          Unsere Leistungen
        </motion.h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12 text-left">
          {[
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
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-amber-50 p-6 rounded-lg shadow-sm"
            >
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="min-h-screen bg-amber-50 py-24 px-6 text-center snap-start"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-8 text-gray-800">
            Über DruckBar
          </h2>
          <p className="max-w-3xl mx-auto text-lg">
            Wir sind eine lokale Initiative aus Hof, die sich auf moderne
            Produktionstechnologien spezialisiert hat. Unsere Mission ist es,
            nachhaltige Lösungen durch 3D-Druck, Reparaturservices und kreative
            Fertigung anzubieten.
          </p>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="min-h-screen bg-white py-24 px-6 text-center snap-start"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-8 text-gray-800">Kontakt</h2>
          <p className="text-lg mb-6">
            Du hast ein Projekt oder eine Frage? Schreib uns!
          </p>
          <a
            href="mailto:info@druckbar.de"
            className="inline-block px-6 py-3 text-white bg-amber-600 hover:bg-amber-700 rounded-full text-lg transition"
          >
            Jetzt Kontakt aufnehmen
          </a>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
