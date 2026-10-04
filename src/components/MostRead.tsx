import Link from "next/link";

interface MostReadNews {
  id: string;
  title: string;
}

interface MostReadResponse {
  data: MostReadNews[];
}

const MostRead = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/most-read");

  const data: MostReadResponse = await res.json();

  const news = data.data;

  return (
    <div className="divide-y divide-gray-100">
      {news.map((item, index) => (
        <Link key={item.id} href={`/news/${item.id}`} className="group block">
          <article className="flex gap-4 px-5 py-4 transition-colors duration-200 hover:bg-gray-50">
            {/* Number */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-50 text-lg font-bold text-red-600">
              {String(index + 1).padStart(2, "0")}
            </div>

            {/* Title */}
            <h3 className="line-clamp-2 text-sm font-semibold leading-6 text-gray-800 transition-colors group-hover:text-red-600">
              {item.title}
            </h3>
          </article>
        </Link>
      ))}
    </div>
  );
};

export default MostRead;
