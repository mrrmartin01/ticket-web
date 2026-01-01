import { EventDetails, EventResponse } from "@/types/events";
import { apiSlice } from "../apiSlice";

export const EventSlice = apiSlice.injectEndpoints({
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
