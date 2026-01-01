"use client";

import { cn } from "@/lib/utils";
import { IconCalendar, IconClock, IconMapPinFilled } from "@tabler/icons-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { TicketType } from "./ticketType";
import { useGetEventsById } from "@/hooks/events";
import { formatFullDate } from "@/lib/formateDate";
import dynamic from "next/dynamic";

const Page = () => {
  const MapView = dynamic(() => import("../../../../components/mapView"), {
    ssr: false,
  });
  const { id } = useParams<{ id: string }>();
  const { events, isLoading, isError, refetch } = useGetEventsById({
    postId: id,
  });

  if (isLoading) {
    return (
      <div className="p-10 text-center text-lg">Loading event details…</div>
    );
  }

  if (isError) {
    return (
      <div className="p-10 text-center text-red-500">
        Failed to load event.
        <button onClick={() => refetch()} className="underline ml-2">
          Try again
        </button>
      </div>
    );
  }

  if (!events) {
    return <div className="p-10 text-center">Event not found 😔.</div>;
  }

  // Safe calculations
  const total = events.capacity?.total ?? 0;
  const current = events.capacity?.current ?? 0;

  const remaining = Math.max(0, total - current);
  const tenPercent = total * 0.1;

  // Color logic
  const capacityColor =
    remaining <= 0
      ? "bg-red-300"
      : remaining <= tenPercent
      ? "bg-yellow-300"
      : "bg-green-300";

  return (
    <div>
      <div className="max-w-8xl mx-auto px-4 md:px-6 py-12 border-t grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-16">
        <div className="relative min-h-[400px] md:min-h-[600px]">
          <div className="sticky top-28">
            <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl border border-gray-200">
              <Image
                src={events.imageSrc || "/test.avif"}
                alt={events.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Event Details */}
        <div className="flex flex-col gap-4 text-base md:text-lg leading-relaxed max-w-prose">
          <h2 className="capitalize text-xl md:text-4xl font-semibold bg-linear-to-r from-zinc-900 to-zinc-400 bg-clip-text text-transparent">
            {events.name}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 divide-x-2 w-full">
            {[
              {
                title: "Location",
                icon: IconMapPinFilled,
                details: events.location.formatted ?? "Unknown location",
              },
              {
                title: "Date",
                icon: IconCalendar,
                details: formatFullDate(events.date.start) ?? "Unknown date",
              },
              {
                title: "Duration",
                icon: IconClock,
                details: events.duration ?? "N/A",
              },
            ].map((info, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="flex items-center space-x-2">
                  <info.icon size={15} />
                  <span className="text-sm font-semibold">{info.title}</span>
                </div>
                <p className="text-xs text-gray-500 capitalize">
                  {info.details}
                </p>
              </div>
            ))}
          </div>

          {/* Capacity */}
          <p className="text-sm text-zinc-900">
            Event capacity —{" "}
            <span
              className={cn(
                "rounded-full px-3 py-0.5 border border-black/50",
                capacityColor
              )}
            >
              {current} / {total}
            </span>
          </p>

          <div>
            <h2 className="font-semibold text-zinc-800 underline">
              About this event
            </h2>
            <p className="text-base text-zinc-800">{events.description}</p>
          </div>

          <div>
            <p className="pt-3 text-base underline">
              Click on the ticket type you want to order
            </p>
            <TicketType data={events?.ticketsType} />
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6">
        <MapView lat={events.location.lat} lng={events.location.lng} />
      </div>
    </div>
  );
};

export default Page;
