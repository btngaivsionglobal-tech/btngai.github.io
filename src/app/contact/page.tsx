"use client";

import { Building2, Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { PageShell } from "@/components/PageShell";

const contactInfo = [
  {
    label: { vi: "Hotline bảo hành", en: "Warranty hotline" },
    value: { vi: "028 37150256", en: "028 37150256" },
    icon: Phone,
    highlight: true,
  },
  {
    label: { vi: "Email hỗ trợ", en: "Support email" },
    value: { vi: "cs@vsionglobal.com", en: "cs@vsionglobal.com" },
    icon: Mail,
  },
  {
    label: { vi: "Địa chỉ", en: "Address" },
    value: {
      vi: "80/129 Hoàng Hoa Thám, P.7, Q. Bình Thạnh, TP. Hồ Chí Minh.",
      en: "80/129 Hoang Hoa Tham Street, Ward 7, Binh Thanh District, Ho Chi Minh City.",
    },
    icon: MapPin,
  },
];

const serviceCenters = [
  {
    region: { vi: "Miền Bắc", en: "Northern region" },
    name: {
      vi: "Chi nhánh Công ty Cổ phần TM DV Vương Đất Kỹ Thuật Số",
      en: "Vuong Dat Digital Trading Service JSC Branch",
    },
    address: {
      vi: "60 Trần Quang Diệu, Đống Đa, Hà Nội",
      en: "60 Tran Quang Dieu Street, Dong Da District, Hanoi",
    },
    phone: "04 3563 9405",
    fax: "04 3563 9406",
  },
  {
    region: { vi: "Miền Trung", en: "Central region" },
    name: {
      vi: "Chi nhánh Công ty Cổ phần Mạng Trực Tuyến Việt Sin",
      en: "Viet Sin Online Network JSC Branch",
    },
    address: {
      vi: "123 Nguyễn Chí Thanh, Quận Hải Châu, TP. Đà Nẵng",
      en: "123 Nguyen Chi Thanh Street, Hai Chau District, Da Nang City",
    },
    phone: "0511 3849 674",
    fax: "0511 3849 675",
  },
  {
    region: { vi: "Miền Nam", en: "Southern region" },
    name: {
      vi: "Công ty Cổ phần Mạng Trực Tuyến Việt Sin",
      en: "Viet Sin Online Network JSC",
    },
    address: {
      vi: "26/9 Xô Viết Nghệ Tĩnh, Phường 26, Quận Bình Thạnh, TP. Hồ Chí Minh",
      en: "26/9 Xo Viet Nghe Tinh Street, Ward 26, Binh Thanh District, Ho Chi Minh City",
    },
    phone: "08 35119242 / 43 / 44",
    fax: "08 35119245",
  },
];

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <PageShell
      title={{
        vi: "Liên hệ hỗ trợ bảo hành - bảo trì",
        en: "Warranty & maintenance support",
      }}
      description={{
        vi: "Thông tin liên hệ Viet Sin Service và các trung tâm bảo hành.",
        en: "Viet Sin Service contact details and warranty centers.",
      }}
    >
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[0.82fr_1.18fr] xl:gap-6">
        <section className="rounded-[1.25rem] bg-white p-3 shadow-kiosk sm:p-4 lg:rounded-[2rem] lg:p-6">
          <div className="flex h-full min-h-[16rem] flex-col justify-between rounded-[1.25rem] border-4 border-coral/18 bg-[#fff8f1] p-4 sm:min-h-[20rem] sm:p-5 lg:min-h-[23rem] lg:p-6">
            <div>
              <p className="text-base font-black uppercase tracking-[0.12em] text-coral sm:text-xl lg:text-2xl lg:tracking-[0.18em]">
                Viet Sin
              </p>
              <h3 className="mt-2 text-3xl font-black leading-none text-graphite sm:text-5xl lg:text-6xl">
                Service
              </h3>
              <p className="mt-3 max-w-md text-lg font-black leading-snug text-coral sm:text-xl lg:mt-5 lg:text-2xl">
                {t({
                  vi: "Hãy gọi cho chúng tôi để được chăm sóc tốt nhất",
                  en: "Call us for the best service care",
                })}
              </p>
            </div>

            <div className="mt-5 flex items-center gap-3 rounded-3xl bg-white p-4 sm:mt-7 sm:gap-4 sm:p-5 lg:mt-8 lg:p-6">
              <Phone className="h-9 w-9 shrink-0 text-coral sm:h-12 sm:w-12 lg:h-[58px] lg:w-[58px]" />
              <div className="min-w-0">
                <p className="text-sm font-black uppercase tracking-[0.12em] text-ink/48 sm:text-base lg:text-xl lg:tracking-[0.14em]">
                  {t({ vi: "Tổng đài", en: "Hotline" })}
                </p>
                <p className="text-2xl font-black text-red-600 sm:text-4xl lg:text-5xl">028 37150256</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-3 sm:gap-4">
          {contactInfo.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.label.vi} className="rounded-3xl bg-mist p-4 sm:p-5 lg:p-6">
                <div className="flex items-center gap-3 sm:gap-4 lg:gap-5">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-coral text-white sm:h-14 sm:w-14 lg:h-16 lg:w-16">
                    <Icon className="h-7 w-7 sm:h-8 sm:w-8 lg:h-[34px] lg:w-[34px]" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-black uppercase tracking-[0.1em] text-ink/48 sm:text-base lg:text-xl lg:tracking-[0.12em]">
                      {t(item.label)}
                    </p>
                    <h3
                      className={`mt-2 font-black leading-tight ${
                        item.highlight ? "text-2xl text-red-600 sm:text-4xl lg:text-6xl" : "break-words text-xl text-ink sm:text-2xl lg:text-4xl"
                      }`}
                    >
                      {t(item.value)}
                    </h3>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </div>

      <section className="mt-4 rounded-[1.25rem] bg-white p-3 shadow-kiosk sm:mt-5 sm:p-4 lg:rounded-[2rem] lg:p-6">
        <div className="mb-4 flex items-center gap-3 sm:gap-4 lg:mb-5">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-coral text-white sm:h-14 sm:w-14 lg:h-16 lg:w-16">
            <Building2 className="h-7 w-7 sm:h-8 sm:w-8 lg:h-[34px] lg:w-[34px]" />
          </span>
          <h3 className="text-xl font-black text-ink sm:text-3xl lg:text-4xl">
            {t({ vi: "Các trung tâm bảo hành", en: "Warranty centers" })}
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 lg:gap-4">
          {serviceCenters.map((center) => (
            <article key={center.region.vi} className="rounded-3xl bg-mist p-4 sm:p-5">
              <p className="w-fit rounded-full bg-coral px-4 py-2 text-base font-black text-white sm:text-lg">
                {t(center.region)}
              </p>
              <h4 className="mt-4 text-lg font-black leading-tight text-ink sm:text-xl lg:text-2xl">
                {t(center.name)}
              </h4>
              <p className="mt-3 text-base font-bold leading-snug text-ink/70 sm:text-lg">
                {t(center.address)}
              </p>
              <p className="mt-3 text-base font-black text-ink sm:text-lg">
                Tel: {center.phone}
              </p>
              <p className="mt-1 text-base font-bold text-ink/64 sm:text-lg">
                Fax: {center.fax}
              </p>
              <p className="mt-1 break-words text-sm font-bold text-coral sm:text-base">
                chamsockhachhang@vsionglobal.com
              </p>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
