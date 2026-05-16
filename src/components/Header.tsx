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
    <header className="flex h-24 shrink-0 items-center justify-between gap-6 px-10 xl:px-12">
      <Link
        href="/"
        className="flex items-center gap-6 rounded-2xl outline-none transition active:scale-[0.98]"
        aria-label={language === "vi" ? "Về trang chủ" : "Go to home"}
      >
        <div className="flex h-16 w-48 items-center justify-center">
          <Image
            src="/images/logo-iread-transparent.png"
            alt="iREAD"
            width={875}
            height={304}
            priority
            className="h-auto w-full"
          />
        </div>
        <div>
          <p className="text-xl font-black uppercase tracking-[0.22em] text-coral">
            {language === "vi" ? "Kiosk thông tin" : "Information kiosk"}
          </p>
          <h1 className="text-[2.35rem] font-black leading-none text-ink">
            {language === "vi" ? "Thư viện iREAD" : "iREAD Library"}
          </h1>
        </div>
      </Link>
      <div className="flex items-center gap-4">
        <div className="rounded-2xl bg-white/90 px-7 py-4 text-3xl font-black text-ink shadow-kiosk">
          {now ? formatTime(now, language) : "--:--"}
        </div>
        <button
          type="button"
          onClick={toggleLanguage}
          className="flex min-h-16 items-center gap-3 rounded-2xl bg-coral p-2 text-2xl font-black text-white shadow-kiosk active:scale-[0.98]"
          aria-label={language === "vi" ? "Đổi ngôn ngữ" : "Change language"}
        >
          <Languages size={30} />
          <span
            className={`rounded-xl px-4 py-2 ${
              language === "vi" ? "bg-white text-coral" : "text-white/72"
            }`}
          >
            VI
          </span>
          <span className="text-white/62">/</span>
          <span
            className={`rounded-xl px-4 py-2 ${
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
