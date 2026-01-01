import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQueryWithAuth";
import { MakeBookingRequest } from "@/types/booking";

export const BookingSlice = createApi({
  reducerPath: "bookingApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    makeBooking: builder.mutation<void, MakeBookingRequest>({
      query: (body) => ({
        url: "/booking",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useMakeBookingMutation } = BookingSlice;
