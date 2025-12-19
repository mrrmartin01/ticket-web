import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQueryWithAuth";
import { EventDetails, EventResponse } from "@/types/events";

export const EventSlice = createApi({
  reducerPath: "eventsApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getEvents: builder.query<EventResponse, void>({
      query: () => ({
        url: "/event/all",
        method: "GET",
      }),
    }),
    getEventsById: builder.query<EventDetails, string>({
      query: (id) => ({
        url: `/event/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetEventsQuery, useGetEventsByIdQuery } = EventSlice;
