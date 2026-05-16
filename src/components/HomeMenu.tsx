"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { menuItems } from "@/data/kiosk";

const toneClasses = {
  teal: "bg-coral text-white",
  coral: "bg-coral text-white",
  amber: "bg-amber text-ink",
  leaf: "bg-graphite text-white",
  blue: "bg-ink text-white",
  rose: "bg-coral text-white",
};

const borderClasses = {
  teal: "border-coral/60",
  coral: "border-coral/60",
  amber: "border-amber/70",
  leaf: "border-graphite/50",
  blue: "border-ink/50",
  rose: "border-coral/60",
};

export function HomeMenu() {
  const { t } = useLanguage();

  return (
    <nav className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 xl:gap-5">
      {menuItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`group relative flex min-h-32 items-center gap-4 overflow-hidden rounded-[1.25rem] border-l-[8px] bg-white/94 p-5 shadow-kiosk transition active:scale-[0.98] sm:min-h-40 sm:gap-5 sm:p-6 xl:min-h-44 xl:gap-6 xl:rounded-[1.5rem] xl:border-l-[10px] xl:p-7 ${borderClasses[item.tone]}`}
          >
            <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-coral via-amber to-graphite opacity-75" />
            <span
              className={`grid h-16 w-16 shrink-0 place-items-center rounded-2xl shadow-[0_14px_28px_rgba(8,47,61,0.14)] sm:h-20 sm:w-20 ${toneClasses[item.tone]}`}
            >
              <Icon className="h-8 w-8 sm:h-[42px] sm:w-[42px]" strokeWidth={2.4} />
            </span>
            <span className="min-w-0">
              <span className="block text-2xl font-black leading-tight text-ink sm:text-[1.72rem]">
                {t(item.title)}
              </span>
              <span className="mt-2 block max-w-[28rem] text-base font-bold leading-snug text-ink/72 sm:mt-3 sm:text-[1.13rem]">
                {t(item.description)}
              </span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
