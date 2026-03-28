import Link from "next/link";

import { Card } from "@/components/ui/Card";
import type { Locale } from "@/i18n";
import type { MatchSummary } from "@/lib/api/types";
import { formatDate } from "@/lib/utils";

export function MatchCard({ locale, match }: { locale: Locale; match: MatchSummary }) {
  return (
    <Card className="flex h-full flex-col justify-between gap-4">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#f4bb41]">{match.competition_name}</p>
        <div className="mt-3 space-y-2 text-lg font-black text-[#f7f0e2]">
          <p>{match.home_team}</p>
          <p className="text-[#b79c62]">vs</p>
          <p>{match.away_team}</p>
        </div>
      </div>
      <div className="space-y-3">
        <p className="text-sm text-[#ccb992]">{formatDate(match.start_time, locale)}</p>
        <Link
          href={`/${locale}/matches/${encodeURIComponent(match.external_match_id)}`}
          className="inline-flex rounded-full bg-[#f4bb41] px-4 py-2 text-sm font-semibold text-[#17120d] transition hover:bg-[#ffd06f]"
        >
          {match.status}
        </Link>
      </div>
    </Card>
  );
}
