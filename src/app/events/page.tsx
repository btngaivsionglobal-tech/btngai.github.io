"use client";

import { ExternalLink, Globe2 } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";
import { PageShell } from "@/components/PageShell";

type DigitalLibrary = {
  name: string;
  englishName: string;
  url: string;
  domain: string;
  logo: string | null;
  logoText: string | null;
  logoTone: string | null;
  description: {
    vi: string;
    en: string;
  };
  tone: string;
};

const digitalLibraries: DigitalLibrary[] = [
  {
    name: "Tủ sách số Waka",
    englishName: "Waka digital bookshelf",
    url: "https://waka.vn/",
    domain: "waka.vn",
    logo: "/images/logo-waka-real.png",
    logoText: null,
    logoTone: null,
    description: {
      vi: "Nền tảng đọc EBook, AudioBook và sách số phổ biến tại Việt Nam.",
      en: "A digital reading platform for EBooks, AudioBooks, and online books in Vietnam.",
    },
    tone: "from-[#eafff7] to-white",
  },
  {
    name: "Reading On Your Head",
    englishName: "Reading On Your Head",
    url: "https://vn.readingonyourhead.com/",
    domain: "vn.readingonyourhead.com",
    logo: "/images/logo-reading-on-your-head-real.png",
    logoText: null,
    logoTone: null,
    description: {
      vi: "Hệ thống đánh giá kỹ năng đọc và phát triển văn hóa đọc cho học sinh.",
      en: "A reading skill assessment and reading culture development system for students.",
    },
    tone: "from-[#f1f5ff] to-white",
  },
  {
    name: "Lumio",
    englishName: "Lumio",
    url: "https://lum.io/",
    domain: "lum.io",
    logo: "/images/logo-lumio-real.png",
    logoText: null,
    logoTone: null,
    description: {
      vi: "Thiết kế hoạt động đọc sách, bài học tương tác và hoạt động lớp học số.",
      en: "Create reading activities, interactive lessons, and digital classroom experiences.",
    },
    tone: "from-[#f8f3ff] to-white",
  },
  {
    name: "Oxford Reading Club",
    englishName: "Oxford Reading Club",
    url: "https://www.oxfordreadingclub.com/",
    domain: "oxfordreadingclub.com",
    logo: null,
    logoText: "OXFORD\nREADING CLUB",
    logoTone: "text-[#073b72]",
    description: {
      vi: "Kho sách đọc phân cấp của Oxford University Press hỗ trợ luyện đọc tiếng Anh.",
      en: "A graded reading library from Oxford University Press for English reading practice.",
    },
    tone: "from-[#eef7ff] to-white",
  },
  {
    name: "Explain Everything",
    englishName: "Explain Everything",
    url: "https://explaineverything.com/",
    domain: "explaineverything.com",
    logo: null,
    logoText: "EXPLAIN\nEVERYTHING",
    logoTone: "text-[#f36f21]",
    description: {
      vi: "Bảng trắng số giúp trình bày, ghi chú, cộng tác và tạo bài học tương tác.",
      en: "A digital whiteboard for presenting, annotating, collaborating, and creating interactive lessons.",
    },
    tone: "from-[#fff2e8] to-white",
  },
  {
    name: "Vebrary",
    englishName: "Vebrary",
    url: "https://thuviensohoakhanh.vebrary.vn/",
    domain: "thuviensohoakhanh.vebrary.vn",
    logo: null,
    logoText: "VEBRARY",
    logoTone: "text-[#0f8f6e]",
    description: {
      vi: "Thư viện số Hòa Khánh với tài nguyên đọc và học tập trực tuyến.",
      en: "Hoa Khanh digital library with online reading and learning resources.",
    },
    tone: "from-[#edfdf7] to-white",
  },
  {
    name: "SpeakingPal",
    englishName: "SpeakingPal",
    url: "https://www.speakingpal.com/",
    domain: "speakingpal.com",
    logo: null,
    logoText: "SPEAKING\nPAL",
    logoTone: "text-[#4d4abf]",
    description: {
      vi: "Ứng dụng luyện nói tiếng Anh với nhận diện giọng nói và phản hồi phát âm.",
      en: "An English speaking practice app with speech recognition and pronunciation feedback.",
    },
    tone: "from-[#f2f1ff] to-white",
  },
];

export default function EventsPage() {
  const { t } = useLanguage();

  return (
    <PageShell
      title={{ vi: "Thư viện số", en: "Digital library" }}
      description={{
        vi: "Truy cập nhanh kho EBook, AudioBook và tài nguyên học tập trực tuyến.",
        en: "Quick access to EBooks, AudioBooks, and online learning resources.",
      }}
    >
      <div className="grid grid-cols-3 gap-6">
        {digitalLibraries.map((site) => (
          <a
            key={site.domain}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex min-h-[30rem] flex-col justify-between rounded-[2rem] bg-gradient-to-br ${site.tone} p-6 shadow-kiosk ring-4 ring-white transition active:scale-[0.98]`}
          >
            <div>
              <div className="grid h-36 place-items-center overflow-hidden rounded-[1.5rem] bg-white p-5 shadow-kiosk">
                {site.logo ? (
                  <Image
                    src={site.logo}
                    alt={`${site.name} logo`}
                    width={360}
                    height={160}
                    className="max-h-28 w-full object-contain"
                  />
                ) : (
                  <span
                    className={`whitespace-pre-line text-center text-[2rem] font-black leading-tight ${site.logoTone ?? ""}`}
                  >
                    {site.logoText}
                  </span>
                )}
              </div>

              <div className="mt-6 flex items-start gap-4">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-coral text-white">
                  <Globe2 size={30} />
                </span>
                <div className="min-w-0">
                  <h3 className="text-[1.65rem] font-black leading-tight text-ink">
                    {t({ vi: site.name, en: site.englishName })}
                  </h3>
                  <p className="mt-2 text-xl font-black text-coral">{site.domain}</p>
                </div>
              </div>

              <p className="mt-5 text-[1.35rem] font-semibold leading-snug text-ink/68">
                {t(site.description)}
              </p>
            </div>

            <div className="mt-8 inline-flex h-16 items-center justify-center gap-3 rounded-2xl bg-ink px-6 text-2xl font-black text-white">
              {t({ vi: "Mở website", en: "Open website" })}
              <ExternalLink size={30} />
            </div>
          </a>
        ))}
      </div>
    </PageShell>
  );
}
