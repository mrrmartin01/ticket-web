"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useVerifyPaymentQuery } from "@/redux/services/booking/bookingApiSlice";
import {
  IconCheck,
  IconX,
  IconLoader2,
} from "@tabler/icons-react";

const BookingStatus = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const reference = searchParams.get("trxref");

  if (!reference) {
    throw new Error("Payment reference is missing from query params");
  }

  const { data, isLoading, isError } = useVerifyPaymentQuery(reference);

  const handleGoHome = () => router.push("/");
  const handleViewBooking = () =>
    router.push(`/booking/${data ?? ""}`);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-gray-700">
        <IconLoader2 className="animate-spin text-4xl mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Verifying your payment…</h2>
        <p className="text-center max-w-sm">
          Please wait while we confirm your payment. This usually takes a few
          seconds.
        </p>
      </div>
    );
  }

  if (data?.status === "FAILED" || isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-red-600">
        <IconX className="text-6xl mb-4" />
        <h2 className="text-3xl font-bold mb-2">Verification Failed</h2>
        <p className="text-center max-w-md mb-4">
          We couldn&apos;t confirm your payment. If you were charged, please
          contact support with the reference below.
        </p>
        <code className="bg-gray-100 p-2 rounded text-sm break-all">{reference}</code>
        <div className="mt-6 flex gap-4">
          <button
            onClick={handleGoHome}
            className="px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
          >
            Go to Home
          </button>
          <button
            onClick={handleViewBooking}
            disabled={!data}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            View Booking
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-green-700">
      <IconCheck className="text-6xl mb-4" />
      <h2 className="text-3xl font-bold mb-2">Payment Successful!</h2>
      <p className="text-center max-w-md mb-4">
        Your booking is confirmed. You will receive a confirmation email
        shortly.
      </p>
      <div className="mt-6 flex gap-4">
        <button
          onClick={handleGoHome}
          className="px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
        >
          Go to Home
        </button>
        <button
          onClick={handleViewBooking}
          disabled={!data}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-red-700 transition disabled:opacity-50"
        >
          View Booking
        </button>
      </div>
    </div>
  );
};

export default BookingStatus;
