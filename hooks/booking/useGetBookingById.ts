import { useGetBookingByIdQuery } from "@/redux/services/booking/bookingApiSlice";

const useGetBookingById = ({bookingId}:{bookingId: string}) => {
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useGetBookingByIdQuery(bookingId); 

  return {
    booking: data,
    isLoading,
    isError,
    refetch,
  };
};

export default useGetBookingById;
