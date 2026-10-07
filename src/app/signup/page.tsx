"use client";

import { authClient } from "@/lib/auth-client";
import React from "react";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      name: user.name as string,
      email: user.email as string,
      password: user.password as string,
      image: user.image as string,
      callbackURL: "/",
    });

    if (error) {
      console.log("Sign up error:", error);
      toast.error(error.message);
      return;
    }

    if (data) {
      toast.success("Account created successfully!");
    }
  };

  // Google Sign Up
  const handleGoogleSignUp = async () => {
    const { data, error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    if (error) {
      console.log("Google sign up error:", error);
      toast.error(error.message);
      return;
    }

    console.log("Google sign up:", data);
  };

  // GitHub Sign Up
  const handleGithubSignUp = async () => {
    const { data, error } = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });

    if (error) {
      console.log("GitHub sign up error:", error);
      toast.error(error.message);
      return;
    }

    console.log("GitHub sign up:", data);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-5">
      <h2 className="text-2xl font-bold text-red-700">
        সাইন আপ
      </h2>

      <form onSubmit={onSubmit}>
        <fieldset className="fieldset rounded-box w-md">
          <label className="label">নাম</label>

          <input
            name="name"
            type="text"
            className="input w-md"
            placeholder="Name"
            required
          />

          <label className="label">Image URL</label>

          <input
            name="image"
            type="url"
            className="input w-md"
            placeholder="Image URL"
          />

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
            minLength={8}
          />

          <button
            type="submit"
            className="btn text-white bg-red-700 mt-4"
          >
            সাইন আপ করুন
          </button>
        </fieldset>
      </form>

      <div className="divider w-md">OR</div>

      <button
        type="button"
        onClick={handleGoogleSignUp}
        className="btn w-md"
      >
        Sign up with Google
      </button>

      <button
        type="button"
        onClick={handleGithubSignUp}
        className="btn w-md mt-3"
      >
        Sign up with GitHub
      </button>
    </div>
  );
};

export default SignUpPage;