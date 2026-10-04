import Image from "next/image";
import { notFound } from "next/navigation";

interface News {
  id: string;
  title: string;
  description?: unknown;
  category?: string;
  imageUrl?: string;
  imageAlt?: string;
  firstPublished?: string;
  text?: unknown;
  body?: unknown;
}

interface NewsResponse {
  success: boolean;
  data: News;
}

const getText = (value: unknown): string => {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => getText(item))
      .filter(Boolean)
      .join("\n\n");
  }

  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;

    if (Array.isArray(obj.blocks)) {
      return obj.blocks
        .map((block) => getText(block))
        .filter(Boolean)
        .join("\n\n");
    }

    if (typeof obj.text === "string") {
      return obj.text;
    }

    if (typeof obj.content === "string") {
      return obj.content;
    }

    if (typeof obj.value === "string") {
      return obj.value;
    }
  }

  return "";
};

const NewsDetails = async ({
  params,
}: {
  params: Promise<{ newsId: string }>;
}) => {
  const { newsId } = await params;

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/article/${newsId}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    notFound();
  }

  const response: NewsResponse = await res.json();

  if (!response.success || !response.data) {
    notFound();
  }

  const news = response.data;

  const description = getText(news.description);
  const articleText = getText(news.text);
  const bodyText = getText(news.body);

  const publishedDate = news.firstPublished
    ? new Date(news.firstPublished).toLocaleDateString("bn-BD", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Category */}
      {news.category && (
        <p className="mb-3 text-sm font-semibold text-red-600">
          {news.category}
        </p>
      )}

      {/* Title */}
      <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
        {news.title}
      </h1>

      {/* Date */}
      {publishedDate && (
        <p className="mt-3 text-sm text-gray-500">
          {publishedDate}
        </p>
      )}

      {/* Image */}
      {news.imageUrl && (
        <div className="relative mt-6 aspect-video overflow-hidden rounded-xl">
          <Image
            src={news.imageUrl}
            alt={news.imageAlt || news.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1024px"
          />
        </div>
      )}

      {/* Description */}
      {description && (
        <div className="mt-8">
          <p className="text-lg font-medium leading-8 text-gray-800">
            {description}
          </p>
        </div>
      )}

      {/* Full Article */}
      {(articleText || bodyText) && (
        <article className="mt-6">
          <p className="whitespace-pre-line text-base leading-8 text-gray-700">
            {articleText || bodyText}
          </p>
        </article>
      )}
    </main>
  );
};

export default NewsDetails;