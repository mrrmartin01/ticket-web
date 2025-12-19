import { useGetEventsQuery } from "@/redux/services/events/eventsApiSlice";

const useGetEvents = () => {
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useGetEventsQuery();

  return {
    events: data?.data ?? [],
    meta: data?.meta,
    isLoading,
    isError,
    refetch,
  };
};

export default useGetEvents;
