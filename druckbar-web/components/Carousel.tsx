// components/Carousel.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type CarouselProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemKey: (item: T, index: number) => string | number;
  id?: string;
  title?: string;
  bgColor?: string;
};

export default function Carousel<T>({
  items,
  renderItem,
  itemKey,
  id,
  title,
  bgColor = "white",
}: CarouselProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width >= 1024) setItemsPerView(3);
      else if (width >= 768) setItemsPerView(2);
      else setItemsPerView(1);
    };
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev >= items.length - itemsPerView ? prev : prev + 1
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (distance > threshold) nextSlide();
    else if (distance < -threshold) prevSlide();
  };

  return (
    <section
      id={id}
      className={`bg-${bgColor} py-24 px-6 text-center snap-start`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto relative"
      >
        {title && (
          <h2 className="text-4xl font-bold text-gray-800 mb-10">{title}</h2>
        )}

        <div
          className="relative overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10" />

          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${(100 / itemsPerView) * currentIndex}%)`,
            }}
          >
            {items.map((item, index) => (
              <div
                key={itemKey(item, index)}
                className="w-full sm:w-1/2 lg:w-1/3 px-4 flex-shrink-0"
              >
                {renderItem(item, index)}
              </div>
            ))}
          </div>

          {currentIndex > 0 && (
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 text-3xl px-4 py-2 rounded-s-full text-gray-400 hover:text-gray-600 z-20"
              aria-label="Zurück"
            >
              ‹
            </button>
          )}
          {currentIndex < items.length - itemsPerView && (
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-3xl px-4 py-2 rounded-e-full text-gray-400 hover:text-gray-600 z-20"
              aria-label="Weiter"
            >
              ›
            </button>
          )}
        </div>
      </motion.div>
    </section>
  );
}
