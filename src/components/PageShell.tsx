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
    <main className="flex min-h-screen flex-col">
      <Header />
      <section className="flex min-h-0 flex-1 flex-col px-4 pb-6 sm:px-6 lg:px-10 xl:px-12 xl:pb-10">
        <div className="mb-5 flex flex-col gap-5 lg:mb-7 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <h2 className="text-[clamp(2.25rem,7vw,3.75rem)] font-black leading-tight text-ink">{t(title)}</h2>
            <p className="mt-3 max-w-4xl text-lg font-medium text-ink/68 sm:text-xl lg:text-2xl">
              {t(description)}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex min-h-14 items-center gap-2 rounded-2xl bg-white px-5 text-lg font-bold text-ink shadow-kiosk sm:min-h-16 sm:text-xl lg:min-h-20 lg:gap-3 lg:px-7 lg:text-2xl"
            >
              <ArrowLeft className="h-7 w-7 lg:h-[34px] lg:w-[34px]" />
              {t({ vi: "Quay lại", en: "Back" })}
            </button>
            <Link
              href="/"
              className="flex min-h-14 items-center gap-2 rounded-2xl bg-coral px-5 text-lg font-bold text-white shadow-kiosk sm:min-h-16 sm:text-xl lg:min-h-20 lg:gap-3 lg:px-7 lg:text-2xl"
            >
              <Home className="h-7 w-7 lg:h-[34px] lg:w-[34px]" />
              {t({ vi: "Trang chủ", en: "Home" })}
            </Link>
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-auto rounded-[1.5rem] bg-white/78 p-4 shadow-kiosk kiosk-scroll sm:p-6 lg:rounded-[2rem] lg:p-8">
          {children}
        </div>
      </section>
    </main>
  );
}
