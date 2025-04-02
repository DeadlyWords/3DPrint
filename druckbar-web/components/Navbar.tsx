// components/Navbar.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Leistungen", href: "#services" },
    { label: "Über uns", href: "#about" },
    { label: "Kontakt", href: "#contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={clsx(
          "fixed top-0 z-50 w-full px-6 py-4 flex justify-between items-center transition-all backdrop-blur-md",
          scrolled ? "bg-white/80 shadow-sm" : "bg-transparent"
        )}
      >
        {/* Text Logo */}
        <Link
          href="/"
          className="text-xl md:text-2xl font-bold tracking-tight text-gray-900"
        >
          DruckBar
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6 text-base font-medium text-gray-800">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-amber-600 transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}

          {/* Shop Button */}
          <Link
            href="/shop"
            className="ml-4 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md font-semibold shadow"
          >
            Shop
          </Link>
        </div>

        {/* Mobile Burger Button */}
        <div className="md:hidden ml-auto">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
            className="text-gray-800"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 left-0 w-full bg-white z-40 shadow-md md:hidden"
          >
            <div className="flex flex-col items-center gap-6 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-800 hover:text-amber-600 font-medium text-lg"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/shop"
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md font-semibold shadow"
                onClick={() => setMobileOpen(false)}
              >
                Shop
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
