import { useGetEventsByIdQuery } from "@/redux/services/events/eventsApiSlice";

const useGetEventsById = ({postId}:{postId: string}) => {
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useGetEventsByIdQuery(postId);

  return {
    events: data,
    isLoading,
    isError,
    refetch,
  };
};

export default useGetEventsById;
