"use client";

import { useGetBookingById } from "@/hooks/booking";
import { maskEmail } from "@/lib/emailMask";
import { formatFullDate } from "@/lib/formateDate";
import { QrCode } from "@/lib/qrcodeGenerator";
import { useParams } from "next/navigation";

const Badge = ({
  label,
  tone,
}: {
  label: string;
  tone: "green" | "red" | "gray";
}) => {
  const tones = {
    green: "bg-green-50 text-green-700 border-green-200",
    red: "bg-red-50 text-red-700 border-red-200",
    gray: "bg-gray-50 text-gray-700 border-gray-200",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 text-xs font-medium border rounded ${tones[tone]}`}
    >
      {label}
    </span>
  );
};

const BookingDetailsPage = () => {
  const { id } = useParams();
  if (!id || Array.isArray(id)) throw new Error("Booking id is missing");

  const { booking, isLoading, isError } = useGetBookingById({ bookingId: id });

  if (isLoading) {
    return <div className="p-8 text-sm text-gray-500">Loading booking…</div>;
  }

  if (isError || !booking) {
    return (
      <div className="p-8 text-sm text-red-600">Failed to load booking.</div>
    );
  }

  const {
    status,
    totalAmount,
    bookingDate,
    paymentStatus,
    paymentRef,
    user,
    bookingItems,
    createdAt,
    updatedAt,
  } = booking;

  return (
    <div className="min-h-screen bg-gray-50 p-8 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Booking details - ID
          </h1>
          <p className="text-sm text-gray-500 mt-1">ID: {booking.id}</p>
        </div>
        <div className="grid grid-cols-2 grid-flow-row gap-2">
          <p>Booking</p>
          <Badge label={status} tone="green" />
          <p>Payment</p>
          <Badge label={paymentStatus} tone="green" />
        </div>
        <QrCode data={paymentRef} width={60} height={60} />
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border rounded p-6">
          <p className="text-xs text-gray-500">Total amount</p>
          <p className="text-lg font-semibold mt-1">${totalAmount}</p>
        </div>
        <div className="bg-white border rounded p-6">
          <p className="text-xs text-gray-500">Booking date</p>
          <p className="text-sm font-medium mt-1">
            {formatFullDate(bookingDate)}
          </p>
        </div>
        <div className="bg-white border rounded p-6">
          <p className="text-xs text-gray-500 mb-1">Customer</p>
          <div className="text-sm font-medium">
            <p className="font-medium capitalize">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-gray-500">{maskEmail(user.email)}</p>
          </div>
        </div>
      </div>


      {/* Items */}
      <div className="bg-white border rounded">
        <div className="p-6 border-b">
          <h2 className="text-sm font-semibold text-gray-900">Booking items</h2>
        </div>
        <div className="divide-y">
          {bookingItems.map((item) => (
            <div key={item.id} className="p-6 flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {item.ticketType.name}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Qty: {item.quantityBooked} · ${item.unitPrice}
                </p>

                {item.ticketType.feature?.length > 0 && (
                  <ul className="mt-2 text-xs text-gray-500 list-disc list-inside">
                    {item.ticketType.feature.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="text-sm font-medium text-gray-900">
                ${item.subtotal}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Meta */}
      <div className="text-xs text-gray-400">
        Created: {new Date(createdAt).toLocaleString()} · Updated:{" "}
        {new Date(updatedAt).toLocaleString()}
      </div>
    </div>
  );
};

export default BookingDetailsPage;
