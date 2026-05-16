"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { PageShell } from "@/components/PageShell";
import { floorZones } from "@/data/kiosk";

const floorMapImages = [
  {
    id: "floor-1",
    floor: { vi: "Tầng 1", en: "Floor 1" },
    src: "/images/library-map-floor-1.jpg",
    alt: {
      vi: "Sơ đồ tầng 1 thư viện số Hòa Khánh",
      en: "Hoa Khanh digital library floor 1 map",
    },
  },
  {
    id: "floor-2",
    floor: { vi: "Tầng 2", en: "Floor 2" },
    src: "/images/library-map-floor-2.jpg",
    alt: {
      vi: "Sơ đồ tầng 2 thư viện số Hòa Khánh",
      en: "Hoa Khanh digital library floor 2 map",
    },
  },
];

type FloorMap = (typeof floorMapImages)[number];

const zoneIconStyles: Record<string, string> = {
  "bg-coral": "bg-coral shadow-coral/30 ring-coral/20",
  "bg-teal": "bg-teal shadow-teal/30 ring-teal/20",
  "bg-amber": "bg-amber shadow-amber/30 ring-amber/20",
  "bg-leaf": "bg-leaf shadow-leaf/30 ring-leaf/20",
  "bg-sky-500": "bg-sky-500 shadow-sky-500/30 ring-sky-500/20",
  "bg-rose-500": "bg-rose-500 shadow-rose-500/30 ring-rose-500/20",
};

export default function MapPage() {
  const { t } = useLanguage();
  const [activeFloorId, setActiveFloorId] = useState<FloorMap["id"]>("floor-1");

  const activeFloor = useMemo(
    () => floorMapImages.find((floor) => floor.id === activeFloorId) ?? floorMapImages[0],
    [activeFloorId],
  );

  const activeZones = floorZones.filter(
    (zone) => zone.floor.vi === activeFloor.floor.vi,
  );

  return (
    <PageShell
      title={{ vi: "Sơ đồ thư viện", en: "Library map" }}
      description={{
        vi: "Chọn tầng cần đến để xem sơ đồ và các khu vực tương ứng.",
        en: "Choose a floor to view its map and matching areas.",
      }}
    >
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.35fr_0.65fr] xl:gap-8">
        <section className="rounded-[1.5rem] bg-white p-3 shadow-kiosk ring-4 ring-white sm:p-4 lg:rounded-[2rem]">
          <div className="relative aspect-[1800/1440] w-full overflow-hidden rounded-[1.15rem] bg-mist lg:rounded-[1.5rem]">
            <Image
              src={activeFloor.src}
              alt={t(activeFloor.alt)}
              fill
              priority
              quality={100}
              sizes="(min-width: 1280px) 65vw, 100vw"
              className="object-contain"
            />
          </div>
        </section>

        <aside className="grid content-start gap-4">
          <div className="grid grid-cols-2 gap-3 rounded-3xl bg-white p-3 shadow-kiosk">
            {floorMapImages.map((mapImage) => {
              const isActive = mapImage.id === activeFloor.id;

              return (
                <button
                  key={mapImage.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveFloorId(mapImage.id)}
                  className={`flex min-h-20 items-center justify-center rounded-2xl px-4 text-center text-2xl font-black transition sm:text-3xl ${
                    isActive
                      ? "bg-coral text-white shadow-lg shadow-coral/25"
                      : "bg-mist text-ink hover:bg-white"
                  }`}
                >
                  {t(mapImage.floor)}
                </button>
              );
            })}
          </div>

          {activeZones.map((zone) => {
            const Icon = zone.icon;

            return (
              <div
                key={`${zone.floor.vi}-${zone.name.vi}`}
                className="flex min-h-28 items-center gap-4 rounded-3xl bg-white p-5 shadow-kiosk ring-2 ring-white/80 sm:gap-5 sm:p-6"
              >
                <span className={`grid h-16 w-16 shrink-0 place-items-center rounded-2xl text-white shadow-lg ring-4 sm:h-[72px] sm:w-[72px] ${zoneIconStyles[zone.color] ?? zoneIconStyles["bg-coral"]}`}>
                  <Icon className="h-9 w-9 stroke-[2.8] sm:h-10 sm:w-10" />
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
        </aside>
      </div>
    </PageShell>
  );
}
