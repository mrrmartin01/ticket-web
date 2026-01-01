type BookingResponse = {
    bookingId: string;
    message: string;
    paymentUrl: string;
    status: "PENDING_PAYMENT" | "CONFIRMED" | "CANCELLED";
    totalAmount: number;
};
export type { BookingResponse };