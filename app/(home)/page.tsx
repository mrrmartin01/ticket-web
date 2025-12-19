"use client";
import { DateFilterButtons } from "@/components/dateFilterButtons";
import { Hero } from "@/components/hero";
import EventCard from "@/components/eventCard";
import { useGetEvents } from "@/hooks/events";
import EventsCardSkeleton from "@/components/eventsCardSkeleton";

export default function Home() {
  const { events, isLoading, isError, refetch } = useGetEvents();

  if (isError) {
    return (
      <div className="text-red-500">
        Error loading events.{" "}
        <button onClick={() => void refetch()} className="underline">
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="items-center justify-center font-sans bg-zinc-50 dark:bg-black">
      <Hero />

      <div className="mt-5">
        <DateFilterButtons />
      </div>

      <div className="w-full flex justify-center px-5 my-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {events.map((item) => (
            <EventCard key={item.id} data={item} />
          ))}
        </div>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {Array.from({ length: 20 }).map((_, i) => (
            <EventsCardSkeleton key={i} />
          ))}
        </div>
      )}
    </div>
  );
}
