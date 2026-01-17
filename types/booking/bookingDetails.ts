export type BookingStatus = "CONFIRMED" | "PENDING" | "CANCELLED";
export type PaymentStatus = "SUCCESS" | "FAILED" | "PENDING";

export interface TicketType {
  id: string;
  eventId: string;
  name: string;
  price: string;
  currency: string;
  feature: string[];
  badge?: string;
  group: boolean;
  deletedAt: string | null;
}

export interface BookingItemDetails {
  id: string;
  quantityBooked: number;
  unitPrice: string;
  deletedAt: string | null;
  ticketType: TicketType;
}

export interface BookingUser {
  firstName: string;
  lastName: string;
}

export interface Booking {
  id: string;
  totalAmount: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  bookingItems: BookingItemDetails[];
  user: BookingUser;
}
