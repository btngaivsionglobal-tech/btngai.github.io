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
    <section className="relative min-h-[24rem] overflow-hidden rounded-[1.25rem] bg-ink shadow-kiosk sm:min-h-[28rem] lg:min-h-[30rem] lg:rounded-[1.75rem]">
      {homeSlides.map((slide, index) => (
        <div
          key={slide.image}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
            index === slideIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${slide.image})` }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/94 via-ink/66 to-ink/18" />
      <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-ink/44 to-transparent lg:w-[58rem]" />
      <div className="relative flex h-full min-h-[24rem] max-w-[58rem] flex-col justify-center px-5 pb-24 pt-8 text-white sm:min-h-[28rem] sm:px-8 lg:min-h-[30rem] lg:px-12 lg:pb-28 lg:pt-10">
        <p className="mb-4 w-fit rounded-2xl bg-coral px-4 py-2 text-base font-black text-white shadow-kiosk sm:text-xl lg:mb-5 lg:px-5 lg:py-3 lg:text-2xl">
          {t({ vi: "Đang trình chiếu thư viện", en: "Library slideshow" })}
        </p>
        <h2 className="max-w-[54rem] text-[clamp(2.4rem,8vw,4.15rem)] font-black leading-[1.04] text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.28)]">
          {t(activeSlide.title)}
        </h2>
        <p className="mt-4 max-w-[48rem] text-lg font-bold leading-snug text-white/95 drop-shadow-[0_3px_12px_rgba(0,0,0,0.24)] sm:text-2xl lg:mt-6 lg:text-[1.62rem]">
          {t(activeSlide.description)}
        </p>
        <div
          className="absolute bottom-7 left-5 z-10 flex w-fit items-center gap-3 rounded-2xl bg-ink/22 p-3 backdrop-blur-sm sm:left-8 lg:bottom-10 lg:left-12 lg:gap-4"
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
              className={`h-4 w-14 rounded-full transition-colors duration-300 sm:h-5 sm:w-20 lg:w-24 ${
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
