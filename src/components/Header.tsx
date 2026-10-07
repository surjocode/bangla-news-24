import Image from "next/image";
import Link from "next/link";
import NavLink from "./NavLink";
import UserInfo from "./UserInfo";

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

       <UserInfo />
      </div>

      <NavLink />
    </header>
  );
};

export default Header;
