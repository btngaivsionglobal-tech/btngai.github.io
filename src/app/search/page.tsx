"use client";

import { BookOpen, Headphones, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { type Language, useLanguage } from "@/components/LanguageProvider";
import { PageShell } from "@/components/PageShell";
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
    <PageShell
      title={{ vi: "Tra cứu tài liệu", en: "Catalog search" }}
      description={{
        vi: "Tra cứu danh mục EBook và AudioBook theo tên sách, tác giả, thể loại hoặc nhà xuất bản.",
        en: "Search EBooks and AudioBooks by title, author, category, or publisher.",
      }}
    >
      <div className="grid gap-6">
        <div className="sticky top-0 z-40 -mx-4 grid gap-4 border-b-4 border-white bg-white/96 px-4 pb-4 pt-4 shadow-kiosk backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 lg:pt-8">
          <label className="relative block">
            <Search
              className="pointer-events-none absolute left-5 top-1/2 h-7 w-7 -translate-y-1/2 text-coral sm:left-8 sm:h-9 sm:w-9"
            />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="h-16 w-full rounded-2xl border-4 border-coral/20 bg-white pl-14 pr-4 text-lg font-bold text-ink outline-none ring-0 placeholder:text-ink/34 focus:border-coral sm:h-20 sm:pl-20 sm:pr-8 sm:text-2xl lg:text-3xl"
              placeholder={t({
                vi: "Nhập tên sách, tác giả, thể loại, ebook hoặc audiobook...",
                en: "Enter title, author, category, ebook or audiobook...",
              })}
            />
          </label>

          <div className="flex flex-col gap-4 rounded-2xl bg-mist px-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-6">
            <div>
              <p className="text-lg font-black text-ink sm:text-xl">
                {filteredBooks.length.toLocaleString("vi-VN")}{" "}
                {t({ vi: "tài liệu được tìm thấy", en: "items found" })}
              </p>
              <p className="mt-1 text-base font-bold text-ink/58 sm:text-lg">
                {t({
                  vi: `Hiển thị tối đa ${MAX_VISIBLE_RESULTS} kết quả đầu tiên để kiosk chạy mượt.`,
                  en: `Showing up to the first ${MAX_VISIBLE_RESULTS} results for smooth kiosk performance.`,
                })}
              </p>
            </div>
            <div className="grid shrink-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:gap-4">
              <button
                type="button"
                onClick={() => setCatalogMode("ebook")}
                className={`inline-flex h-12 w-full select-none items-center justify-center whitespace-nowrap rounded-2xl px-4 text-base font-black leading-none outline-none transition active:scale-[0.98] sm:h-14 sm:text-xl lg:w-52 lg:px-5 ${
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
                className={`inline-flex h-12 w-full select-none items-center justify-center whitespace-nowrap rounded-2xl px-4 text-base font-black leading-none outline-none transition active:scale-[0.98] sm:h-14 sm:text-xl lg:w-60 lg:px-5 ${
                  catalogMode === "audiobook"
                    ? "bg-ink text-white shadow-kiosk"
                    : "bg-white text-ink shadow-kiosk"
                }`}
              >
                <span>{(audiobooks as Ebook[]).length.toLocaleString("vi-VN")} AudioBook</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-5">
            <p className="text-lg font-black text-ink sm:text-xl">
              {t({ vi: "Lọc theo cấp", en: "Filter by grade" })}
            </p>
            <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
              {gradeFilters.map((grade) => (
                <button
                  key={grade.id}
                  type="button"
                  onClick={() => setGradeFilter(grade.id)}
                  className={`inline-flex h-11 min-w-0 select-none items-center justify-center rounded-2xl px-4 text-base font-black leading-none outline-none transition active:scale-[0.98] sm:h-12 sm:min-w-28 sm:px-5 sm:text-lg ${
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

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-5">
          {visibleBooks.map((book) => (
            <article key={`${book.bookId}-${book.stt}`} className="rounded-3xl bg-white p-5 shadow-kiosk sm:p-6">
              <div className="flex items-start gap-4 sm:gap-5">
                <span
                  className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white sm:h-16 sm:w-16 ${
                    book.format === "ebook" ? "bg-coral" : "bg-ink"
                  }`}
                >
                  {book.format === "ebook" ? (
                    <BookOpen className="h-7 w-7 sm:h-[34px] sm:w-[34px]" />
                  ) : (
                    <Headphones className="h-7 w-7 sm:h-[34px] sm:w-[34px]" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`rounded-full px-3 py-2 text-sm font-black sm:px-4 sm:text-lg ${
                        book.format === "ebook"
                          ? "bg-coral text-white"
                          : "bg-ink text-white"
                      }`}
                    >
                      {book.format === "ebook" ? "EBook" : "AudioBook"}
                    </span>
                    {book.level && (
                      <span className="rounded-full bg-coral/12 px-3 py-2 text-sm font-black text-coral sm:px-4 sm:text-lg">
                        {formatLevel(book.level, language)}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 text-2xl font-black leading-tight text-ink sm:text-3xl">
                    {book.title}
                  </h3>
                  <p className="mt-3 text-xl font-bold text-ink/64 sm:text-2xl">
                    {book.author || t({ vi: "Chưa có tác giả", en: "No author" })}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-2 text-base font-bold text-ink/68 sm:text-xl">
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
                <p className="mt-5 line-clamp-3 text-base font-semibold leading-snug text-ink/56 sm:text-xl">
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
    </PageShell>
  );
}
