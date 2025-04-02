"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeaturedProducts from "@/components/FeaturedProducts";

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
          <h1 className="text-5xl font-bold mb-4 drop-shadow text-black">
            Willkommen bei DruckBar
          </h1>
          <p className="max-w-xl mx-auto text-lg text-black">
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

      <FeaturedProducts />

      {/* About Section */}
      <section
        id="about"
        className="relative min-h-screen snap-start flex items-center justify-center text-white"
      >
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url(/workshop_bg.png)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="px-6 text-center max-w-3xl"
        >
          <h2 className="text-4xl font-bold mb-6">Über DruckBar</h2>
          <p className="text-lg text-white/90">
            Wir glauben daran, Dinge zu schaffen, zu reparieren und lokal neu zu
            denken. In unserer Werkstatt in Hof entstehen Ideen, Prototypen und
            Produkte – mit Leidenschaft, Präzision und Nachhaltigkeit.
          </p>
        </motion.div>
      </section>

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
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 text-left">
            {/* Map */}
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Hier findest du uns:
              </h3>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2571.582070189531!2d11.9109341!3d50.3130058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a1f2493097bcd1%3A0x3a2c7d33e3e9d5a9!2sHof%2C%20Bavaria!5e0!3m2!1sen!2sde!4v1645444306256"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="rounded-lg shadow-md"
              />
            </div>

            {/* Form */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Schreib uns:</h3>
              <form
                action="https://formsubmit.co/info@druckbar.de"
                method="POST"
                className="space-y-4"
              >
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />

                <div>
                  <label htmlFor="name" className="block text-sm font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium">
                    E-Mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium"
                  >
                    Nachricht
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    required
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-md"
                >
                  Nachricht senden
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
