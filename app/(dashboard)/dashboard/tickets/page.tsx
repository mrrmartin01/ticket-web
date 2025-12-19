"use client";

import { useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  IconCalendarEvent,
  IconChecks,
  IconSparkles,
} from "@tabler/icons-react";
import { tickets } from "@/data/tickets";
import TicketCard from "@/components/eventCard";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Balatro from "@/components/Balatro";

type FilterType = "all" | "upcoming" | "past";

// Constants
const MONTH_MAP: { [key: string]: number } = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

const CURRENT_DATE = new Date("2025-11-28");

const FILTER_CONFIG: Record<FilterType, { label: string; message: string }> = {
  all: { label: "All Events", message: "Showing all events" },
  upcoming: { label: "Upcoming Events", message: "Showing upcoming events" },
  past: { label: "Past Events", message: "Showing past events" },
};

const SECTION_CONFIG = {
  upcoming: {
    id: "upcoming-events",
    title: "Upcoming Events",
    icon: IconCalendarEvent,
    gradientBar: "bg-linear-to-b from-blue-400 to-blue-600",
    emptyMessage: "No upcoming events at the moment",
    emptySubtext: "Check back soon for new events!",
    countLabel: (count: number) => `${count} events coming up`,
  },
  past: {
    id: "past-events",
    title: "Past Events",
    icon: IconChecks,
    gradientBar: "bg-linear-to-b from-amber-400 to-amber-600",
    emptyMessage: "No past events yet",
    emptySubtext: "Explore upcoming events to create memories!",
    countLabel: (count: number) => `${count} events completed`,
  },
};

// Utility Functions
const parseDate = (dateStr: string): Date => {
  const parts = dateStr.split(" ");
  const day = parseInt(parts[0]);
  const month = MONTH_MAP[parts[1]];
  const year = 2025;
  return new Date(year, month - 1, day);
};

const categorizeEvents = () => {
  const upcoming: typeof tickets = [];
  const past: typeof tickets = [];

  tickets.forEach((ticket) => {
    const eventDate = parseDate(ticket.date);
    if (eventDate >= CURRENT_DATE) {
      upcoming.push(ticket);
    } else {
      past.push(ticket);
    }
  });

  upcoming.sort(
    (a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime()
  );
  past.sort(
    (a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime()
  );

  return { upcoming, past };
};

// Components
const EventGrid = ({
  events,
  isPast,
}: {
  events: typeof tickets;
  isPast?: boolean;
}) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {events.map((ticket) => (
      <div
        key={ticket.id}
        id={`event-${ticket.id}`}
        className={`group cursor-pointer ${
          isPast ? "saturate-50 hover:saturate-100 transition-opacity" : ""
        }`}
      >
        <TicketCard data={ticket} />
      </div>
    ))}
  </div>
);

const EmptyState = ({ type }: { type: "upcoming" | "past" }) => {
  const config = SECTION_CONFIG[type];
  const Icon = config.icon;

  return (
    <div className="relative flex flex-col items-center justify-center border border-double border-zinc-300 bg-linear-to-br from-zinc-50 to-zinc-100 py-16 dark:border-zinc-700 dark:from-zinc-900/50 dark:to-zinc-800/50 overflow-hidden">
      <div className="absolute w-full inset-0 pointer-events-none">
        <Balatro isRotate={false} mouseInteraction={true} pixelFilter={700} color1="#000000" color2="#1b1b1b" color3="#000000" contrast={5}/>
      </div>

      {/* Content */}
      <div className="relative z-10 backdrop-blur-xs p-3 rounded-3 flex flex-col items-center justify-center">
        <Icon className="mb-4 h-12 w-12 text-zinc-100" strokeWidth={1.5} />
        <p className="text-sm text-zinc-200">{config.emptyMessage}</p>
        <p className="text-xs text-zinc-300 mt-1">{config.emptySubtext}</p>
      </div>
    </div>
  );
};

const EventSection = ({
  type,
  events,
}: {
  type: "upcoming" | "past";
  events: typeof tickets;
}) => {
  const config = SECTION_CONFIG[type];

  return (
    <section id={config.id} className="space-y-4">
      <div className="flex items-center gap-3">
        <div className={`h-8 w-1 rounded-full ${config.gradientBar}`} />
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{config.title}</h2>
          <p className="text-sm text-muted-foreground">
            {config.countLabel(events.length)}
          </p>
        </div>
      </div>
      {events.length > 0 ? (
        <EventGrid events={events} isPast={type === "past"} />
      ) : (
        <EmptyState type={type} />
      )}
    </section>
  );
};

const FilterButtons = ({
  activeFilter,
  upcomingCount,
  pastCount,
  onChange,
}: {
  activeFilter: FilterType;
  upcomingCount: number;
  pastCount: number;
  onChange: (filter: FilterType) => void;
}) => (
  <div className="flex gap-2 pt-2 flex-wrap">
    <Button
      onClick={() => onChange("all")}
      variant={activeFilter === "all" ? "default" : "outline"}
      className="rounded-full px-6 gap-2 cursor-pointer"
    >
      <IconSparkles size={18} />
      All Events
    </Button>
    <Button
      onClick={() => onChange("upcoming")}
      variant={activeFilter === "upcoming" ? "default" : "outline"}
      className="rounded-full px-6 gap-2 cursor-pointer"
    >
      <IconCalendarEvent size={18} />
      Upcoming ({upcomingCount})
    </Button>
    <Button
      onClick={() => onChange("past")}
      variant={activeFilter === "past" ? "default" : "outline"}
      className="rounded-full px-6 gap-2 cursor-pointer"
    >
      <IconChecks size={18} />
      Past ({pastCount})
    </Button>
  </div>
);

const ContentRenderer = ({
  filter,
  upcomingEvents,
  pastEvents,
}: {
  filter: FilterType;
  upcomingEvents: typeof tickets;
  pastEvents: typeof tickets;
}) => {
  switch (filter) {
    case "all":
      return (
        <div className="space-y-8">
          <EventSection type="upcoming" events={upcomingEvents} />
          <EventSection type="past" events={pastEvents} />
        </div>
      );
    case "upcoming":
      return <EventSection type="upcoming" events={upcomingEvents} />;
    case "past":
      return <EventSection type="past" events={pastEvents} />;
    default:
      return null;
  }
};

// Main Component
const TicketsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterParam = searchParams?.get("filter") as FilterType | null;
  const activeFilter: FilterType = filterParam && ["all", "upcoming", "past"].includes(filterParam) ? filterParam : "all";

  const { upcoming: upcomingEvents, past: pastEvents } = useMemo(
    () => categorizeEvents(),
    []
  );

  const handleFilterChange = (filter: FilterType) => {
    router.push(`/dashboard/tickets?filter=${filter}`);
    toast.success(FILTER_CONFIG[filter].message);
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Your Tickets</h1>
          <p className="text-muted-foreground">
            Manage and discover your upcoming and past events
          </p>
        </div>

        <FilterButtons
          activeFilter={activeFilter}
          upcomingCount={upcomingEvents.length}
          pastCount={pastEvents.length}
          onChange={handleFilterChange}
        />
      </div>

      {/* Content Section */}
      <ContentRenderer
        filter={activeFilter}
        upcomingEvents={upcomingEvents}
        pastEvents={pastEvents}
      />
    </div>
  );
};

export default TicketsPage;
