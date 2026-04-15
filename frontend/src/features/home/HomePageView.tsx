"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { Locale, Messages } from "@/i18n";
import type { HomeResponse, MatchSummary, NewsSummary } from "@/lib/api/types";

export function HomePageView({ locale, messages, data }: { locale: Locale; messages: Messages; data: HomeResponse }) {
  const buckets = [
    { id: "today", label: messages.todayMatches, matches: data.today_matches },
    { id: "yesterday", label: messages.yesterdayMatches, matches: data.yesterday_matches },
    { id: "tomorrow", label: messages.tomorrowMatches, matches: data.tomorrow_matches },
  ] as const;

  const [activeBucketId, setActiveBucketId] = useState<(typeof buckets)[number]["id"]>("today");
  const activeBucket = buckets.find((bucket) => bucket.id === activeBucketId) ?? buckets[0];
  const featuredMatches = useMemo(() => activeBucket.matches.slice(0, 4), [activeBucket.matches]);
  const featuredNews = data.latest_news.slice(0, 3);
  const featuredMatch = activeBucket.matches[0] ?? data.today_matches[0] ?? data.tomorrow_matches[0] ?? data.yesterday_matches[0] ?? null;

  return (
    <div className="space-y-8 pb-10 sm:space-y-10 lg:space-y-12 lg:pb-14">
      <section className="relative overflow-hidden rounded-[2rem] border border-[rgba(242,178,13,0.22)] bg-[#080808] shadow-[0_30px_70px_rgba(0,0,0,0.42)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,rgba(255,196,20,0.18),transparent_30%),radial-gradient(circle_at_80%_15%,rgba(255,196,20,0.12),transparent_22%),linear-gradient(115deg,rgba(255,194,0,0.18)_0%,rgba(17,17,17,0.45)_33%,rgba(5,5,5,0.92)_68%)]" />
        <div className="absolute inset-y-0 right-[-12%] hidden w-[58%] bg-[radial-gradient(circle_at_50%_40%,rgba(255,210,70,0.2),transparent_34%),linear-gradient(180deg,rgba(255,194,0,0.08)_0%,rgba(0,0,0,0)_30%,rgba(0,0,0,0.34)_100%)] lg:block" />
        <div className="absolute bottom-[-5%] right-[2%] hidden text-[8rem] font-black uppercase leading-none tracking-[-0.06em] text-[rgba(255,255,255,0.05)] xl:block">
          WC26
        </div>
        <div className="absolute inset-y-0 right-[7%] hidden w-[34%] lg:block">
          <div className="absolute bottom-0 right-[12%] h-[80%] w-[58%] rounded-t-[45%] bg-[linear-gradient(180deg,rgba(255,212,77,0.04)_0%,rgba(255,212,77,0.14)_28%,rgba(17,17,17,0.85)_100%)] blur-[1px]" />
          <div className="absolute bottom-[7%] right-[28%] h-[66%] w-[12%] rotate-[-4deg] rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,194,0,0.08),rgba(255,255,255,0.03))]" />
          <div className="absolute bottom-[16%] right-[18%] h-[46%] w-[14%] rotate-[18deg] rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,194,0,0.08),rgba(255,255,255,0.03))]" />
          <div className="absolute bottom-[15%] right-[33%] h-[39%] w-[16%] rounded-[42%] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,194,0,0.12),rgba(255,255,255,0.03))]" />
          <div className="absolute bottom-[2%] right-[19%] h-[27%] w-[35%] rounded-t-[55%] border border-[rgba(255,196,20,0.1)] bg-[linear-gradient(180deg,rgba(255,194,0,0.08),rgba(255,194,0,0.02))]" />
        </div>

        <div className="relative grid gap-8 px-5 pb-6 pt-8 sm:px-8 sm:pb-8 sm:pt-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.68fr)] lg:px-10 lg:pb-10 lg:pt-12 xl:px-12">
          <div className="max-w-[44rem]">
            <div className="inline-flex items-center gap-3">
              <span className="h-[2px] w-10 bg-[#f3bc28]" />
              <span className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#f3bc28] sm:text-sm">{messages.matchCenter}</span>
            </div>

            <h1 className="mt-6 max-w-[12ch] text-[2.5rem] font-black uppercase leading-[0.94] tracking-[-0.04em] text-white sm:text-[3.75rem] lg:text-[5.25rem]">
              Watch Every
              <span className="block text-[#f3bc28]">World Match</span>
              <span className="block text-white">Live</span>
            </h1>

            <p className="mt-5 max-w-[32rem] text-base leading-8 text-[#d4d0c5] sm:text-lg">
              All the passion in one place. Follow the biggest fixtures, open every live match page, and stay close to the latest football stories.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href={featuredMatch ? `/${locale}/matches/${encodeURIComponent(featuredMatch.external_match_id)}` : `/${locale}#matches`}
                className="inline-flex min-h-[3.75rem] items-center justify-center gap-3 rounded-[0.9rem] border border-[#f1bc26] bg-[linear-gradient(180deg,#ffd34c_0%,#f0af00_100%)] px-6 text-sm font-black uppercase tracking-[0.08em] text-[#141414] shadow-[0_14px_30px_rgba(208,151,0,0.22)] transition hover:translate-y-[-1px]"
                data-disable-global-redirect
              >
                <PlayBadge />
                <span>{messages.watchMatch}</span>
              </Link>
              <Link
                href={`/${locale}#news`}
                className="inline-flex min-h-[3.75rem] items-center justify-center rounded-[0.9rem] border border-[rgba(255,194,0,0.3)] bg-[rgba(17,17,17,0.58)] px-6 text-sm font-bold uppercase tracking-[0.12em] text-[#f0ece4] transition hover:border-[#f1bc26] hover:text-[#f1bc26]"
                data-disable-global-redirect
              >
                {messages.sportsNews}
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:max-w-[44rem]">
              <InfoTile
                icon={<CupIcon />}
                eyebrow="World Stage"
                title="June 11 - July 19"
                description="High-intensity fixtures, fast updates, and direct access to every match page."
              />
              <InfoTile
                icon={<BoltIcon />}
                eyebrow="Live Coverage"
                title={`${activeBucket.matches.length} ${messages.matches}`}
                description="Switch between match days and jump instantly to the games that matter most."
              />
            </div>
          </div>

          <div className="relative flex flex-col justify-end gap-4">
            <div className="rounded-[1.45rem] border border-[rgba(255,194,0,0.18)] bg-[linear-gradient(180deg,rgba(17,17,17,0.84)_0%,rgba(8,8,8,0.95)_100%)] p-5 backdrop-blur-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#f3bc28]">Road To Glory</p>
                  <h2 className="mt-2 text-2xl font-black uppercase tracking-[-0.03em] text-white">Upcoming Spotlight</h2>
                </div>
                <span className="rounded-full border border-[rgba(255,194,0,0.18)] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[#d2ccc0]">
                  {activeBucket.label}
                </span>
              </div>

              <div className="mt-5 space-y-3">
                {featuredMatches.length === 0 ? (
                  <DarkEmptyState message={messages.empty} />
                ) : (
                  featuredMatches.map((match) => <CompactMatchRow key={match.external_match_id} locale={locale} match={match} messages={messages} />)
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="matches" className="rounded-[1.85rem] border border-[rgba(255,194,0,0.14)] bg-[linear-gradient(180deg,#0a0a0a_0%,#070707_100%)] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.34)] sm:p-6 lg:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionEyebrow title="Upcoming Matches" accent={messages.matches} />
            <p className="mt-3 max-w-[35rem] text-sm leading-7 text-[#a9a39a] sm:text-base">
              Pick the day, scan the fixture board, and jump directly to the match page with one click.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex flex-wrap gap-2">
              {buckets.map((bucket) => {
                const active = bucket.id === activeBucket.id;
                return (
                  <button
                    key={bucket.id}
                    type="button"
                    onClick={() => setActiveBucketId(bucket.id)}
                    className={`rounded-[0.9rem] border px-4 py-2.5 text-xs font-extrabold uppercase tracking-[0.12em] transition sm:text-sm ${
                      active
                        ? "border-[#f1bc26] bg-[linear-gradient(180deg,#ffd34c_0%,#f0af00_100%)] text-[#111]"
                        : "border-[rgba(255,194,0,0.18)] bg-[#101010] text-[#ddd5c8] hover:border-[#f1bc26] hover:text-[#f1bc26]"
                    }`}
                  >
                    {bucket.label}
                  </button>
                );
              })}
            </div>
            <Link
              href={`/${locale}#matches`}
              className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[#f1bc26] transition hover:text-[#ffe08b] sm:text-sm"
              data-disable-global-redirect
            >
              <span>View All Matches</span>
              <ArrowRight />
            </Link>
          </div>
        </div>

        <div className="mt-7 space-y-3">
          {activeBucket.matches.length === 0 ? (
            <DarkEmptyState message={messages.empty} />
          ) : (
            activeBucket.matches.slice(0, 6).map((match) => <FeatureMatchRow key={match.external_match_id} locale={locale} match={match} messages={messages} />)
          )}
        </div>

        <div className="mt-6 rounded-[1.5rem] border border-[rgba(255,194,0,0.14)] bg-[linear-gradient(90deg,rgba(16,16,16,0.96)_0%,rgba(28,23,8,0.96)_42%,rgba(124,86,0,0.45)_100%)] px-5 py-5 sm:px-6 lg:px-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(255,194,0,0.3)] bg-[rgba(255,194,0,0.08)] text-[#f1bc26]">
                <CupIcon />
              </span>
              <div>
                <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#f1ede4]">The World Is Watching</p>
                <p className="mt-1 text-sm text-[#d0cabf]">Stay ready for every big night, every whistle, and every live kickoff.</p>
              </div>
            </div>
            <Link
              href={featuredMatch ? `/${locale}/matches/${encodeURIComponent(featuredMatch.external_match_id)}` : `/${locale}#matches`}
              className="inline-flex min-h-[3.25rem] items-center justify-center rounded-[0.9rem] border border-[#f1bc26] px-5 text-sm font-extrabold uppercase tracking-[0.12em] text-[#f1bc26] transition hover:bg-[#f1bc26] hover:text-[#111]"
              data-disable-global-redirect
            >
              {messages.watch}
            </Link>
          </div>
        </div>
      </section>

      <section id="news" className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="rounded-[1.85rem] border border-[rgba(255,194,0,0.14)] bg-[linear-gradient(180deg,#0a0a0a_0%,#070707_100%)] p-5 sm:p-6 lg:p-8">
          <SectionEyebrow title="Breaking Football" accent={messages.sportsNews} />
          <p className="mt-3 text-sm leading-7 text-[#a9a39a] sm:text-base">
            Fast sports headlines and the latest related stories around the biggest fixtures.
          </p>

          <div className="mt-6 space-y-3">
            {featuredNews.length === 0 ? (
              <DarkEmptyState message={messages.loadFailed} />
            ) : (
              featuredNews.map((article) => (
                <Link
                  key={article.slug}
                  href={`/${locale}/news/${article.slug}`}
                  className="group block rounded-[1.3rem] border border-[rgba(255,194,0,0.12)] bg-[#101010] p-4 transition hover:border-[#f1bc26]"
                  data-disable-global-redirect
                >
                  <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.18em] text-[#f1bc26]">{article.source}</p>
                  <h3 className="mt-3 text-lg font-black uppercase leading-6 tracking-[-0.02em] text-white transition group-hover:text-[#ffe08b]">
                    {article.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#b6b0a5]">{article.summary}</p>
                </Link>
              ))
            )}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[1.85rem] border border-[rgba(255,194,0,0.14)] bg-[linear-gradient(180deg,#0a0a0a_0%,#080808_100%)] p-5 sm:p-6 lg:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(255,194,0,0.2),transparent_22%),linear-gradient(140deg,transparent_42%,rgba(255,194,0,0.08)_100%)]" />
          <div className="relative">
            <SectionEyebrow title="Matchday Atmosphere" accent="Live" />
            <p className="mt-3 max-w-[34rem] text-sm leading-7 text-[#a9a39a] sm:text-base">
              A broadcast-inspired home page built for fast scanning, high contrast, and confident calls to action on every screen size.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <StatCard value={`${data.today_matches.length}`} label={messages.todayMatches} />
              <StatCard value={`${data.latest_news.length}`} label={messages.sportsNews} />
              <StatCard value={featuredMatch ? formatMatchDate(featuredMatch.start_time, locale) : "--"} label="Next Kickoff" />
              <StatCard value={featuredMatch ? statusText(featuredMatch.status, messages) : messages.empty} label="Current Focus" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureMatchRow({ locale, match, messages }: { locale: Locale; match: MatchSummary; messages: Messages }) {
  return (
    <div className="rounded-[1.25rem] border border-[rgba(255,194,0,0.12)] bg-[linear-gradient(180deg,#121212_0%,#0d0d0d_100%)] px-4 py-4 sm:px-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
        <div className="min-w-0 xl:w-[12rem]">
          <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.18em] text-[#f1bc26]">{formatMatchDate(match.start_time, locale)}</p>
          <p className="mt-2 text-sm font-semibold text-[#d6d0c5]">{formatMatchTime(match.start_time, locale)}</p>
        </div>

        <div className="grid flex-1 gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <TeamDisplay align="start" name={match.home_team} logo={match.home_team_crest} />
          <div className="text-center">
            <p className="text-lg font-black uppercase tracking-[0.08em] text-[#f1bc26]">{statusText(match.status, messages)}</p>
            <p className="mt-1 text-sm font-bold uppercase tracking-[0.24em] text-[#908a82]">{messages.versus}</p>
          </div>
          <TeamDisplay align="end" name={match.away_team} logo={match.away_team_crest} />
        </div>

        <div className="flex items-center justify-between gap-4 xl:w-[17rem] xl:justify-end">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8f8a81]">{match.competition_name}</p>
          <Link
            href={`/${locale}/matches/${encodeURIComponent(match.external_match_id)}`}
            className="inline-flex min-h-[3rem] items-center justify-center rounded-[0.85rem] border border-[#b68610] px-4 text-xs font-extrabold uppercase tracking-[0.14em] text-[#f1bc26] transition hover:bg-[#f1bc26] hover:text-[#111] sm:px-5 sm:text-sm"
            data-disable-global-redirect
          >
            {messages.watch}
          </Link>
        </div>
      </div>
    </div>
  );
}

function CompactMatchRow({ locale, match, messages }: { locale: Locale; match: MatchSummary; messages: Messages }) {
  return (
    <Link
      href={`/${locale}/matches/${encodeURIComponent(match.external_match_id)}`}
      className="flex items-center gap-3 rounded-[1rem] border border-[rgba(255,194,0,0.1)] bg-[rgba(20,20,20,0.88)] px-4 py-4 transition hover:border-[#f1bc26]"
      data-disable-global-redirect
    >
      <TeamMiniBadge src={match.home_team_crest} alt={match.home_team} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-black uppercase tracking-[0.06em] text-white">
          {match.home_team} <span className="text-[#f1bc26]">{messages.versus}</span> {match.away_team}
        </p>
        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#9f988c]">
          {formatMatchDate(match.start_time, locale)} · {formatMatchTime(match.start_time, locale)}
        </p>
      </div>
      <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#f1bc26]">{statusText(match.status, messages)}</span>
    </Link>
  );
}

function TeamDisplay({ name, logo, align }: { name: string; logo?: string | null; align: "start" | "end" }) {
  const isEnd = align === "end";

  return (
    <div className={`flex items-center gap-3 ${isEnd ? "sm:flex-row-reverse sm:text-right" : "text-left"}`}>
      <TeamLogo src={logo} alt={name} />
      <p className="text-base font-black uppercase tracking-[0.04em] text-[#f6f0e5] sm:text-lg">{name}</p>
    </div>
  );
}

function TeamLogo({ src, alt }: { src?: string | null; alt: string }) {
  if (!src) {
    return <div className="h-11 w-11 rounded-full border border-[rgba(255,194,0,0.16)] bg-[#0f0f0f]" aria-hidden="true" />;
  }

  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(255,194,0,0.16)] bg-[#0f0f0f] p-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="h-full w-full object-contain" loading="lazy" referrerPolicy="no-referrer" />
    </div>
  );
}

function TeamMiniBadge({ src, alt }: { src?: string | null; alt: string }) {
  if (!src) {
    return <div className="h-8 w-8 rounded-full border border-[rgba(255,194,0,0.16)] bg-[#0f0f0f]" aria-hidden="true" />;
  }

  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(255,194,0,0.16)] bg-[#0f0f0f] p-1.5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="h-full w-full object-contain" loading="lazy" referrerPolicy="no-referrer" />
    </div>
  );
}

function InfoTile({
  icon,
  eyebrow,
  title,
  description,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[1.3rem] border border-[rgba(255,194,0,0.12)] bg-[rgba(10,10,10,0.72)] p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <span className="mt-1 flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(255,194,0,0.18)] bg-[rgba(255,194,0,0.08)] text-[#f1bc26]">
          {icon}
        </span>
        <div>
          <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.2em] text-[#f1bc26]">{eyebrow}</p>
          <h3 className="mt-2 text-lg font-black uppercase tracking-[0.02em] text-white">{title}</h3>
          <p className="mt-2 text-sm leading-7 text-[#beb8ad]">{description}</p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-[1.25rem] border border-[rgba(255,194,0,0.12)] bg-[rgba(15,15,15,0.8)] p-4">
      <p className="text-xl font-black uppercase tracking-[-0.02em] text-white">{value}</p>
      <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-[#a8a195]">{label}</p>
    </div>
  );
}

function SectionEyebrow({ title, accent }: { title: string; accent: string }) {
  return (
    <div>
      <h2 className="text-[2rem] font-black uppercase leading-none tracking-[-0.04em] text-white sm:text-[2.5rem]">
        {title} <span className="text-[#f1bc26]">{accent}</span>
      </h2>
      <span className="mt-3 block h-[3px] w-16 bg-[#f1bc26]" />
    </div>
  );
}

function DarkEmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-[1.2rem] border border-[rgba(255,194,0,0.12)] bg-[#0d0d0d] px-4 py-5 text-sm leading-7 text-[#b4aea2]">
      {message}
    </div>
  );
}

function formatMatchDate(value: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale, { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));
}

function formatMatchTime(value: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit", timeZoneName: "short" }).format(new Date(value));
}

function statusText(status: string, messages: Messages) {
  const normalized = status.toLowerCase();
  if (normalized === "live") return messages.liveNowLabel;
  if (normalized === "finished") return messages.finished;
  if (normalized === "scheduled") return messages.comingUp;
  if (normalized === "postponed") return messages.postponed;
  if (normalized === "cancelled") return messages.cancelled;
  return status;
}

function PlayBadge() {
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#161616] text-[#f1bc26]">
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M8 6.5v11l8.5-5.5z" />
      </svg>
    </span>
  );
}

function CupIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.7" aria-hidden="true">
      <path d="M8 3h8v3a4 4 0 0 0 3 3.87V11a5 5 0 0 1-5 5h-4a5 5 0 0 1-5-5V9.87A4 4 0 0 0 8 6V3Z" />
      <path d="M9.5 16v2.5L7 21h10l-2.5-2.5V16" />
      <path d="M5 6H3v1a4 4 0 0 0 4 4M19 6h2v1a4 4 0 0 1-4 4" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
      <path d="M13.5 2 5 13h5l-1.5 9L17 11h-5.25L13.5 2Z" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="2" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}
