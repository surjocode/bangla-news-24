import NewsCard from "@/components/NewsCard";
import { notFound } from "next/navigation";

interface News {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
  firstPublished: string;
}

interface CategoryNewsResponse {
  title: string;
  data: News[];
}

const CategoryNews = async ({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) => {
  const { categoryId } = await params;

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/category/${categoryId}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    notFound();
  }

  const data: CategoryNewsResponse = await res.json();

  const categoryNews = data.data;

  if (!categoryNews || categoryNews.length === 0) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex items-end justify-between border-b border-gray-200 pb-4">
        <div>
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-red-600">
            Latest News
          </p>

          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl lg:text-4xl">
            {data.title}
          </h1>
        </div>

        <span className="hidden rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-600 sm:block">
          {categoryNews.length} News
        </span>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
        {categoryNews.map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>
    </main>
  );
};

export default CategoryNews;