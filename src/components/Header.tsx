"use client";

import { Languages } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

function formatTime(date: Date, language: "vi" | "en") {
  return new Intl.DateTimeFormat(language === "vi" ? "vi-VN" : "en-US", {
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
  }).format(date);
}

export function Header() {
  const [now, setNow] = useState<Date | null>(null);
  const { language, toggleLanguage } = useLanguage();

  useEffect(() => {
    setNow(new Date());
    const interval = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <header className="flex shrink-0 flex-col items-stretch gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-10 xl:px-12">
      <Link
        href="/"
        className="flex min-w-0 items-center gap-3 rounded-2xl outline-none transition active:scale-[0.98] sm:gap-5 lg:gap-6"
        aria-label={language === "vi" ? "Về trang chủ" : "Go to home"}
      >
        <div className="flex h-12 w-36 shrink-0 items-center justify-center sm:h-14 sm:w-44 lg:h-16 lg:w-48">
          <Image
            src="/images/logo-iread-transparent.png"
            alt="iREAD"
            width={875}
            height={304}
            priority
            className="h-auto w-full"
          />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-black uppercase text-coral sm:text-base lg:text-xl lg:tracking-[0.22em]">
            {language === "vi" ? "Kiosk thông tin" : "Information kiosk"}
          </p>
          <h1 className="text-2xl font-black leading-none text-ink sm:text-3xl lg:text-[2.35rem]">
            {language === "vi" ? "Thư viện iREAD" : "iREAD Library"}
          </h1>
        </div>
      </Link>
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:justify-end">
        <div className="rounded-2xl bg-white/90 px-4 py-3 text-lg font-black text-ink shadow-kiosk sm:text-2xl lg:px-7 lg:py-4 lg:text-3xl">
          {now ? formatTime(now, language) : "--:--"}
        </div>
        <button
          type="button"
          onClick={toggleLanguage}
          className="flex min-h-12 items-center gap-2 rounded-2xl bg-coral p-2 text-base font-black text-white shadow-kiosk active:scale-[0.98] sm:min-h-14 sm:text-xl lg:min-h-16 lg:gap-3 lg:text-2xl"
          aria-label={language === "vi" ? "Đổi ngôn ngữ" : "Change language"}
        >
          <Languages className="h-6 w-6 lg:h-[30px] lg:w-[30px]" />
          <span
            className={`rounded-xl px-3 py-2 lg:px-4 ${
              language === "vi" ? "bg-white text-coral" : "text-white/72"
            }`}
          >
            VI
          </span>
          <span className="text-white/62">/</span>
          <span
            className={`rounded-xl px-3 py-2 lg:px-4 ${
              language === "en" ? "bg-white text-coral" : "text-white/72"
            }`}
          >
            EN
          </span>
        </button>
      </div>
    </header>
  );
}
