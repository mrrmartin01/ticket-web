"use client";

import { toast } from "sonner";

export function openPaymentPopup({
  paymentUrl,
  bookingId,
  onComplete,
}: {
  paymentUrl: string;
  bookingId: string;
  onComplete?: () => void;
}) {
  const popup = window.open(
    "",
    "paystack-checkout",
    "width=680,height=550,resizable=yes,scrollbars=yes"
  );

  if (!popup) {
    toast.error("Popup blocked", {
      description: "Please allow popups to complete payment.",
    });
    return;
  }

  popup.location.href = paymentUrl;

  const listener = (event: MessageEvent) => {
    if (event.origin !== window.location.origin) return;

    if (
      event.data?.type === "PAYMENT_CALLBACK" &&
      event.data.reference === bookingId
    ) {
      popup.close();
      window.removeEventListener("message", listener);

      toast.success("Payment completed", {
        description: "Your booking has been confirmed.",
      });

      onComplete?.();
    }
  };

  window.addEventListener("message", listener);
}
