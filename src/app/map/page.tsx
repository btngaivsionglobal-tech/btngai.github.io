"use client";

import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";
import { PageShell } from "@/components/PageShell";
import { floorZones } from "@/data/kiosk";

export default function MapPage() {
  const { t } = useLanguage();

  return (
    <PageShell
      title={{ vi: "Sơ đồ thư viện", en: "Library map" }}
      description={{
        vi: "Chọn khu vực cần đến để nhận biết tầng và vị trí tổng quan.",
        en: "Choose an area to identify its floor and general location.",
      }}
    >
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.35fr_0.65fr] xl:gap-8">
        <div className="rounded-[1.5rem] bg-white p-3 shadow-kiosk ring-4 ring-white sm:p-4 lg:rounded-[2rem]">
          <div className="relative aspect-[2048/1024] w-full overflow-hidden rounded-[1.15rem] bg-mist lg:rounded-[1.5rem]">
            <Image
              src="/images/library-map-hoakhanh.jpg"
              alt={t({ vi: "Sơ đồ thư viện số Hòa Khánh tầng 1 và tầng 2", en: "Hoa Khanh digital library floor plans for floors 1 and 2" })}
              fill
              priority
              sizes="(min-width: 1280px) 65vw, 100vw"
              className="object-contain"
            />
          </div>
        </div>

        <div className="grid gap-4">
          {floorZones.map((zone) => {
            const Icon = zone.icon;
            return (
              <div
                key={`${zone.floor}-${zone.name}`}
                className="flex items-center gap-4 rounded-3xl bg-mist p-5 sm:gap-5 sm:p-6"
              >
                <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl sm:h-16 sm:w-16 ${zone.color} text-white`}>
                  <Icon className="h-8 w-8 sm:h-[34px] sm:w-[34px]" />
                </span>
                <div className="min-w-0">
                  <p className="text-base font-black uppercase tracking-[0.12em] text-ink/48 sm:text-xl sm:tracking-[0.14em]">
                    {t(zone.floor)}
                  </p>
                  <h3 className="text-2xl font-black text-ink sm:text-3xl">{t(zone.name)}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PageShell>
  );
}
