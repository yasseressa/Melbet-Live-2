import Link from "next/link";

import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import type { Locale, Messages } from "@/i18n";

export function Header({ locale, messages }: { locale: Locale; messages: Messages }) {
  return (
    <header className="sticky top-0 z-20 border-b border-[#3a2b14] bg-[rgba(11,11,11,0.92)] backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="min-w-0">
          <Link href={`/${locale}`} className="block text-[1.9rem] font-black leading-none tracking-[0.08em] sm:text-[2.5rem]" data-disable-global-redirect>
            <span className="text-white">Mel</span>
            <span className="text-[#f4bb41]">Bet</span>
            <span className="text-white">-Live</span>
          </Link>
        </div>
        <nav className="hidden items-center gap-6 md:flex">
          <Link href={`/${locale}`} className="text-sm font-semibold text-[#efe5d3] transition hover:text-[#f4bb41]" data-disable-global-redirect>
            {messages.home}
          </Link>
          <Link href={`/${locale}#news`} className="text-sm font-semibold text-[#efe5d3] transition hover:text-[#f4bb41]" data-disable-global-redirect>
            {messages.sportsNews}
          </Link>
          <Link href={`/${locale}/admin/login`} className="text-sm font-semibold text-[#efe5d3] transition hover:text-[#f4bb41]" data-disable-global-redirect>
            {messages.admin}
          </Link>
        </nav>
        <LanguageSwitcher locale={locale} />
      </div>
    </header>
  );
}
