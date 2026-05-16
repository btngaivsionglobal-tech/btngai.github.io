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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
        {digitalLibraries.map((site) => (
          <a
            key={site.domain}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex min-h-[24rem] flex-col justify-between rounded-[1.5rem] bg-gradient-to-br ${site.tone} p-5 shadow-kiosk ring-4 ring-white transition active:scale-[0.98] sm:min-h-[28rem] sm:p-6 xl:min-h-[30rem] xl:rounded-[2rem]`}
          >
            <div>
              <div className="grid h-28 place-items-center overflow-hidden rounded-[1.5rem] bg-white p-4 shadow-kiosk sm:h-36 sm:p-5">
                {site.logo ? (
                  <Image
                    src={site.logo}
                    alt={`${site.name} logo`}
                    width={360}
                    height={160}
                    className="max-h-20 w-full object-contain sm:max-h-28"
                  />
                ) : (
                  <span
                    className={`whitespace-pre-line text-center text-2xl font-black leading-tight sm:text-[2rem] ${site.logoTone ?? ""}`}
                  >
                    {site.logoText}
                  </span>
                )}
              </div>

              <div className="mt-5 flex items-start gap-4 sm:mt-6">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-coral text-white sm:h-14 sm:w-14">
                  <Globe2 className="h-7 w-7 sm:h-[30px] sm:w-[30px]" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-2xl font-black leading-tight text-ink sm:text-[1.65rem]">
                    {t({ vi: site.name, en: site.englishName })}
                  </h3>
                  <p className="mt-2 break-words text-lg font-black text-coral sm:text-xl">{site.domain}</p>
                </div>
              </div>

              <p className="mt-5 text-lg font-semibold leading-snug text-ink/68 sm:text-[1.35rem]">
                {t(site.description)}
              </p>
            </div>

            <div className="mt-6 inline-flex h-14 items-center justify-center gap-3 rounded-2xl bg-ink px-5 text-lg font-black text-white sm:mt-8 sm:h-16 sm:px-6 sm:text-2xl">
              {t({ vi: "Mở website", en: "Open website" })}
              <ExternalLink className="h-7 w-7 sm:h-[30px] sm:w-[30px]" />
            </div>
          </a>
        ))}
      </div>
    </PageShell>
  );
}
