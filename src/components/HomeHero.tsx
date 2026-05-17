"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
  type TouchEvent,
} from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { homeSlides } from "@/data/kiosk";

const SLIDE_INTERVAL_MS = 6_000;
const SWIPE_THRESHOLD_PX = 48;

export function HomeHero() {
  const [slideIndex, setSlideIndex] = useState(0);
  const { t } = useLanguage();
  const intervalRef = useRef<number | null>(null);
  const mouseStartXRef = useRef<number | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const activeSlide = useMemo(() => homeSlides[slideIndex], [slideIndex]);

  const startAutoSlide = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }

    intervalRef.current = window.setInterval(() => {
      setSlideIndex((current) => (current + 1) % homeSlides.length);
    }, SLIDE_INTERVAL_MS);
  };

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);

  const selectSlide = (index: number) => {
    setSlideIndex(index);
    startAutoSlide();
  };

  const changeSlide = (direction: 1 | -1) => {
    setSlideIndex((current) => {
      const nextIndex = current + direction;

      if (nextIndex < 0) {
        return homeSlides.length - 1;
      }

      if (nextIndex >= homeSlides.length) {
        return 0;
      }

      return nextIndex;
    });
    startAutoSlide();
  };

  const applySwipe = (startX: number, endX: number) => {
    const swipeDistance = endX - startX;

    if (Math.abs(swipeDistance) >= SWIPE_THRESHOLD_PX) {
      changeSlide(swipeDistance < 0 ? 1 : -1);
    }
  };

  const handleMouseDown = (event: MouseEvent<HTMLElement>) => {
    mouseStartXRef.current = event.clientX;
  };

  const handleMouseUp = (event: MouseEvent<HTMLElement>) => {
    if (mouseStartXRef.current === null) {
      return;
    }

    applySwipe(mouseStartXRef.current, event.clientX);
    mouseStartXRef.current = null;
  };

  const handleMouseLeave = () => {
    mouseStartXRef.current = null;
  };

  const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    if (touchStartXRef.current === null) {
      return;
    }

    const touchEndX = event.changedTouches[0]?.clientX;

    if (typeof touchEndX === "number") {
      applySwipe(touchStartXRef.current, touchEndX);
    }

    touchStartXRef.current = null;
  };

  const handleTouchCancel = () => {
    touchStartXRef.current = null;
  };

  return (
    <section
      className="relative h-[24rem] overflow-hidden rounded-[1.25rem] bg-ink shadow-kiosk [touch-action:pan-y] sm:h-[28rem] lg:h-[30rem] lg:rounded-[1.75rem]"
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
    >
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
      <div className="relative flex h-full max-w-[58rem] flex-col justify-center px-5 pb-20 pt-8 text-white sm:px-8 lg:px-12 lg:pb-24 lg:pt-10">
        <p className="mb-5 w-fit rounded-2xl bg-coral px-4 py-2 text-base font-black text-white shadow-[0_12px_32px_rgba(0,0,0,0.28)] sm:text-xl lg:mb-6 lg:px-5 lg:py-3 lg:text-2xl">
          {t({ vi: "Đang trình chiếu thư viện", en: "Library slideshow" })}
        </p>
        <div className="flex min-h-[11rem] max-w-[54rem] flex-col justify-center rounded-[1.25rem] border-l-8 border-coral bg-ink/76 px-5 py-4 shadow-[0_18px_48px_rgba(0,0,0,0.38)] ring-2 ring-white/16 backdrop-blur-sm sm:min-h-[12.75rem] sm:px-6 sm:py-5 lg:min-h-[13rem] lg:px-7">
          <h2 className="max-w-[54rem] text-[clamp(2.2rem,6vw,4rem)] font-black leading-[1.04] text-[#fff8ea] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            {t(activeSlide.title)}
          </h2>
          <p className="mt-4 max-w-[46rem] text-base font-black leading-snug text-[#ffe2b5] drop-shadow-[0_3px_10px_rgba(0,0,0,0.78)] sm:text-xl lg:text-2xl">
            {t(activeSlide.description)}
          </p>
        </div>
        <div
          className="absolute bottom-6 left-5 z-10 flex w-fit items-center gap-2 rounded-xl bg-ink/22 p-2 backdrop-blur-sm sm:left-8 lg:bottom-8 lg:left-12 lg:gap-2.5"
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
              className={`h-2.5 w-8 rounded-full transition-colors duration-300 sm:h-3 sm:w-11 lg:w-12 ${
                index === slideIndex
                  ? "bg-coral shadow-[0_0_0_3px_rgba(255,127,24,0.22)]"
                  : "bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
