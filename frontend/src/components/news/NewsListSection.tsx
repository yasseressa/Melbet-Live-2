import { EmptyState } from "@/components/system/EmptyState";
import { NewsCard } from "@/components/news/NewsCard";
import type { Locale } from "@/i18n";
import type { NewsSummary } from "@/lib/api/types";

export function NewsListSection({ locale, title, articles, emptyLabel, readMoreLabel }: { locale: Locale; title: string; articles: NewsSummary[]; emptyLabel: string; readMoreLabel: string }) {
  return (
    <section id="news" className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-[#f7f0e2]">{title}</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-[#f4bb41]/55 to-transparent ms-4" />
      </div>
      {articles.length === 0 ? (
        <EmptyState message={emptyLabel} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <NewsCard key={article.slug} locale={locale} article={article} readMoreLabel={readMoreLabel} />
          ))}
        </div>
      )}
    </section>
  );
}
