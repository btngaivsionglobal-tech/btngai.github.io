"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { homeSlides } from "@/data/kiosk";

const SLIDE_INTERVAL_MS = 6_000;

export function HomeHero() {
  const [slideIndex, setSlideIndex] = useState(0);
  const { t } = useLanguage();
  const intervalRef = useRef<number | null>(null);
  const activeSlide = useMemo(() => homeSlides[slideIndex], [slideIndex]);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setSlideIndex((current) => (current + 1) % homeSlides.length);
    }, SLIDE_INTERVAL_MS);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);

  const selectSlide = (index: number) => {
    setSlideIndex(index);

    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }

    intervalRef.current = window.setInterval(() => {
      setSlideIndex((current) => (current + 1) % homeSlides.length);
    }, SLIDE_INTERVAL_MS);
  };

  return (
    <section className="relative min-h-[30rem] overflow-hidden rounded-[1.75rem] bg-ink shadow-kiosk">
      {homeSlides.map((slide, index) => (
        <div
          key={slide.image}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
            index === slideIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${slide.image})` }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/92 via-ink/56 to-ink/4" />
      <div className="absolute inset-y-0 left-0 w-[58rem] bg-gradient-to-r from-ink/44 to-transparent" />
      <div className="relative flex h-full min-h-[30rem] max-w-[58rem] flex-col justify-center px-12 pb-28 pt-10 text-white">
        <p className="mb-5 w-fit rounded-2xl bg-coral px-5 py-3 text-2xl font-black text-white shadow-kiosk">
          {t({ vi: "Đang trình chiếu thư viện", en: "Library slideshow" })}
        </p>
        <h2 className="max-w-[54rem] text-[4.15rem] font-black leading-[1.04] text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.28)]">
          {t(activeSlide.title)}
        </h2>
        <p className="mt-6 max-w-[48rem] text-[1.62rem] font-bold leading-snug text-white/95 drop-shadow-[0_3px_12px_rgba(0,0,0,0.24)]">
          {t(activeSlide.description)}
        </p>
        <div
          className="absolute bottom-10 left-12 z-10 flex w-fit items-center gap-4 rounded-2xl bg-ink/22 p-3 backdrop-blur-sm"
          aria-label={t({
            vi: "Điều hướng slide banner",
            en: "Banner slide navigation",
          })}
        >
          {homeSlides.map((slide, index) => (
            <button
              type="button"
              key={slide.title.vi}
              onClick={() => selectSlide(index)}
              aria-label={t({
                vi: `Chuyển đến slide ${index + 1}`,
                en: `Go to slide ${index + 1}`,
              })}
              className={`h-5 w-24 rounded-full transition-colors duration-300 ${
                index === slideIndex
                  ? "bg-coral shadow-[0_0_0_4px_rgba(255,127,24,0.22)]"
                  : "bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
