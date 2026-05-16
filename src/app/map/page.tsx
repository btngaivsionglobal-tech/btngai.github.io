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
      <div className="grid grid-cols-[1.05fr_0.95fr] gap-8">
        <div className="grid h-[35rem] grid-cols-3 grid-rows-3 gap-5 rounded-[2rem] bg-[#edf7f2] p-6">
          <div className="col-span-2 rounded-3xl bg-teal p-7 text-white">
            <p className="text-2xl font-bold opacity-80">{t({ vi: "Tầng 1", en: "Floor 1" })}</p>
            <h3 className="mt-3 text-4xl font-black">{t({ vi: "Khu đọc mở", en: "Open reading" })}</h3>
          </div>
          <div className="rounded-3xl bg-coral p-7 text-white">
            <p className="text-2xl font-bold opacity-80">{t({ vi: "Tầng 1", en: "Floor 1" })}</p>
            <h3 className="mt-3 text-4xl font-black">{t({ vi: "Quầy mượn trả", en: "Borrow & return" })}</h3>
          </div>
          <div className="rounded-3xl bg-amber p-7 text-ink">
            <p className="text-2xl font-bold opacity-70">{t({ vi: "Tầng 1", en: "Floor 1" })}</p>
            <h3 className="mt-3 text-4xl font-black">{t({ vi: "Hỗ trợ", en: "Support" })}</h3>
          </div>
          <div className="col-span-2 rounded-3xl bg-leaf p-7 text-white">
            <p className="text-2xl font-bold opacity-80">{t({ vi: "Tầng 2", en: "Floor 2" })}</p>
            <h3 className="mt-3 text-4xl font-black">{t({ vi: "Khu sách chuyên ngành", en: "Subject collections" })}</h3>
          </div>
          <div className="rounded-3xl bg-sky-500 p-7 text-white">
            <p className="text-2xl font-bold opacity-80">{t({ vi: "Tầng 2", en: "Floor 2" })}</p>
            <h3 className="mt-3 text-4xl font-black">{t({ vi: "Máy tính", en: "Computers" })}</h3>
          </div>
          <div className="rounded-3xl bg-rose-500 p-7 text-white">
            <p className="text-2xl font-bold opacity-80">{t({ vi: "Tầng 2", en: "Floor 2" })}</p>
            <h3 className="mt-3 text-4xl font-black">{t({ vi: "Học nhóm", en: "Group study" })}</h3>
          </div>
          <div className="rounded-3xl border-4 border-dashed border-ink/20 p-7 text-ink">
            <p className="text-2xl font-bold opacity-70">{t({ vi: "Lối vào", en: "Entrance" })}</p>
            <h3 className="mt-3 text-4xl font-black">{t({ vi: "Sảnh chính", en: "Main hall" })}</h3>
          </div>
        </div>

        <div className="grid gap-4">
          {floorZones.map((zone) => {
            const Icon = zone.icon;
            return (
              <div
                key={`${zone.floor}-${zone.name}`}
                className="flex items-center gap-5 rounded-3xl bg-mist p-6"
              >
                <span className={`grid h-16 w-16 place-items-center rounded-2xl ${zone.color} text-white`}>
                  <Icon size={34} />
                </span>
                <div>
                  <p className="text-xl font-black uppercase tracking-[0.14em] text-ink/48">
                    {t(zone.floor)}
                  </p>
                  <h3 className="text-3xl font-black text-ink">{t(zone.name)}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PageShell>
  );
}
