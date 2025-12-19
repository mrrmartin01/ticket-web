"use client";

import { toast } from "sonner";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useResetPasswordMutation } from "@/redux/services/auth/authApiSlice";
import { decryptToken } from "@/lib/encrypt-decrypt";
import { useRouter } from "next/navigation";

const useResetPassword = () => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const router = useRouter();

  const handleResetPassword = async (token: string, password: string) => {
    try {
      const decoded = decodeURIComponent(decryptToken(token));
      const res = await resetPassword({ token: decoded, password }).unwrap();
      toast.success(res.message || "Password reset successful.");
      router.push("/login");
    } catch (err: unknown) {
      let message = "Please try again later.";

      if (typeof err === "object" && err !== null) {
        const error = err as FetchBaseQueryError & {
          data?: { message?: string; detail?: string };
          status?: number;
        };

        if (error.data && "message" in error.data) {
          message = String(error.data.message);
          console.log("Error message from server:", message);
        } else if (error.data && "detail" in error.data) {
          message = String(error.data.detail);
        }
      }

      toast.error("Forgot password failed", {
        description: message,
      });
    }
  };

  return { handleResetPassword, isLoading };
};

export default useResetPassword;
