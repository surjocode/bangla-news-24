import Link from "next/link";

interface Navs {
  slug: string;
  title: string;
  topicId: string | null;
  url: string;
  scrapable: boolean;
}

const NavLinks = async () => {
  const res = await fetch(
    "https://news-api-v2.vercel.app/api/categories"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = await res.json();

  const navs: Navs[] = data.data;
  const filteredNavs = navs.filter((n) => n.scrapable);

  return (
    <nav className="mt-4 border-y border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 overflow-x-auto px-4 py-3">
        
        {/* Home */}
        <Link
          href="/"
          className="shrink-0 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-800 transition-all duration-200 hover:border-red-600 hover:bg-red-600 hover:text-white"
        >
          হোম
        </Link>

        {/* Categories */}
        {filteredNavs.map((n) => (
          <Link
            key={n.slug}
            href={`/category/${n.slug}`}
            className="shrink-0 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-800 transition-all duration-200 hover:border-red-600 hover:bg-red-600 hover:text-white"
          >
            {n.title}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavLinks;