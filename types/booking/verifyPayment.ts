type VerifyPaymentResponse = {
    reference: string;
    status: "PENDING" | "CONFIRMED" | "FAILED";
    booking: {
        id: string;
        status: string;
        paymentRef: string;
        paymentStatus: string;
        totalAmount: number;
        bookingDate: string;
    }
}
export type { VerifyPaymentResponse };