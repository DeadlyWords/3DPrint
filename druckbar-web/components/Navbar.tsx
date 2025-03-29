"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={clsx(
        "fixed top-0 z-50 w-full px-6 py-4 flex justify-between items-center transition-all",
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <Link href="/" className="flex items-center gap-2">
        <motion.div whileHover={{ scale: 1.05 }}>
          <Image
            src="/Druckbar.png"
            alt="DruckBar Logo"
            width={120}
            height={40}
            className="h-auto w-auto"
          />
        </motion.div>
      </Link>
      <div className="space-x-6 font-medium text-gray-700 text-sm">
        {[
          { label: "Home", href: "#hero" },
          { label: "Leistungen", href: "#services" },
          { label: "Über uns", href: "#about" },
          { label: "Kontakt", href: "#contact" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="hover:text-amber-600 transition-colors duration-200"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}
