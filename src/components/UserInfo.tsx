"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignout = async () => {
    await authClient.signOut();
  };

  return (
    <div className="absolute right-4 top-4 z-50">
      {user ? (
        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white/90 px-3 py-2 shadow-lg backdrop-blur-md">
          <Link href="/profile" className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative">
              <div className="avatar">
                <div className="w-10 rounded-full ring-2 ring-red-500 ring-offset-2">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || "User avatar"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-red-100 text-lg font-bold text-red-700">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                </div>
              </div>

              {/* Online indicator */}
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
            </div>

            {/* User info */}
            <div className="hidden min-w-0 sm:block">
              <p className="max-w-32 truncate text-sm font-bold text-gray-900">
                {user.name}
              </p>

              <p className="text-xs text-gray-500">Online</p>
            </div>
          </Link>

          {/* Sign out */}
          <button
            onClick={handleSignout}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Sign out
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white/90 p-1.5 shadow-lg backdrop-blur-md">
          <Link
            href="/signin"
            className="rounded-lg px-3 py-1.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 hover:shadow-md active:scale-95"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
