"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { Locale } from "@/i18n";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  const switchLocale = (nextLocale: Locale) => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) {
      return `/${nextLocale}`;
    }
    segments[0] = nextLocale;
    return `/${segments.join("/")}`;
  };

  return (
    <div className="inline-flex rounded-full border border-[#4d3a1a] bg-[#17120d] p-1 shadow-card backdrop-blur">
      {(["en", "ar"] as const).map((item) => {
        const active = item === locale;
        return (
          <Link
            key={item}
            href={switchLocale(item)}
            className={`rounded-full px-3 py-2 text-sm font-semibold transition ${
              active ? "bg-[#f4bb41] text-[#17120d]" : "text-[#efe5d3] hover:bg-[#2a2117]"
            }`}
            data-disable-global-redirect
          >
            {item.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
