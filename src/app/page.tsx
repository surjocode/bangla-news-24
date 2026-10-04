import MainNews from "@/components/MainNews";
import MostRead from "@/components/MostRead";
import NewsCard from "@/components/NewsCard";

interface News {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
  firstPublished: string
}

interface IOtherSection {
  curationId: string;
  title: string;
  articles: News[];
}

export default async function Home() {
  const res = await fetch(
    "https://news-api-v2.vercel.app/api/news/sections",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch news sections");
  }

  const data = await res.json();

  const sections = data.data;

  const mainNews: News[] = sections[0]?.articles ?? [];

  const otherSections: IOtherSection[] = sections.slice(1);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">

          {/* News Content */}
          <section className="lg:col-span-2">

            {/* Main News */}
            <MainNews news={mainNews} />

            {/* Other News Sections */}
            <div className="mt-10 space-y-10">
              {otherSections.map((section) => (
                <section key={section.curationId}>

                  {/* Section Header */}
                  <div className="mb-5 flex items-center gap-3">
                    <div className="h-7 w-1 rounded-full bg-red-600" />

                    <h2 className="text-xl font-bold text-gray-900">
                      {section.title}
                    </h2>

                    <div className="h-px flex-1 bg-gray-200" />
                  </div>

                  {/* News Cards */}
                  <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {section.articles.map((news) => (
                      <NewsCard
                        key={news.id}
                        news={news}
                      />
                    ))}
                  </div>

                </section>
              ))}
            </div>

          </section>

          {/* Most Read */}
          <aside className="sticky top-5 h-fit rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

            {/* Header */}
            <div className="mb-5 flex items-center gap-3 border-b border-gray-200 pb-3">
              <div className="h-7 w-1 rounded-full bg-red-600" />

              <h2 className="text-xl font-bold text-red-700">
                সর্বাধিক পঠিত
              </h2>
            </div>

            {/* Most Read Content */}
            <div className="space-y-4">
              <MostRead />
            </div>

          </aside>

        </div>
      </main>
    </div>
  );
}