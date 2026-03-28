import Link from "next/link";

import { siteConfig } from "@/config/site";
import type { Locale, Messages } from "@/i18n";

export function TopSocialBar({ locale, messages }: { locale: Locale; messages: Messages }) {
  return (
    <div className="border-b border-[#3a2b14] bg-[#0d0d0d] text-[#f5efe3]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-sm sm:px-6 lg:px-8">
        <span className="font-semibold uppercase tracking-[0.2em] text-[#f4bb41]">{messages.socialFollow}</span>
        <div className="flex flex-wrap items-center gap-3">
          {siteConfig.socialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[#4b3818] px-3 py-1 text-xs font-semibold text-[#f5efe3] transition hover:border-[#f4bb41] hover:text-[#f4bb41]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
