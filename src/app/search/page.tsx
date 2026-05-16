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
        <div className="sticky -top-8 z-30 -mx-8 grid gap-4 border-b-4 border-white bg-white px-8 pb-4 pt-8 shadow-kiosk">
          <label className="relative block">
            <Search
              className="pointer-events-none absolute left-8 top-1/2 -translate-y-1/2 text-coral"
              size={36}
            />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="h-18 w-full rounded-2xl border-4 border-coral/20 bg-white pl-20 pr-8 text-3xl font-bold text-ink outline-none ring-0 placeholder:text-ink/34 focus:border-coral"
              placeholder={t({
                vi: "Nhập tên sách, tác giả, thể loại, ebook hoặc audiobook...",
                en: "Enter title, author, category, ebook or audiobook...",
              })}
            />
          </label>

          <div className="flex items-center justify-between rounded-2xl bg-mist px-6 py-4">
            <div>
              <p className="text-xl font-black text-ink">
                {filteredBooks.length.toLocaleString("vi-VN")}{" "}
                {t({ vi: "tài liệu được tìm thấy", en: "items found" })}
              </p>
              <p className="mt-1 text-lg font-bold text-ink/58">
                {t({
                  vi: `Hiển thị tối đa ${MAX_VISIBLE_RESULTS} kết quả đầu tiên để kiosk chạy mượt.`,
                  en: `Showing up to the first ${MAX_VISIBLE_RESULTS} results for smooth kiosk performance.`,
                })}
              </p>
            </div>
            <div className="flex shrink-0 gap-4">
              <button
                type="button"
                onClick={() => setCatalogMode("ebook")}
                className={`inline-flex h-14 w-52 select-none items-center justify-center whitespace-nowrap rounded-2xl px-5 text-xl font-black leading-none outline-none transition active:scale-[0.98] ${
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
                className={`inline-flex h-14 w-60 select-none items-center justify-center whitespace-nowrap rounded-2xl px-5 text-xl font-black leading-none outline-none transition active:scale-[0.98] ${
                  catalogMode === "audiobook"
                    ? "bg-ink text-white shadow-kiosk"
                    : "bg-white text-ink shadow-kiosk"
                }`}
              >
                <span>{(audiobooks as Ebook[]).length.toLocaleString("vi-VN")} AudioBook</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-5">
            <p className="text-xl font-black text-ink">
              {t({ vi: "Lọc theo cấp", en: "Filter by grade" })}
            </p>
            <div className="flex gap-3">
              {gradeFilters.map((grade) => (
                <button
                  key={grade.id}
                  type="button"
                  onClick={() => setGradeFilter(grade.id)}
                  className={`inline-flex h-12 min-w-28 select-none items-center justify-center rounded-2xl px-5 text-lg font-black leading-none outline-none transition active:scale-[0.98] ${
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

        <div className="grid grid-cols-2 gap-5">
          {visibleBooks.map((book) => (
            <article key={`${book.bookId}-${book.stt}`} className="rounded-3xl bg-white p-6 shadow-kiosk">
              <div className="flex items-start gap-5">
                <span
                  className={`grid h-16 w-16 shrink-0 place-items-center rounded-2xl text-white ${
                    book.format === "ebook" ? "bg-coral" : "bg-ink"
                  }`}
                >
                  {book.format === "ebook" ? (
                    <BookOpen size={34} />
                  ) : (
                    <Headphones size={34} />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`rounded-full px-4 py-2 text-lg font-black ${
                        book.format === "ebook"
                          ? "bg-coral text-white"
                          : "bg-ink text-white"
                      }`}
                    >
                      {book.format === "ebook" ? "EBook" : "AudioBook"}
                    </span>
                    {book.level && (
                      <span className="rounded-full bg-coral/12 px-4 py-2 text-lg font-black text-coral">
                        {formatLevel(book.level, language)}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 text-3xl font-black leading-tight text-ink">
                    {book.title}
                  </h3>
                  <p className="mt-3 text-2xl font-bold text-ink/64">
                    {book.author || t({ vi: "Chưa có tác giả", en: "No author" })}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-2 text-xl font-bold text-ink/68">
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
                <p className="mt-5 line-clamp-3 text-xl font-semibold leading-snug text-ink/56">
                  {book.description}
                </p>
              )}
            </article>
          ))}
        </div>

        {visibleBooks.length === 0 && (
          <div className="rounded-3xl bg-white p-10 text-center shadow-kiosk">
            <p className="text-3xl font-black text-ink">
              {t({ vi: "Không tìm thấy tài liệu phù hợp", en: "No matching item found" })}
            </p>
          </div>
        )}
      </div>
    </PageShell>
  );
}
