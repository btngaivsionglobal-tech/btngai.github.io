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
          <li key={step.vi} className="flex items-center gap-6 rounded-3xl bg-mist p-7">
            <span className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-coral text-4xl font-black text-white">
              {index + 1}
            </span>
            <p className="text-3xl font-bold leading-snug text-ink">{t(step)}</p>
            <CheckCircle2 className="ml-auto shrink-0 text-coral" size={46} />
          </li>
        ))}
      </ol>
    </PageShell>
  );
}
