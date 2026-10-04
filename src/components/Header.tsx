import Image from "next/image";
import Link from "next/link";
import NavLink from "./NavLink";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-center gap-1 px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            className="h-10 w-10"
            src="/logo.webp"
            alt="Bangla News 24 Logo"
            width={50}
            height={50}
          />

          <div>
            <h1 className="text-2xl font-bold text-red-600">Bangla News 24</h1>

            <p className="text-xs text-gray-500">{date}</p>
          </div>
        </Link>

        <div className="absolute right-4 top-4 flex items-center gap-2">
          <Link
            href="/signin"
            className="rounded px-3 py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-100"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="rounded bg-red-700 px-3 py-1.5 text-sm font-semibold text-white hover:bg-red-800"
          >
            সাইন আপ
          </Link>
        </div>
      </div>

      <NavLink />
    </header>
  );
};

export default Header;
