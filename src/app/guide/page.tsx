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
      <ol className="grid gap-3 sm:gap-4 lg:gap-5">
        {guideSteps.map((step, index) => (
          <li key={step.vi} className="flex items-start gap-3 rounded-3xl bg-mist p-4 sm:items-center sm:gap-5 sm:p-5 lg:gap-6 lg:p-6">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-coral text-xl font-black text-white sm:h-16 sm:w-16 sm:text-3xl lg:h-20 lg:w-20 lg:text-4xl">
              {index + 1}
            </span>
            <p className="text-lg font-bold leading-snug text-ink sm:text-2xl lg:text-3xl">{t(step)}</p>
            <CheckCircle2 className="ml-auto hidden shrink-0 text-coral sm:block lg:h-[46px] lg:w-[46px]" size={36} />
          </li>
        ))}
      </ol>
    </PageShell>
  );
}
