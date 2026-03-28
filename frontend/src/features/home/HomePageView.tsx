"use client";

import { useState } from "react";
import Link from "next/link";

import type { Locale, Messages } from "@/i18n";
import type { HomeResponse, MatchSummary, NewsSummary } from "@/lib/api/types";
import { formatDate } from "@/lib/utils";

export function HomePageView({ locale, messages, data }: { locale: Locale; messages: Messages; data: HomeResponse }) {
  const buckets = [
    { id: "today", title: messages.todayMatches, matches: data.today_matches, tone: "border border-[#f4bb41] bg-[#f4bb41] text-[#17120d]" },
    { id: "yesterday", title: messages.yesterdayMatches, matches: data.yesterday_matches, tone: "border border-[#4d3a1a] bg-[#1b1712] text-[#e8dcc3]" },
    { id: "tomorrow", title: messages.tomorrowMatches, matches: data.tomorrow_matches, tone: "border border-[#4d3a1a] bg-[#1b1712] text-[#e8dcc3]" },
  ] as const;
  const [activeBucketId, setActiveBucketId] = useState<(typeof buckets)[number]["id"]>("today");
  const activeBucket = buckets.find((bucket) => bucket.id === activeBucketId) ?? buckets[0];

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[2rem] border border-[#4b3818] bg-[radial-gradient(circle_at_top_left,_rgba(244,187,65,0.2),_transparent_24%),linear-gradient(180deg,_#16110a_0%,_#0b0b0b_100%)] text-[#f5efe3] shadow-[0_30px_80px_rgba(0,0,0,0.48)]">
        <div className="border-b border-[#3a2b14] px-5 py-5 sm:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <div className="space-y-2">
                <h1 className="text-5xl font-black leading-none tracking-[0.06em] sm:text-6xl lg:text-7xl">
                  <span className="text-white">Mel</span>
                  <span className="text-[#f4bb41]">Bet</span>
                  <span className="text-white">-Live</span>
                </h1>
                <p className="max-w-2xl text-sm leading-6 text-[#d8c9ac] sm:text-base">{messages.latestHeadlines}</p>
              </div>
            </div>
            <div className="grid gap-3 text-sm text-[#dcccae] sm:grid-cols-3 lg:min-w-[360px]">
              <StatBox label={messages.todayMatches} value={String(data.today_matches.length)} />
              <StatBox label={messages.yesterdayMatches} value={String(data.yesterday_matches.length)} />
              <StatBox label={messages.tomorrowMatches} value={String(data.tomorrow_matches.length)} />
            </div>
          </div>
        </div>
        <div className="border-t border-[#3a2b14] px-4 py-5 sm:px-6 sm:py-6">
          <div className="rounded-[1.75rem] border border-[#4b3818] bg-[linear-gradient(180deg,_rgba(28,22,16,0.96),_rgba(16,16,16,0.96))] p-4 sm:p-5">
            <div className="flex flex-col gap-4 border-b border-[#3a2b14] pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#f4bb41]">{messages.liveNow}</p>
                <p className="mt-1 text-lg font-black text-[#f5efe3]">{activeBucket.title}</p>
              </div>
              <Link
                href={`/${locale}#news`}
                className="inline-flex rounded-full border border-[#f4bb41] bg-[#f4bb41] px-4 py-2 text-sm font-bold text-[#17120d] transition hover:bg-[#ffd06f]"
                data-disable-global-redirect
              >
                {messages.sportsNews}
              </Link>
            </div>

            <ul className="mt-4 flex flex-wrap gap-3" role="tablist" aria-label="Match day tabs">
              {buckets.map((bucket) => (
                <li key={bucket.id}>
                  <button
                    type="button"
                    id={`matches-tab-${bucket.id}`}
                    role="tab"
                    aria-selected={activeBucket.id === bucket.id}
                    aria-controls={`matches-panel-${bucket.id}`}
                    className={`inline-flex rounded-full px-5 py-2 text-sm font-bold transition hover:translate-y-[-1px] ${
                      activeBucket.id === bucket.id ? "border border-[#f4bb41] bg-[#f4bb41] text-[#17120d]" : bucket.tone
                    }`}
                    onClick={() => setActiveBucketId(bucket.id)}
                  >
                    {bucket.title}
                  </button>
                </li>
              ))}
            </ul>

            <div
              id={`matches-panel-${activeBucket.id}`}
              role="tabpanel"
              aria-labelledby={`matches-tab-${activeBucket.id}`}
              aria-live="polite"
              data-active-bucket={activeBucket.id}
              className="mt-5"
            >
              {activeBucket.matches.length === 0 ? (
                <DarkEmptyState message={messages.empty} />
              ) : (
                <div className="space-y-4">
                  {activeBucket.matches.map((match) => (
                    <MatchBoardRow key={match.external_match_id} locale={locale} match={match} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="news" className="rounded-[1.75rem] border border-[#4b3818] bg-[linear-gradient(180deg,_#17120d_0%,_#0d0d0d_100%)] p-4 text-[#f5efe3] shadow-[0_24px_60px_rgba(0,0,0,0.34)] sm:p-6">
        <div className="mb-5 flex items-center gap-4">
          <span className="inline-flex rounded-full bg-[#f4bb41] px-4 py-2 text-sm font-black text-[#17120d]">{messages.sportsNews}</span>
          <div className="h-px flex-1 bg-gradient-to-r from-[#f4bb41]/60 to-transparent" />
        </div>
        {data.latest_news.length === 0 ? (
          <DarkEmptyState message={messages.empty} />
        ) : (
          <div className="grid gap-4 lg:grid-cols-3">
            {data.latest_news.map((article) => (
              <NewsPanel key={article.slug} locale={locale} article={article} readMoreLabel={messages.readMore} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.1rem] border border-[#4b3818] bg-[linear-gradient(180deg,_rgba(35,28,20,0.92),_rgba(21,18,13,0.92))] px-4 py-3 text-center">
      <p className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[#cdbb94]">{label}</p>
      <p className="mt-2 text-2xl font-black text-[#f7f0e2]">{value}</p>
    </div>
  );
}

function MatchBoardRow({ locale, match }: { locale: Locale; match: MatchSummary }) {
  return (
    <div className="rounded-[1.5rem] border border-[#433116] bg-[linear-gradient(180deg,_rgba(32,25,18,0.94),_rgba(20,20,20,0.94))] p-4 sm:p-5">
      <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#f4bb41]">{match.competition_name}</p>
          <p className="mt-3 text-xl font-black text-[#f7f0e2]">{match.home_team}</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-black text-[#fff1cc]">{timeOrScore(match, locale)}</p>
          <span className={`mt-3 inline-flex rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.2em] ${statusTone(match.status)}`}>
            {statusLabel(match.status)}
          </span>
        </div>
        <div className="text-start md:text-end">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#ac9b79]">Away</p>
          <p className="mt-3 text-xl font-black text-[#f7f0e2]">{match.away_team}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-3 border-t border-[#3a2b14] pt-4 text-sm text-[#ccb992] md:flex-row md:items-center md:justify-between">
        <p>{formatDate(match.start_time, locale)}</p>
        <Link
          href={`/${locale}/matches/${encodeURIComponent(match.external_match_id)}`}
          className="inline-flex rounded-full border border-[#f4bb41] px-4 py-2 font-bold text-[#f4bb41] transition hover:bg-[#f4bb41] hover:text-[#17120d]"
          data-disable-global-redirect
        >
          {messagesAction(match.status)}
        </Link>
      </div>
    </div>
  );
}

function NewsPanel({ locale, article, readMoreLabel }: { locale: Locale; article: NewsSummary; readMoreLabel: string }) {
  return (
    <article className="flex h-full flex-col justify-between rounded-[1.5rem] border border-[#433116] bg-[linear-gradient(180deg,_rgba(31,24,18,0.94),_rgba(17,17,17,0.94))] p-5">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#f4bb41]">{article.source}</p>
        <h3 className="mt-3 text-xl font-black text-[#f7f0e2]">{article.title}</h3>
        <p className="mt-3 text-sm leading-6 text-[#d1bf99]">{article.summary}</p>
      </div>
      <div className="mt-5 flex items-center justify-between gap-4 border-t border-[#3a2b14] pt-4 text-sm text-[#c4b18a]">
        <p>{formatDate(article.published_at, locale)}</p>
        <Link
          href={`/${locale}/news/${article.slug}`}
          className="inline-flex rounded-full bg-[#f4bb41] px-4 py-2 font-bold text-[#17120d] transition hover:bg-[#ffd06f]"
          data-disable-global-redirect
        >
          {readMoreLabel}
        </Link>
      </div>
    </article>
  );
}

function DarkEmptyState({ message }: { message: string }) {
  return <div className="rounded-[1.5rem] border border-dashed border-[#5a431d] bg-[#17120d] p-6 text-sm text-[#d1bf99]">{message}</div>;
}

function timeOrScore(match: MatchSummary, locale: Locale) {
  if (match.status.toLowerCase() === "live") {
    return "LIVE";
  }
  return new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit" }).format(new Date(match.start_time));
}

function statusLabel(status: string) {
  const normalized = status.toLowerCase();
  if (normalized === "live") return "Live now";
  if (normalized === "finished") return "Finished";
  if (normalized === "scheduled") return "Coming up";
  if (normalized === "postponed") return "Postponed";
  if (normalized === "cancelled") return "Cancelled";
  return status;
}

function messagesAction(status: string) {
  const normalized = status.toLowerCase();
  if (normalized === "live") return "Open match";
  if (normalized === "finished") return "Review";
  return "Match details";
}

function messagesLabel(status: string) {
  const normalized = status.toLowerCase();
  if (normalized === "live") return "Live match";
  if (normalized === "finished") return "Result";
  return "Kickoff";
}

function statusTone(status: string) {
  const normalized = status.toLowerCase();
  if (normalized === "live") return "bg-[#8a2f1e] text-[#fff4df]";
  if (normalized === "finished") return "bg-[#4d3b1a] text-[#fff4df]";
  if (normalized === "scheduled") return "bg-[#2e2418] text-[#f4dca5]";
  if (normalized === "postponed") return "bg-[#6a4b1f] text-[#fff4df]";
  return "bg-[#2c241a] text-[#f5e6c3]";
}
