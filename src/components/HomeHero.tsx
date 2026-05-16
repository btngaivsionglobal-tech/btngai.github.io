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
      <div className="absolute inset-0 bg-gradient-to-r from-ink/82 via-ink/42 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/42 via-transparent to-transparent" />
      <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-ink/58 via-ink/22 to-transparent lg:w-[64rem]" />
      <div className="relative flex h-full min-h-[24rem] max-w-[58rem] flex-col justify-center px-5 pb-24 pt-8 text-white sm:min-h-[28rem] sm:px-8 lg:min-h-[30rem] lg:px-12 lg:pb-28 lg:pt-10">
        <p className="mb-5 w-fit rounded-2xl bg-coral px-4 py-2 text-base font-black text-white shadow-[0_12px_32px_rgba(0,0,0,0.28)] sm:text-xl lg:mb-6 lg:px-5 lg:py-3 lg:text-2xl">
          {t({ vi: "Đang trình chiếu thư viện", en: "Library slideshow" })}
        </p>
        <div className="max-w-[54rem] rounded-[1.75rem] border-l-8 border-coral bg-ink/76 px-5 py-5 shadow-[0_18px_48px_rgba(0,0,0,0.38)] ring-2 ring-white/16 backdrop-blur-sm sm:px-6 sm:py-6 lg:px-7">
          <h2 className="max-w-[54rem] text-[clamp(2.5rem,8vw,4.45rem)] font-black leading-[1.02] text-[#fff8ea] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            {t(activeSlide.title)}
          </h2>
          <p className="mt-5 max-w-[46rem] text-lg font-black leading-snug text-[#ffe2b5] drop-shadow-[0_3px_10px_rgba(0,0,0,0.78)] sm:text-2xl lg:text-[1.62rem]">
            {t(activeSlide.description)}
          </p>
        </div>
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
