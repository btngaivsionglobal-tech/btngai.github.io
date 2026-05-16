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
      <div className="grid grid-cols-2 gap-6">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <article key={service.title.vi} className="rounded-3xl bg-mist p-8">
              <div className="flex items-center gap-5">
                <span className="grid h-20 w-20 place-items-center rounded-2xl bg-coral text-white">
                  <Icon size={42} />
                </span>
                <div>
                  <h3 className="text-4xl font-black text-ink">{t(service.title)}</h3>
                  <p className="mt-2 text-2xl font-black text-coral">{t(service.meta)}</p>
                </div>
              </div>
              <p className="mt-6 text-3xl font-semibold leading-snug text-ink/70">
                {t(service.description)}
              </p>
            </article>
          );
        })}
      </div>
    </PageShell>
  );
}
