import Image from "next/image";
import Link from "next/link";

interface News {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
}

interface MainNewsProps {
  news: News[];
}

const MainNews = ({ news }: MainNewsProps) => {
  if (!news.length) {
    return null;
  }

  const [firstNews, ...otherNews] = news;

  return (
    <section className="grid gap-5 md:grid-cols-2">
      {/* Featured News */}
      <Link href={`/news/${firstNews.id}`}>
        <article className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-md">
          {/* Image */}
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={firstNews.imageUrl}
              alt={firstNews.imageAlt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* Category */}
            <div className="absolute left-3 top-3 rounded-md bg-red-600 px-3 py-1 text-xs font-semibold text-white shadow">
              {firstNews.category}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-3 p-5">
            <h2 className="line-clamp-2 text-xl font-bold leading-snug text-gray-900 transition-colors duration-200 group-hover:text-red-600">
              {firstNews.title}
            </h2>

            <p className="line-clamp-3 text-sm leading-6 text-gray-600">
              {firstNews.description}
            </p>

            {/* Read More */}
            <button
              type="button"
              aria-label="বিস্তারিত পড়ুন"
              className="text-2xl font-bold text-red-600 transition-all duration-200 hover:translate-x-1 hover:text-red-800"
            >
              →
            </button>
          </div>
        </article>
      </Link>
      {/* Other News */}
      <div className="space-y-3">
        {otherNews.slice(0, 4).map((item) => (
          <Link key={item.id} href={`/news/${item.id}`} className="group block">
            <div className="flex gap-4 rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-red-200 hover:shadow-md">
              {/* Thumbnail */}
              <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={item.imageUrl}
                  alt={item.imageAlt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="128px"
                />
              </div>

              {/* Content */}
              <div className="min-w-0">
                <p className="mb-1 text-xs font-semibold text-red-600">
                  {item.category}
                </p>

                <h3 className="line-clamp-2 text-sm font-bold leading-5 text-gray-900 transition-colors duration-200 group-hover:text-red-600">
                  {item.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MainNews;
