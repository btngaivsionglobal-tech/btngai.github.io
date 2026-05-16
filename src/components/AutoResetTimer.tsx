"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

const RESET_SECONDS = 60;
const WARNING_SECONDS = 10;

export function AutoResetTimer() {
  const router = useRouter();
  const pathname = usePathname();
  const { language } = useLanguage();
  const [remaining, setRemaining] = useState(RESET_SECONDS);
  const lastActivityRef = useRef<number>(Date.now());
  const pathnameRef = useRef(pathname);

  useEffect(() => {
    pathnameRef.current = pathname;
    lastActivityRef.current = Date.now();
    setRemaining(RESET_SECONDS);
  }, [pathname]);

  const markActivity = useCallback(() => {
    lastActivityRef.current = Date.now();
    setRemaining(RESET_SECONDS);
  }, []);

  useEffect(() => {
    const events: Array<keyof WindowEventMap> = [
      "click",
      "touchstart",
      "mousemove",
      "keydown",
    ];

    events.forEach((eventName) => {
      window.addEventListener(eventName, markActivity, { passive: true });
    });

    const interval = window.setInterval(() => {
      const elapsed = Math.floor((Date.now() - lastActivityRef.current) / 1000);
      const nextRemaining = Math.max(RESET_SECONDS - elapsed, 0);
      setRemaining(nextRemaining);

      if (nextRemaining <= 0) {
        lastActivityRef.current = Date.now();
        setRemaining(RESET_SECONDS);
        if (pathnameRef.current !== "/") {
          router.push("/");
        }
      }
    }, 1_000);

    return () => {
      events.forEach((eventName) => {
        window.removeEventListener(eventName, markActivity);
      });
      window.clearInterval(interval);
    };
  }, [markActivity, router]);

  if (remaining > WARNING_SECONDS || pathname === "/") {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 rounded-full bg-ink px-6 py-4 text-xl font-bold text-white shadow-kiosk">
      {language === "vi"
        ? `Tự quay về trang chủ sau ${remaining}s`
        : `Returning home in ${remaining}s`}
    </div>
  );
}
