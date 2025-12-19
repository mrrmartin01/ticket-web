"use client";

import { toast } from "sonner";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useForgotPasswordMutation } from "@/redux/services/auth/authApiSlice";
import { useRouter } from "next/navigation";
import { encryptToken } from "@/lib/encrypt-decrypt";

const useForgotPassword = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const router = useRouter();

  const handleForgotPassword = async (email: string) => {
    try {
      const res = await forgotPassword({ email }).unwrap();

      toast.success(res.message || "Password reset email sent.");
      if (res.token) {
        const urlToken = encodeURIComponent(encryptToken(res.token));
        router.replace(`/reset-password?token=${urlToken}`);
      }
    } catch (err: unknown) {
      let message = "Please try again later.";

      if (typeof err === "object" && err !== null) {
        const error = err as FetchBaseQueryError & {
          data?: { message?: string; detail?: string };
          status?: number;
        };

        if (error.status === 404 && error.data && "message" in error.data) {
          message = String(error.data.message);
        } else if (error.data && "detail" in error.data) {
          message = String(error.data.detail);
        }
      }

      toast.error("Forgot password failed", {
        description: message,
      });
    }
  };

  return { handleForgotPassword, isLoading };
};

export default useForgotPassword;
