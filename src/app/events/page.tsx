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
    name: "Room to Read",
    englishName: "Room to Read",
    url: "https://literacycloud.org/",
    domain: "literacycloud.org",
    logo: "/images/logo-room-to-read.svg",
    logoText: null,
    logoTone: null,
    description: {
      vi: "Thư viện đọc trực tuyến với sách thiếu nhi, tài nguyên đọc và hoạt động phát triển kỹ năng đọc.",
      en: "An online reading library with children's books, reading resources, and literacy activities.",
    },
    tone: "from-[#eef7ff] to-white",
  },
  {
    name: "Xưa & Nay",
    englishName: "Xua & Nay",
    url: "https://xuavanay.ai/e-books",
    domain: "xuavanay.ai",
    logo: "/images/logo-xuavanay.png",
    logoText: null,
    logoTone: null,
    description: {
      vi: "Kho EBook Xưa & Nay giúp truy cập tài liệu đọc và học tập trực tuyến.",
      en: "The Xua & Nay EBook library provides quick access to online reading and learning materials.",
    },
    tone: "from-[#fff2e8] to-white",
  },
  {
    name: "Thư viện Đà Nẵng",
    englishName: "Da Nang Library",
    url: "http://sachdientu.thuvien.danang.gov.vn/",
    domain: "sachdientu.thuvien.danang.gov.vn",
    logo: "/images/logo-thu-vien-da-nang.svg",
    logoText: null,
    logoTone: null,
    description: {
      vi: "Kho sách điện tử của Thư viện Đà Nẵng phục vụ tra cứu, đọc sách và học tập trực tuyến.",
      en: "Da Nang Library's e-book collection for searching, reading, and online learning.",
    },
    tone: "from-[#eef7ff] to-white",
  },
  {
    name: "Thư viện Đại học Đà Nẵng",
    englishName: "University of Da Nang Library",
    url: "https://lrel.ued.udn.vn/",
    domain: "lrel.ued.udn.vn",
    logo: null,
    logoText: "ĐẠI HỌC\nĐÀ NẴNG",
    logoTone: "text-[#073b72]",
    description: {
      vi: "Thư viện tài nguyên học liệu điện tử của Đại học Đà Nẵng phục vụ tra cứu và học tập trực tuyến.",
      en: "The University of Da Nang electronic learning resource library for searching and online study.",
    },
    tone: "from-[#f1f5ff] to-white",
  },
  {
    name: "ThingLink",
    englishName: "ThingLink",
    url: "https://www.thinglink.com/scene/2116798941247832932",
    domain: "thinglink.com",
    logo: null,
    logoText: "THING\nLINK",
    logoTone: "text-[#0f8f6e]",
    description: {
      vi: "Không gian học tập tương tác ThingLink với nội dung số trực quan và dễ khám phá.",
      en: "An interactive ThingLink learning space with visual digital content for exploration.",
    },
    tone: "from-[#edfdf7] to-white",
  },
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
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3 xl:gap-5">
        {digitalLibraries.map((site) => (
          <a
            key={site.domain}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex min-h-[18rem] flex-col justify-between rounded-[1.25rem] bg-gradient-to-br ${site.tone} p-4 shadow-kiosk ring-4 ring-white transition active:scale-[0.98] sm:min-h-[22rem] sm:p-5 xl:min-h-[24rem] xl:rounded-[2rem]`}
          >
            <div>
              <div className="grid h-20 place-items-center overflow-hidden rounded-[1.25rem] bg-white p-3 shadow-kiosk sm:h-28 sm:p-4 xl:h-32">
                {site.logo ? (
                  <Image
                    src={site.logo}
                    alt={`${site.name} logo`}
                    width={360}
                    height={160}
                    className="max-h-14 w-full object-contain sm:max-h-20 xl:max-h-24"
                  />
                ) : (
                  <span
                    className={`whitespace-pre-line text-center text-xl font-black leading-tight sm:text-2xl xl:text-[2rem] ${site.logoTone ?? ""}`}
                  >
                    {site.logoText}
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-start gap-3 sm:mt-5 sm:gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-coral text-white sm:h-12 sm:w-12 xl:h-14 xl:w-14">
                  <Globe2 className="h-6 w-6 sm:h-7 sm:w-7 xl:h-[30px] xl:w-[30px]" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-xl font-black leading-tight text-ink sm:text-2xl xl:text-[1.65rem]">
                    {t({ vi: site.name, en: site.englishName })}
                  </h3>
                  <p className="mt-1 break-words text-base font-black text-coral sm:text-lg xl:text-xl">{site.domain}</p>
                </div>
              </div>

              <p className="mt-4 text-base font-semibold leading-snug text-ink/68 sm:text-lg xl:text-[1.25rem]">
                {t(site.description)}
              </p>
            </div>

            <div className="mt-5 inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-ink px-4 text-base font-black text-white sm:h-14 sm:text-xl xl:mt-6 xl:h-16 xl:px-6 xl:text-2xl">
              {t({ vi: "Mở website", en: "Open website" })}
              <ExternalLink className="h-6 w-6 sm:h-7 sm:w-7 xl:h-[30px] xl:w-[30px]" />
            </div>
          </a>
        ))}
      </div>
    </PageShell>
  );
}
