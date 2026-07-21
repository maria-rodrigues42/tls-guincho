"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const images = [
  "/images/hero-banner.jpg",
  "/images/truck-front.jpg",
  "/images/truck-side.jpg",
  "/images/tls-cartoon.jpg"
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full h-full min-h-[400px] lg:min-h-[600px] overflow-hidden rounded-none shadow-2xl group">
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={src}
            alt="Guincho em Três Lagoas"
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}
      
      {/* Controls */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-brand-dark/80 hover:bg-brand-primary text-white p-2 rounded-none opacity-0 group-hover:opacity-100 transition-all"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-brand-dark/80 hover:bg-brand-primary text-white p-2 rounded-none opacity-0 group-hover:opacity-100 transition-all"
        aria-label="Próximo"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Ir para a imagem ${i + 1}`}
            className={`w-3 h-3 rounded-none transition-all ${
              i === currentIndex ? "bg-brand-light scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
