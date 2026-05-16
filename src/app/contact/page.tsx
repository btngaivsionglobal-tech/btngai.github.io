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
      <div className="grid grid-cols-[0.82fr_1.18fr] gap-7">
        <section className="rounded-[2rem] bg-white p-8 shadow-kiosk">
          <div className="flex h-full min-h-[27rem] flex-col justify-between rounded-[1.5rem] border-4 border-coral/18 bg-[#fff8f1] p-8">
            <div>
              <p className="text-2xl font-black uppercase tracking-[0.18em] text-coral">
                Viet Sin
              </p>
              <h3 className="mt-3 text-6xl font-black leading-none text-graphite">
                Service
              </h3>
              <p className="mt-5 max-w-md text-2xl font-black leading-snug text-coral">
                {t({
                  vi: "Hãy gọi cho chúng tôi để được chăm sóc tốt nhất",
                  en: "Call us for the best service care",
                })}
              </p>
            </div>

            <div className="mt-10 flex items-center gap-5 rounded-3xl bg-white p-6">
              <Phone className="text-coral" size={58} />
              <div>
                <p className="text-xl font-black uppercase tracking-[0.14em] text-ink/48">
                  {t({ vi: "Tổng đài", en: "Hotline" })}
                </p>
                <p className="text-5xl font-black text-red-600">028 37150256</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-5">
          {contactInfo.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.label.vi} className="rounded-3xl bg-mist p-7">
                <div className="flex items-center gap-5">
                  <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-coral text-white">
                    <Icon size={34} />
                  </span>
                  <div>
                    <p className="text-xl font-black uppercase tracking-[0.12em] text-ink/48">
                      {t(item.label)}
                    </p>
                    <h3
                      className={`mt-2 font-black leading-tight ${
                        item.highlight ? "text-6xl text-red-600" : "text-4xl text-ink"
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

      <section className="mt-7 rounded-[2rem] bg-white p-8 shadow-kiosk">
        <div className="mb-6 flex items-center gap-4">
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-coral text-white">
            <Building2 size={34} />
          </span>
          <h3 className="text-4xl font-black text-ink">
            {t({ vi: "Các trung tâm bảo hành", en: "Warranty centers" })}
          </h3>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {serviceCenters.map((center) => (
            <article key={center.region.vi} className="rounded-3xl bg-mist p-6">
              <p className="w-fit rounded-full bg-coral px-5 py-2 text-xl font-black text-white">
                {t(center.region)}
              </p>
              <h4 className="mt-5 text-2xl font-black leading-tight text-ink">
                {t(center.name)}
              </h4>
              <p className="mt-4 text-xl font-bold leading-snug text-ink/70">
                {t(center.address)}
              </p>
              <p className="mt-4 text-xl font-black text-ink">
                Tel: {center.phone}
              </p>
              <p className="mt-1 text-xl font-bold text-ink/64">
                Fax: {center.fax}
              </p>
              <p className="mt-1 text-lg font-bold text-coral">
                chamsockhachhang@vsionglobal.com
              </p>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
