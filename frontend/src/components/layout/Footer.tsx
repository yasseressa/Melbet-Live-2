import Link from "next/link";

import type { Locale, Messages } from "@/i18n";

export function Footer({ locale, messages }: { locale: Locale; messages: Messages }) {
  return (
    <footer className="mt-auto border-t border-[#3a2b14] bg-[#0b0b0b] text-[#f5efe3]">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-bold">
            <span className="text-white">Mel</span>
            <span className="text-[#f4bb41]">Bet</span>
            <span className="text-white">-Live</span>
          </p>
          <p className="text-sm text-[#c4b18a]">{messages.sportsNews}</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <Link href={`/${locale}`} className="transition hover:text-[#f4bb41]" data-disable-global-redirect>{messages.home}</Link>
          <Link href={`/${locale}/admin/login`} className="transition hover:text-[#f4bb41]" data-disable-global-redirect>{messages.admin}</Link>
        </div>
      </div>
    </footer>
  );
}
