type BookingItem = {
  ticketTypeId: string;
  quantity: number;
};

type MakeBookingRequest = {
  items: BookingItem[];
};
export type { BookingItem, MakeBookingRequest };
