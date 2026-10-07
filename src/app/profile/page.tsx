"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  User,
  Mail,
  Code2,
  Camera,
  Pencil,
  LogOut,
  CheckCircle2,
  X,
  Save,
} from "lucide-react";

const ProfilePage = () => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [show, setShow] = useState(false);
  const [githubConnected, setGithubConnected] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  // Check GitHub connection
  useEffect(() => {
    const getAccounts = async () => {
      const { data, error } = await authClient.listAccounts();

      if (error) {
        console.log("Accounts error:", error);
        return;
      }

      const githubAccount = data?.find(
        (account) => account.providerId === "github"
      );

      setGithubConnected(Boolean(githubAccount));
    };

    if (user) {
      getAccounts();
    }
  }, [user]);

  // Sign out
  const handleSignout = async () => {
    setIsSigningOut(true);

    const { error } = await authClient.signOut();

    if (error) {
      toast.error(error.message);
      setIsSigningOut(false);
      return;
    }

    toast.success("Signed out successfully!");

    setTimeout(() => {
      router.push("/sign-in");
    }, 800);
  };

  // Update profile
  const handleUpdateProfile = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setIsUpdating(true);

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const image = formData.get("image") as string;

    const { error } = await authClient.updateUser({
      name,
      image: image || undefined,
    });

    if (error) {
      toast.error(error.message);
      setIsUpdating(false);
      return;
    }

    toast.success("Profile updated successfully!");

    setShow(false);
    setIsUpdating(false);
  };

  // Loading state
  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-red-600" />

          <p className="text-sm text-gray-500">
            Loading profile...
          </p>
        </div>
      </main>
    );
  }

  // User not logged in
  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 via-white to-gray-100 px-4">
        <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-xl">
          {/* Icon */}
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <User className="h-8 w-8 text-red-600" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900">
            Please sign in
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            You need to sign in to view your profile.
          </p>

          <Link
            href="/sign-in"
            className="mt-6 flex h-12 items-center justify-center rounded-xl bg-red-600 font-semibold text-white transition-all duration-200 hover:bg-red-700 hover:shadow-lg"
          >
            Sign In
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 px-4 py-10">
      <div className="mx-auto w-full max-w-lg">

        {/* ================= TOP SECTION ================= */}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-red-600">
              Account
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              My Profile
            </h1>
          </div>

          {/* Edit Button */}
          <button
            type="button"
            onClick={() => setShow((prev) => !prev)}
            className={`flex h-11 items-center gap-2 rounded-xl px-4 text-sm font-semibold transition-all duration-200 ${
              show
                ? "bg-gray-900 text-white hover:bg-gray-800"
                : "bg-red-600 text-white shadow-md shadow-red-200 hover:bg-red-700"
            }`}
          >
            {show ? (
              <>
                <X className="h-4 w-4" />
                Cancel
              </>
            ) : (
              <>
                <Pencil className="h-4 w-4" />
                Edit
              </>
            )}
          </button>
        </div>

        {/* ================= PROFILE CARD ================= */}
        <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl shadow-gray-200/50">

          {/* Cover */}
          <div className="h-28 bg-gradient-to-r from-red-600 via-red-500 to-orange-500" />

          <div className="px-6 pb-6">

            {/* ================= PROFILE HEADER ================= */}
            <div className="-mt-12 flex items-end justify-between">

              {/* Avatar */}
              <div className="relative">
                <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-red-100 text-3xl font-bold text-red-600 shadow-lg">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || "User avatar"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    user.name?.charAt(0).toUpperCase() || "U"
                  )}
                </div>

                {/* Online indicator */}
                <span className="absolute bottom-1 right-1 h-5 w-5 rounded-full border-4 border-white bg-green-500" />
              </div>

              {/* Online status */}
              <div className="mb-2 flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-600">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Online
              </div>
            </div>

            {/* ================= USER NAME ================= */}
            <div className="mt-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {user.name}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {user.email}
              </p>
            </div>

            {/* ================= USER INFORMATION ================= */}
            <div className="mt-7 space-y-3">

              {/* Name */}
              <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-4 transition-all duration-200 hover:border-red-100 hover:bg-red-50/40">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                  <User className="h-5 w-5 text-red-600" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium text-gray-400">
                    Full Name
                  </p>

                  <p className="truncate font-semibold text-gray-900">
                    {user.name}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-4 transition-all duration-200 hover:border-red-100 hover:bg-red-50/40">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                  <Mail className="h-5 w-5 text-red-600" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium text-gray-400">
                    Email Address
                  </p>

                  <p className="truncate font-semibold text-gray-900">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* GitHub */}
              <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 p-4 transition-all duration-200 hover:border-gray-200 hover:bg-gray-100">
                <div className="flex items-center gap-4">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white shadow-sm">
                    <Code2 className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-gray-400">
                      GitHub
                    </p>

                    <p
                      className={`font-semibold ${
                        githubConnected
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                      {githubConnected
                        ? "Connected"
                        : "Not Connected"}
                    </p>
                  </div>
                </div>

                {/* Connected icon */}
                {githubConnected && (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                )}
              </div>
            </div>

            {/* ================= EDIT FORM ================= */}
            {show && (
              <form
                onSubmit={handleUpdateProfile}
                className="mt-7 border-t border-gray-100 pt-6"
              >
                <div className="mb-5">
                  <h3 className="text-lg font-bold text-gray-900">
                    Edit Profile
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Update your profile information.
                  </p>
                </div>

                {/* Name input */}
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Name
                  </label>

                  <div className="relative">
                    <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                    <input
                      id="name"
                      name="name"
                      type="text"
                      defaultValue={user.name || ""}
                      placeholder="Enter your name"
                      required
                      className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-12 pr-4 text-gray-900 outline-none transition-all duration-200 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
                    />
                  </div>
                </div>

                {/* Image URL */}
                <div className="mb-5">
                  <label
                    htmlFor="image"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Profile Image URL
                  </label>

                  <div className="relative">
                    <Camera className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                    <input
                      id="image"
                      name="image"
                      type="url"
                      defaultValue={user.image || ""}
                      placeholder="https://example.com/image.jpg"
                      className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-12 pr-4 text-gray-900 outline-none transition-all duration-200 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
                    />
                  </div>
                </div>

                {/* Save button */}
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-red-600 font-semibold text-white transition-all duration-200 hover:bg-red-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isUpdating ? (
                    <>
                      <span className="loading loading-spinner loading-sm" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5" />
                      Save Changes
                    </>
                  )}
                </button>
              </form>
            )}

            {/* ================= SIGN OUT ================= */}
            <button
              type="button"
              onClick={handleSignout}
              disabled={isSigningOut}
              className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 font-semibold text-red-600 transition-all duration-200 hover:border-red-300 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSigningOut ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Signing out...
                </>
              ) : (
                <>
                  <LogOut className="h-5 w-5" />
                  Sign Out
                </>
              )}
            </button>
          </div>
        </section>

        {/* Bottom text */}
        <p className="mt-6 text-center text-xs text-gray-400">
          Manage your account information and connected accounts.
        </p>
      </div>
    </main>
  );
};

export default ProfilePage;