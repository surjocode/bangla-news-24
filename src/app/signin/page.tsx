"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const SignInPage = () => {
  const router = useRouter();

  // Email & Password Sign In
  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: user.email as string,
      password: user.password as string,
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message);
      console.log("Sign in error:", error);
      return;
    }

    if (data) {
      toast.success("Sign in successful!");

      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  };

  // Google Sign In
  const handleGoogleSignIn = async () => {
    const { data, error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    if (error) {
      console.log("Google sign in error:", error);
      toast.error(error.message);
      return;
    }

    console.log("Google sign in:", data);
  };

  // GitHub Sign In
  const handleGithubSignIn = async () => {
    const { data, error } = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });

    if (error) {
      console.log("GitHub sign in error:", error);
      toast.error(error.message);
      return;
    }

    console.log("GitHub sign in:", data);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-5">
      <h2 className="text-2xl font-bold text-red-700">
        সাইন ইন
      </h2>

      <form onSubmit={onSubmit}>
        <fieldset className="fieldset rounded-box w-md">
          <label className="label">ইমেইল</label>

          <input
            name="email"
            type="email"
            className="input w-md"
            placeholder="Email"
            required
          />

          <label className="label">পাসওয়ার্ড</label>

          <input
            name="password"
            type="password"
            className="input w-md"
            placeholder="Password"
            required
          />

          <button
            type="submit"
            className="btn text-white bg-red-700 mt-4"
          >
            সাইন ইন করুন
          </button>
        </fieldset>
      </form>

      <button
        onClick={handleGoogleSignIn}
        type="button"
        className="btn mt-4"
      >
        Sign in with Google
      </button>

      <button
        onClick={handleGithubSignIn}
        type="button"
        className="btn mt-4"
      >
        Sign in with GitHub
      </button>
    </div>
  );
};

export default SignInPage;