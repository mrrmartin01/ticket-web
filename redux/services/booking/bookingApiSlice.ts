import {
  BookingResponse,
  MakeBookingRequest,
  VerifyPaymentResponse,
} from "@/types/booking";
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
    verifyPayment: builder.query<VerifyPaymentResponse, string>({
      query: (bookingId) => {
        if (!bookingId) {
          throw new Error("verifyPayment called without bookingId");
        }
        return `/payment/callback?trxref=${bookingId}`;
      },
    }),
    getBookingById: builder.query<BookingResponse, string>({
      query: (bookingId) => {
        if (!bookingId) {
          throw new Error("getBooking called without bookingId");
        }
        return `/booking/${bookingId}`;
      },
    }),
  }),
});

export const {
  useMakeBookingMutation,
  useVerifyPaymentQuery,
  useGetBookingByIdQuery,
} = BookingSlice;
