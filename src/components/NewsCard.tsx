import Image from "next/image";
import Link from "next/link";

interface News {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
  firstPublished: string;
}

interface NewsCardProps {
  news: News;
}

const NewsCard = ({ news }: NewsCardProps) => {
  const publishedDate = new Date(news.firstPublished).toLocaleDateString(
    "bn-BD",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <div className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={news.imageUrl}
          alt={news.imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Category */}
        <div className="absolute left-3 top-3 rounded-md bg-red-600 px-3 py-1 text-xs font-semibold text-white shadow">
          {news.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h2 className="line-clamp-2 text-lg font-bold leading-snug text-gray-900 transition-colors duration-200 group-hover:text-red-600">
          {news.title}
        </h2>

        {/* Description */}
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
          {news.description}
        </p>

        {/* Date + Arrow */}
        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
          <time
            dateTime={news.firstPublished}
            className="text-xs text-gray-500"
          >
            {publishedDate}
          </time>

          <Link
            href={`/news/${news.id}`}
            aria-label="বিস্তারিত পড়ুন"
            className="text-xl font-bold text-red-600 transition-transform duration-200 hover:translate-x-1 hover:text-red-800"
          >
            →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
