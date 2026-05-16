"use client";

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
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.05fr_0.95fr] xl:gap-8">
        <div className="grid min-h-[30rem] grid-cols-1 gap-4 rounded-[1.5rem] bg-[#edf7f2] p-4 sm:grid-cols-3 sm:grid-rows-3 sm:gap-5 sm:p-6 lg:h-[35rem] lg:rounded-[2rem]">
          <div className="rounded-3xl bg-teal p-5 text-white sm:col-span-2 lg:p-7">
            <p className="text-xl font-bold opacity-80 sm:text-2xl">{t({ vi: "Tầng 1", en: "Floor 1" })}</p>
            <h3 className="mt-3 text-2xl font-black sm:text-3xl lg:text-4xl">{t({ vi: "Khu đọc mở", en: "Open reading" })}</h3>
          </div>
          <div className="rounded-3xl bg-coral p-5 text-white lg:p-7">
            <p className="text-xl font-bold opacity-80 sm:text-2xl">{t({ vi: "Tầng 1", en: "Floor 1" })}</p>
            <h3 className="mt-3 text-2xl font-black sm:text-3xl lg:text-4xl">{t({ vi: "Quầy mượn trả", en: "Borrow & return" })}</h3>
          </div>
          <div className="rounded-3xl bg-amber p-5 text-ink lg:p-7">
            <p className="text-xl font-bold opacity-70 sm:text-2xl">{t({ vi: "Tầng 1", en: "Floor 1" })}</p>
            <h3 className="mt-3 text-2xl font-black sm:text-3xl lg:text-4xl">{t({ vi: "Hỗ trợ", en: "Support" })}</h3>
          </div>
          <div className="rounded-3xl bg-leaf p-5 text-white sm:col-span-2 lg:p-7">
            <p className="text-xl font-bold opacity-80 sm:text-2xl">{t({ vi: "Tầng 2", en: "Floor 2" })}</p>
            <h3 className="mt-3 text-2xl font-black sm:text-3xl lg:text-4xl">{t({ vi: "Khu sách chuyên ngành", en: "Subject collections" })}</h3>
          </div>
          <div className="rounded-3xl bg-sky-500 p-5 text-white lg:p-7">
            <p className="text-xl font-bold opacity-80 sm:text-2xl">{t({ vi: "Tầng 2", en: "Floor 2" })}</p>
            <h3 className="mt-3 text-2xl font-black sm:text-3xl lg:text-4xl">{t({ vi: "Máy tính", en: "Computers" })}</h3>
          </div>
          <div className="rounded-3xl bg-rose-500 p-5 text-white lg:p-7">
            <p className="text-xl font-bold opacity-80 sm:text-2xl">{t({ vi: "Tầng 2", en: "Floor 2" })}</p>
            <h3 className="mt-3 text-2xl font-black sm:text-3xl lg:text-4xl">{t({ vi: "Học nhóm", en: "Group study" })}</h3>
          </div>
          <div className="rounded-3xl border-4 border-dashed border-ink/20 p-5 text-ink lg:p-7">
            <p className="text-xl font-bold opacity-70 sm:text-2xl">{t({ vi: "Lối vào", en: "Entrance" })}</p>
            <h3 className="mt-3 text-2xl font-black sm:text-3xl lg:text-4xl">{t({ vi: "Sảnh chính", en: "Main hall" })}</h3>
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
