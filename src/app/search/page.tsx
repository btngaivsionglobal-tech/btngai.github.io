"use client";

import { ArrowLeft, BookOpen, Headphones, Home, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { type Language, useLanguage } from "@/components/LanguageProvider";
import audiobooks from "@/data/audiobooks.json";
import ebooks from "@/data/ebooks.json";

type Ebook = {
  stt: number | null;
  level: string;
  bookId: string;
  title: string;
  description: string;
  author: string;
  provider: string;
  category: string;
  publisher: string;
};

type LibraryItem = Ebook & {
  format: "ebook" | "audiobook";
};

const libraryItems: LibraryItem[] = [
  ...(ebooks as Ebook[]).map((item) => ({ ...item, format: "ebook" as const })),
  ...(audiobooks as Ebook[]).map((item) => ({
    ...item,
    format: "audiobook" as const,
  })),
];

const MAX_VISIBLE_RESULTS = 80;
type CatalogMode = "ebook" | "audiobook";
type GradeFilter = "all" | "cap1" | "cap2" | "cap3";

const gradeFilters: Array<{
  id: GradeFilter;
  label: { vi: string; en: string };
  needle?: string;
}> = [
  { id: "all", label: { vi: "Tất cả", en: "All" } },
  { id: "cap1", label: { vi: "Cấp 1", en: "Grade 1" }, needle: "cap 1" },
  { id: "cap2", label: { vi: "Cấp 2", en: "Grade 2" }, needle: "cap 2" },
  { id: "cap3", label: { vi: "Cấp 3", en: "Grade 3" }, needle: "cap 3" },
];

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function formatLevel(level: string, language: Language) {
  if (language === "vi") {
    return level;
  }

  return level.replace(/Cấp/g, "Grade");
}

export default function SearchPage() {
  const router = useRouter();
  const { language, t } = useLanguage();
  const [query, setQuery] = useState("");
  const [catalogMode, setCatalogMode] = useState<CatalogMode>("ebook");
  const [gradeFilter, setGradeFilter] = useState<GradeFilter>("all");

  const filteredBooks = useMemo(() => {
    const keyword = normalizeText(query.trim());
    const activeGrade = gradeFilters.find((grade) => grade.id === gradeFilter);
    const modeItems = libraryItems.filter((book) => {
      if (book.format !== catalogMode) {
        return false;
      }

      if (!activeGrade?.needle) {
        return true;
      }

      return normalizeText(book.level).includes(activeGrade.needle);
    });

    if (!keyword) {
      return modeItems;
    }

    return modeItems.filter((book) => {
      const searchableText = normalizeText(
        [
          book.title,
          book.author,
          book.category,
          book.publisher,
          book.provider,
          book.level,
          book.bookId,
          book.format,
        ].join(" "),
      );

      return searchableText.includes(keyword);
    });
  }, [catalogMode, gradeFilter, query]);

  const visibleBooks = filteredBooks.slice(0, MAX_VISIBLE_RESULTS);

  return (
    <main className="flex h-[100dvh] flex-col overflow-hidden">
      <Header />

      <section className="flex min-h-0 flex-1 flex-col px-3 pb-3 sm:px-5 sm:pb-4 lg:px-8 xl:px-12">
        <div className="mb-3 flex shrink-0 flex-col gap-3 md:flex-row md:items-center md:justify-between lg:mb-4">
          <div className="min-w-0">
            <h2 className="text-[clamp(1.75rem,5vw,3.15rem)] font-black leading-tight text-ink">
              {t({ vi: "Tra cứu tài liệu", en: "Catalog search" })}
            </h2>
            <p className="mt-1 hidden max-w-5xl text-base font-bold leading-snug text-ink/68 md:block lg:text-xl">
              {t({
                vi: "Tra cứu danh mục EBook và AudioBook theo tên sách, tác giả, thể loại hoặc nhà xuất bản.",
                en: "Search EBooks and AudioBooks by title, author, category, or publisher.",
              })}
            </p>
          </div>
          <div className="grid shrink-0 grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3 lg:gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-white px-4 text-base font-bold text-ink shadow-kiosk active:scale-[0.98] sm:min-h-12 sm:text-lg lg:min-h-14 lg:px-6 lg:text-xl"
            >
              <ArrowLeft className="h-6 w-6 lg:h-7 lg:w-7" />
              {t({ vi: "Quay lại", en: "Back" })}
            </button>
            <Link
              href="/"
              className="flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-coral px-4 text-base font-bold text-white shadow-kiosk active:scale-[0.98] sm:min-h-12 sm:text-lg lg:min-h-14 lg:px-6 lg:text-xl"
            >
              <Home className="h-6 w-6 lg:h-7 lg:w-7" />
              {t({ vi: "Trang chủ", en: "Home" })}
            </Link>
          </div>
        </div>

        <div className="shrink-0 rounded-[1.25rem] bg-white/92 p-3 shadow-kiosk ring-4 ring-white/70 backdrop-blur sm:p-4 lg:rounded-[2rem]">
          <label className="relative block">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-coral sm:left-6 sm:h-7 sm:w-7 lg:left-8 lg:h-8 lg:w-8"
            />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="h-12 w-full rounded-2xl border-4 border-coral/20 bg-white pl-12 pr-3 text-base font-bold text-ink outline-none ring-0 placeholder:text-ink/34 focus:border-coral sm:h-14 sm:pl-16 sm:pr-5 sm:text-xl lg:h-16 lg:pl-20 lg:pr-8 lg:text-2xl"
              placeholder={t({
                vi: "Nhập tên sách, tác giả, thể loại, ebook hoặc audiobook...",
                en: "Enter title, author, category, ebook or audiobook...",
              })}
            />
          </label>

          <div className="mt-2 flex flex-col gap-3 rounded-2xl bg-mist px-3 py-2 sm:mt-3 sm:px-4 sm:py-3 lg:flex-row lg:items-center lg:justify-between lg:px-6">
            <div>
              <p className="text-sm font-black text-ink sm:text-base lg:text-lg">
                {filteredBooks.length.toLocaleString("vi-VN")}{" "}
                {t({ vi: "tài liệu được tìm thấy", en: "items found" })}
              </p>
              <p className="mt-1 hidden text-sm font-bold text-ink/58 sm:block lg:text-base">
                {t({
                  vi: `Hiển thị tối đa ${MAX_VISIBLE_RESULTS} kết quả đầu tiên để kiosk chạy mượt.`,
                  en: `Showing up to the first ${MAX_VISIBLE_RESULTS} results for smooth kiosk performance.`,
                })}
              </p>
            </div>
            <div className="grid shrink-0 grid-cols-2 gap-2 lg:flex lg:gap-4">
              <button
                type="button"
                onClick={() => setCatalogMode("ebook")}
                className={`inline-flex h-10 w-full select-none items-center justify-center whitespace-nowrap rounded-2xl px-3 text-sm font-black leading-none outline-none transition active:scale-[0.98] sm:h-11 sm:text-base lg:h-12 lg:w-52 lg:px-5 lg:text-lg ${
                  catalogMode === "ebook"
                    ? "bg-coral text-white shadow-kiosk"
                    : "bg-white text-ink shadow-kiosk"
                }`}
              >
                <span>{(ebooks as Ebook[]).length.toLocaleString("vi-VN")} EBook</span>
              </button>
              <button
                type="button"
                onClick={() => setCatalogMode("audiobook")}
                className={`inline-flex h-10 w-full select-none items-center justify-center whitespace-nowrap rounded-2xl px-3 text-sm font-black leading-none outline-none transition active:scale-[0.98] sm:h-11 sm:text-base lg:h-12 lg:w-60 lg:px-5 lg:text-lg ${
                  catalogMode === "audiobook"
                    ? "bg-ink text-white shadow-kiosk"
                    : "bg-white text-ink shadow-kiosk"
                }`}
              >
                <span>{(audiobooks as Ebook[]).length.toLocaleString("vi-VN")} AudioBook</span>
              </button>
            </div>
          </div>

          <div className="mt-2 flex flex-col gap-2 sm:mt-3 lg:flex-row lg:items-center lg:justify-between lg:gap-5">
            <p className="text-sm font-black text-ink sm:text-base lg:text-lg">
              {t({ vi: "Lọc theo cấp", en: "Filter by grade" })}
            </p>
            <div className="grid grid-cols-4 gap-2 sm:flex sm:flex-wrap">
              {gradeFilters.map((grade) => (
                <button
                  key={grade.id}
                  type="button"
                  onClick={() => setGradeFilter(grade.id)}
                  className={`inline-flex h-9 min-w-0 select-none items-center justify-center rounded-2xl px-2 text-sm font-black leading-none outline-none transition active:scale-[0.98] sm:h-10 sm:min-w-24 sm:px-4 sm:text-base lg:h-11 lg:min-w-28 lg:px-5 ${
                    gradeFilter === grade.id
                      ? "bg-coral text-white shadow-kiosk"
                      : "bg-mist text-ink"
                  }`}
                >
                  {t(grade.label)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-3 min-h-0 flex-1 overflow-y-auto rounded-[1.25rem] bg-white/50 p-3 shadow-kiosk kiosk-scroll sm:mt-4 sm:p-4 lg:rounded-[2rem] lg:p-6">
          <div className="grid grid-cols-1 gap-3 xl:grid-cols-2 xl:gap-5">
            {visibleBooks.map((book) => (
              <article key={`${book.bookId}-${book.stt}`} className="rounded-3xl bg-white p-4 shadow-kiosk sm:p-5 lg:p-6">
                <div className="flex items-start gap-3 sm:gap-5">
                  <span
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-white sm:h-14 sm:w-14 lg:h-16 lg:w-16 ${
                      book.format === "ebook" ? "bg-coral" : "bg-ink"
                    }`}
                  >
                    {book.format === "ebook" ? (
                      <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 lg:h-[34px] lg:w-[34px]" />
                    ) : (
                      <Headphones className="h-6 w-6 sm:h-8 sm:w-8 lg:h-[34px] lg:w-[34px]" />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-black sm:px-4 sm:py-2 sm:text-base lg:text-lg ${
                          book.format === "ebook"
                            ? "bg-coral text-white"
                            : "bg-ink text-white"
                        }`}
                      >
                        {book.format === "ebook" ? "EBook" : "AudioBook"}
                      </span>
                      {book.level && (
                        <span className="rounded-full bg-coral/12 px-3 py-1.5 text-xs font-black text-coral sm:px-4 sm:py-2 sm:text-base lg:text-lg">
                          {formatLevel(book.level, language)}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-3 text-xl font-black leading-tight text-ink sm:text-2xl lg:mt-4 lg:text-3xl">
                      {book.title}
                    </h3>
                    <p className="mt-2 text-base font-bold text-ink/64 sm:text-xl lg:mt-3 lg:text-2xl">
                      {book.author || t({ vi: "Chưa có tác giả", en: "No author" })}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid gap-2 text-sm font-bold text-ink/68 sm:text-base lg:mt-5 lg:text-xl">
                  {book.category && (
                    <p>
                      <span className="text-ink">{t({ vi: "Thể loại", en: "Category" })}:</span>{" "}
                      {book.category}
                    </p>
                  )}
                  {book.publisher && (
                    <p>
                      <span className="text-ink">{t({ vi: "NXB", en: "Publisher" })}:</span>{" "}
                      {book.publisher}
                    </p>
                  )}
                  {book.provider && (
                    <p>
                      <span className="text-ink">{t({ vi: "Đơn vị cung cấp", en: "Provider" })}:</span>{" "}
                      {book.provider}
                    </p>
                  )}
                </div>

                {book.description && (
                  <p className="mt-4 line-clamp-3 text-sm font-semibold leading-snug text-ink/56 sm:text-base lg:mt-5 lg:text-xl">
                    {book.description}
                  </p>
                )}
              </article>
            ))}
          </div>

          {visibleBooks.length === 0 && (
            <div className="rounded-3xl bg-white p-6 text-center shadow-kiosk sm:p-10">
              <p className="text-2xl font-black text-ink sm:text-3xl">
                {t({ vi: "Không tìm thấy tài liệu phù hợp", en: "No matching item found" })}
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
