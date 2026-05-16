"use client";

import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import type { LocalizedText } from "@/components/LanguageProvider";
import { useLanguage } from "@/components/LanguageProvider";

type PageShellProps = {
  title: LocalizedText;
  description: LocalizedText;
  children: ReactNode;
};

export function PageShell({ title, description, children }: PageShellProps) {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <main className="flex h-[100dvh] flex-col overflow-hidden">
      <Header />
      <section className="flex min-h-0 flex-1 flex-col px-3 pb-3 sm:px-5 sm:pb-4 lg:px-8 xl:px-12">
        <div className="mb-3 flex shrink-0 flex-col gap-3 md:flex-row md:items-center md:justify-between lg:mb-4">
          <div className="min-w-0">
            <h2 className="text-[clamp(1.85rem,5.5vw,3.35rem)] font-black leading-tight text-ink">{t(title)}</h2>
            <p className="mt-1 max-w-4xl text-base font-semibold leading-snug text-ink/68 sm:text-lg lg:mt-2 lg:text-xl">
              {t(description)}
            </p>
          </div>
          <div className="grid shrink-0 grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3 lg:gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-white px-4 text-base font-bold text-ink shadow-kiosk sm:min-h-12 sm:text-lg lg:min-h-14 lg:gap-3 lg:px-6 lg:text-xl"
            >
              <ArrowLeft className="h-6 w-6 lg:h-7 lg:w-7" />
              {t({ vi: "Quay lại", en: "Back" })}
            </button>
            <Link
              href="/"
              className="flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-coral px-4 text-base font-bold text-white shadow-kiosk sm:min-h-12 sm:text-lg lg:min-h-14 lg:gap-3 lg:px-6 lg:text-xl"
            >
              <Home className="h-6 w-6 lg:h-7 lg:w-7" />
              {t({ vi: "Trang chủ", en: "Home" })}
            </Link>
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-auto rounded-[1.25rem] bg-white/78 p-3 shadow-kiosk kiosk-scroll sm:p-4 lg:rounded-[2rem] lg:p-6">
          {children}
        </div>
      </section>
    </main>
  );
}
