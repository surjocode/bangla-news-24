import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-12 border-t border-gray-200 bg-gray-950 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white">
              Bangla News 24
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-gray-400">
              দেশ ও বিশ্বের সর্বশেষ সংবাদ, রাজনীতি, খেলাধুলা,
              বিনোদন, স্বাস্থ্য ও প্রযুক্তির খবর একসাথে।
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              গুরুত্বপূর্ণ লিংক
            </h3>

            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-red-500"
                >
                  হোম
                </Link>
              </li>

              <li>
                <Link
                  href="/category/politics"
                  className="transition-colors hover:text-red-500"
                >
                  রাজনীতি
                </Link>
              </li>

              <li>
                <Link
                  href="/category/world"
                  className="transition-colors hover:text-red-500"
                >
                  বিশ্ব
                </Link>
              </li>

              <li>
                <Link
                  href="/category/sports"
                  className="transition-colors hover:text-red-500"
                >
                  খেলা
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              যোগাযোগ
            </h3>

            <p className="text-sm leading-6 text-gray-400">
              সর্বশেষ সংবাদ ও আপডেট পেতে আমাদের সাথে থাকুন।
            </p>

            <p className="mt-3 text-sm text-gray-400">
              Email: contact@banglanews24.com
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 flex flex-col gap-3 border-t border-gray-800 pt-5 text-center text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Bangla News 24. All rights reserved.
          </p>

          <p>Made with ❤️ for Bangla readers</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;