"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { PageShell } from "@/components/PageShell";
import { services } from "@/data/kiosk";

export default function ServicesPage() {
  const { t } = useLanguage();

  return (
    <PageShell
      title={{ vi: "Dịch vụ thư viện", en: "Library services" }}
      description={{
        vi: "Các dịch vụ thường dùng cho bạn đọc, sinh viên và giảng viên.",
        en: "Common services for readers, students, and faculty.",
      }}
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <article key={service.title.vi} className="rounded-3xl bg-mist p-5 sm:p-8">
              <div className="flex items-center gap-4 sm:gap-5">
                <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-coral text-white sm:h-20 sm:w-20">
                  <Icon className="h-8 w-8 sm:h-[42px] sm:w-[42px]" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-2xl font-black text-ink sm:text-3xl xl:text-4xl">{t(service.title)}</h3>
                  <p className="mt-2 text-lg font-black text-coral sm:text-2xl">{t(service.meta)}</p>
                </div>
              </div>
              <p className="mt-5 text-xl font-semibold leading-snug text-ink/70 sm:mt-6 sm:text-2xl xl:text-3xl">
                {t(service.description)}
              </p>
            </article>
          );
        })}
      </div>
    </PageShell>
  );
}
