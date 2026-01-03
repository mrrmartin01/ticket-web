import { BookingResponse, MakeBookingRequest } from "@/types/booking";
import { apiSlice } from "../apiSlice";

export const BookingSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    makeBooking: builder.mutation<BookingResponse, MakeBookingRequest>({
      query: (body) => ({
        url: "/booking",
        method: "POST",
        body,
      }),
    }),
    verifyPayment: builder.query<boolean, string>({
      query: (bookingId) => {
        if (!bookingId) {
          throw new Error("verifyPayment called without bookingId");
        }
        return `/payment/callback/${bookingId}`;
      },
    }),
  }),
});

export const { useMakeBookingMutation, useVerifyPaymentQuery } = BookingSlice;
