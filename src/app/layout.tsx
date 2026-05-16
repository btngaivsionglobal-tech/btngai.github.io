import type { Metadata } from "next";
import "./globals.css";
import { AutoResetTimer } from "@/components/AutoResetTimer";
import { LanguageProvider } from "@/components/LanguageProvider";

export const metadata: Metadata = {
  title: "iREAD Library Kiosk",
  description: "Giao diện kiosk cảm ứng iREAD cho thư viện",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <LanguageProvider>
          <AutoResetTimer />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
