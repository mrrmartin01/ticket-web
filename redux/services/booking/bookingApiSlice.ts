
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
  }),
});

export const { useMakeBookingMutation } = BookingSlice;
