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
    <nav className="grid grid-cols-3 gap-5">
      {menuItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`group relative flex min-h-44 items-center gap-6 overflow-hidden rounded-[1.5rem] border-l-[10px] bg-white/94 p-7 shadow-kiosk transition active:scale-[0.98] ${borderClasses[item.tone]}`}
          >
            <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-coral via-amber to-graphite opacity-75" />
            <span
              className={`grid h-20 w-20 shrink-0 place-items-center rounded-2xl shadow-[0_14px_28px_rgba(8,47,61,0.14)] ${toneClasses[item.tone]}`}
            >
              <Icon size={42} strokeWidth={2.4} />
            </span>
            <span className="min-w-0">
              <span className="block text-[1.72rem] font-black leading-tight text-ink">
                {t(item.title)}
              </span>
              <span className="mt-3 block max-w-[28rem] text-[1.13rem] font-bold leading-snug text-ink/72">
                {t(item.description)}
              </span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
