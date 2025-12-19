"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useSigninMutation } from "@/redux/services/auth/authApiSlice";

const useSignin = () => {
  const [signin, { isLoading }] = useSigninMutation();
  const router = useRouter();

  const handleSignin = async (data:{email: string, password: string}) => {
    const { email, password } = data;
    try {
      await signin({ email, password }).unwrap();

      toast("Welcome back!", {
        description: "You are now logged in.",
      });

      router.push("/");
    } catch (err: unknown) {
      let message = "Please try again later.";

      if (typeof err === "object" && err !== null) {
        const error = err as FetchBaseQueryError & {
          data?: { detail?: string };
        };

        if (
          "data" in error &&
          typeof error.data === "object" &&
          error.data !== null &&
          "detail" in error.data
        ) {
          message = String(error.data.detail);
        }
      }

      toast("Login failed", {
        description: message,
      });
    }
  };

  return { handleSignin, isLoading };
};

export default useSignin;
