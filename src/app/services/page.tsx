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
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-5">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <article key={service.title.vi} className="rounded-3xl bg-mist p-4 sm:p-5 lg:p-6">
              <div className="flex items-center gap-3 sm:gap-4 lg:gap-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-coral text-white sm:h-16 sm:w-16 lg:h-20 lg:w-20">
                  <Icon className="h-7 w-7 sm:h-8 sm:w-8 lg:h-[42px] lg:w-[42px]" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-xl font-black text-ink sm:text-2xl xl:text-4xl">{t(service.title)}</h3>
                  <p className="mt-1 text-base font-black text-coral sm:text-xl lg:text-2xl">{t(service.meta)}</p>
                </div>
              </div>
              <p className="mt-4 text-base font-semibold leading-snug text-ink/70 sm:text-xl xl:text-2xl">
                {t(service.description)}
              </p>
            </article>
          );
        })}
      </div>
    </PageShell>
  );
}
