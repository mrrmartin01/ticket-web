"use client";

import { toast } from "sonner";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useMakeBookingMutation } from "@/redux/services/booking/bookingApiSlice";
import { MakeBookingRequest } from "@/types/booking";
import { openPaymentPopup } from "./usePaymentPopup";

export function useMakeBooking() {
  const [makeBooking, { isLoading, reset }] = useMakeBookingMutation();

  const handleMakeBooking = async (input: MakeBookingRequest) => {
    reset(); // clear previous mutation state

    if (!input.items.length) {
      toast.error("Booking failed", {
        description: "Please select at least one ticket before continuing.",
      });
      return;
    }

    try {
      const res = await makeBooking(input).unwrap();

      toast.success("Booking created", {
        description: "Complete payment in the popup to confirm.",
      });
      openPaymentPopup({
        paymentUrl: res.paymentUrl,
        bookingId: res.bookingId,
        onComplete: () => {
          // Optionally refresh booking data / Redux state here 
        },
      });

      return res;
    } catch (err: unknown) {
      let description =
        "We were unable to complete your booking at this time. Please try again shortly.";

      if (typeof err === "object" && err !== null) {
        const error = err as FetchBaseQueryError & {
          data?: { detail?: string; message?: string };
        };

        if (error.status === 401) {
          toast.error("Authentication required", {
            description: "Please log in to continue with your booking.",
            action: {
              label: "Log in",
              onClick: () => window.location.replace("/login"),
            },
          });
          return;
        }

        if (error.status === 400 && error.data) {
          description =
            error.data.detail ??
            error.data.message ??
            "The booking request was invalid. Please review your selection and try again.";
        }

        if (error.status === 500) {
          description =
            "Our servers encountered an issue while processing your booking. Please try again later.";
        }
      }

      toast.error("Booking failed", { description });
    }
  };

  return { handleMakeBooking, isLoading };
}

export default useMakeBooking;

// --------------------------
// PostMessage listener
// --------------------------
function monitorPaymentCompletion({
  bookingId,
  paymentWindow,
}: {
  bookingId: string;
  paymentWindow: Window;
}) {
  const listener = (event: MessageEvent) => {
    // Security: ensure message comes from your domain
    if (event.origin !== window.location.origin) return;

    if (
      event.data?.type === "PAYMENT_COMPLETE" &&
      event.data.bookingId === bookingId
    ) {
      paymentWindow.close();
      window.removeEventListener("message", listener);

      toast.success("Payment completed", {
        description: "Your booking has been confirmed.",
      });

      // Optionally refresh booking data / Redux state
    }
  };

  window.addEventListener("message", listener);
}
