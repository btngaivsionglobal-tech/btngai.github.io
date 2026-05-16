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
          <div className="relative aspect-[1800/1312] w-full overflow-hidden rounded-[1.15rem] bg-mist lg:rounded-[1.5rem]">
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
                className="flex min-h-28 items-center gap-4 rounded-3xl bg-mist p-5 sm:gap-5 sm:p-6"
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
        </aside>
      </div>
    </PageShell>
  );
}
