"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useSignupMutation } from "@/redux/services/auth/authApiSlice";

const useSignup = () => {
  const [signup, { isLoading }] = useSignupMutation();
  const router = useRouter();

  const handleSignup = async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    try {
      await signup(data).unwrap();

      toast.success("Account created!", {
        description: "You'll be redirected to login.",
      });

      router.push(`/login`);
    } catch (err: unknown) {
      let message = "Please try again later.";

      if (typeof err === "object" && err !== null) {
        const error = err as FetchBaseQueryError & {
          data?: { message?: string };
        };

        if (
          "data" in error &&
          typeof error.data === "object" &&
          error.data !== null &&
          "message" in error.data
        ) {
          message = String(error.data.message);
        }
      }
      toast.error("Signup failed", {
        description: message,
      });
    }
  };

  return { handleSignup, isLoading };
};

export default useSignup;
