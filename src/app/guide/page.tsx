"use client";

import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { PageShell } from "@/components/PageShell";
import { guideSteps } from "@/data/kiosk";

export default function GuidePage() {
  const { t } = useLanguage();

  return (
    <PageShell
      title={{ vi: "Hướng dẫn sử dụng", en: "How to use" }}
      description={{
        vi: "Làm theo các bước ngắn gọn để tìm và mượn tài liệu tại thư viện.",
        en: "Follow these quick steps to find and borrow library materials.",
      }}
    >
      <ol className="grid gap-5">
        {guideSteps.map((step, index) => (
          <li key={step.vi} className="flex items-start gap-4 rounded-3xl bg-mist p-5 sm:items-center sm:gap-6 sm:p-7">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-coral text-2xl font-black text-white sm:h-20 sm:w-20 sm:text-4xl">
              {index + 1}
            </span>
            <p className="text-xl font-bold leading-snug text-ink sm:text-3xl">{t(step)}</p>
            <CheckCircle2 className="ml-auto hidden shrink-0 text-coral sm:block" size={46} />
          </li>
        ))}
      </ol>
    </PageShell>
  );
}
