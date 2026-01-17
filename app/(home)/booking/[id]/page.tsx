"use client";

import { useParams } from "next/navigation";
import { useGetBookingById } from "@/hooks/booking";
import { formatFullDate } from "@/lib/formateDate";
import { QrCode } from "@/lib/qrcodeGenerator";

const Badge = ({
  label,
  tone,
}: {
  label: string;
  tone: "green" | "red" | "gray";
}) => {
  const tones: Record<typeof tone, string> = {
    green: "bg-green-50 text-green-700 border-green-200",
    red: "bg-red-50 text-red-700 border-red-200",
    gray: "bg-gray-50 text-gray-700 border-gray-200",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-.5 text-[10px] font-medium border rounded ${tones[tone]}`}
    >
      {label}
    </span>
  );
};

const statusTone = (status: string): "green" | "red" | "gray" => {
  switch (status) {
    case "CONFIRMED":
    case "SUCCESS":
      return "green";
    case "FAILED":
    case "CANCELLED":
      return "red";
    default:
      return "gray";
  }
};

const BookingDetailsPage = () => {
  const params = useParams<{ id: string }>();
  const bookingId = params?.id;

  if (!bookingId) {
    throw new Error("Booking id is missing");
  }

  const { booking, isLoading, isError } = useGetBookingById({
    bookingId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen  m-auto p-8 text-sm text-gray-500">
        Loading booking…
      </div>
    );
  }

  if (isError || !booking) {
    return (
      <div className="p-8 text-sm text-red-600">Failed to load booking.</div>
    );
  }

  const totalAmount = Number(booking.totalAmount).toFixed(2);

  return (
    <div className=" bg-gray-50 px-4 py-6 sm:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Booking details
            </h1>
            <div className="flex items-center gap-6">
              <div className="grid grid-cols-2 gap-4 text-left">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-gray-500">Booking</span>
                  <Badge
                    label={booking.status}
                    tone={statusTone(booking.status)}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs text-gray-500">Payment</span>
                  <Badge
                    label={booking.paymentStatus}
                    tone={statusTone(booking.paymentStatus)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="hidden sm:block">
            <QrCode data={booking.id} height={56} width={56} />
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white border rounded p-5">
            <p className="text-xs text-gray-500">Total amount</p>
            <p className="text-lg font-semibold mt-1">${totalAmount}</p>
          </div>

          <div className="bg-white border rounded p-5">
            <p className="text-xs text-gray-500">Created</p>
            <p className="text-sm font-medium mt-1">
              {formatFullDate(booking.createdAt)}
            </p>
          </div>

          <div className="bg-white border rounded p-5">
            <p className="text-xs text-gray-500 mb-1">Customer</p>
            <p className="text-sm font-medium capitalize">
              {booking.user.firstName} {booking.user.lastName}
            </p>
          </div>
        </div>

        {/* Items */}
        <div className="bg-white border rounded overflow-hidden">
          <div className="p-5 border-b">
            <h2 className="text-sm font-semibold text-gray-900">
              Booking items
            </h2>
          </div>

          <div className="divide-y">
            {booking.bookingItems.map((item) => {
              const unitPrice = Number(item.unitPrice);
              const subtotal = unitPrice * item.quantityBooked;

              return (
                <div
                  key={item.id}
                  className="p-5 flex flex-col sm:flex-row sm:justify-between gap-2"
                >
                  <div className="divide-y-4">
                    <p className="text-sm font-medium text-gray-900">
                      {item.ticketType.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Qty: {item.quantityBooked} · ${unitPrice.toFixed(2)}
                    </p>

                    {item.ticketType.feature.length > 0 && (
                      <ul className="mt-2 text-xs text-gray-500 list-disc list-inside">
                        {item.ticketType.feature.map((f) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="text-sm font-medium text-gray-900 sm:text-right">
                    ${subtotal.toFixed(2)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Meta */}
        <div className="text-xs text-gray-400 text-center sm:text-left">
          Created: {new Date(booking.createdAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsPage;
