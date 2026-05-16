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
    <main className="flex h-screen flex-col overflow-hidden">
      <Header />
      <section className="flex min-h-0 flex-1 flex-col px-12 pb-10">
        <div className="mb-7 flex items-center justify-between gap-5">
          <div>
            <h2 className="text-6xl font-black leading-tight text-ink">{t(title)}</h2>
            <p className="mt-3 max-w-4xl text-2xl font-medium text-ink/68">
              {t(description)}
            </p>
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex min-h-20 items-center gap-3 rounded-2xl bg-white px-7 text-2xl font-bold text-ink shadow-kiosk"
            >
              <ArrowLeft size={34} />
              {t({ vi: "Quay lại", en: "Back" })}
            </button>
            <Link
              href="/"
              className="flex min-h-20 items-center gap-3 rounded-2xl bg-coral px-7 text-2xl font-bold text-white shadow-kiosk"
            >
              <Home size={34} />
              {t({ vi: "Trang chủ", en: "Home" })}
            </Link>
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-auto rounded-[2rem] bg-white/78 p-8 shadow-kiosk kiosk-scroll">
          {children}
        </div>
      </section>
    </main>
  );
}
