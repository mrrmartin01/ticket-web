"use client";

import { useMemo, useState } from "react";
import {
  IconBookmark,
  IconHeart,
  IconSparkles,
} from "@tabler/icons-react";
import { tickets } from "@/data/tickets";
import TicketCard from "@/components/eventCard";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Balatro from "@/components/Balatro";

type FilterType = "all" | "wishlist" | "favorites";

// Constants
const FILTER_CONFIG: Record<FilterType, { label: string; message: string }> = {
  all: { label: "All Saved", message: "Showing all saved events" },
  wishlist: {
    label: "Wishlist",
    message: "Showing wishlist events",
  },
  favorites: {
    label: "Favorites",
    message: "Showing favorite events",
  },
};

const SECTION_CONFIG = {
  wishlist: {
    id: "wishlist-events",
    title: "Wishlist",
    icon: IconBookmark,
    gradientBar: "bg-linear-to-b from-purple-400 to-purple-600",
    emptyMessage: "Your wishlist is empty",
    emptySubtext: "Start adding events you're interested in",
    countLabel: (count: number) => `${count} items saved`,
  },
  favorites: {
    id: "favorites-events",
    title: "Favorites",
    icon: IconHeart,
    gradientBar: "bg-linear-to-b from-rose-400 to-rose-600",
    emptyMessage: "No favorites yet",
    emptySubtext: "Mark your favorite events to find them quickly",
    countLabel: (count: number) => `${count} favorites`,
  },
};

// Utility Functions
const getEventsByCategory = () => {
  const wishlistEvents = tickets.slice(0, 2);
  const favoriteEvents = tickets.slice(2, 4);

  return { wishlistEvents, favoriteEvents };
};

// Components
const EventGrid = ({ events }: { events: typeof tickets }) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {events.map((ticket) => (
      <div
        key={ticket.id}
        id={`event-${ticket.id}`}
        className="group cursor-pointer hover:scale-[1.02] transition-transform duration-300"
      >
        <TicketCard data={ticket} />
      </div>
    ))}
  </div>
);

const EmptyState = ({ type }: { type: "wishlist" | "favorites" }) => {
  const config = SECTION_CONFIG[type];
  const Icon = config.icon;

  return (
    <div className="relative flex flex-col items-center justify-center border border-double border-zinc-300 bg-linear-to-br from-zinc-50 to-zinc-100 py-16 dark:border-zinc-700 dark:from-zinc-900/50 dark:to-zinc-800/50 overflow-hidden rounded-lg">
      <div className="absolute w-full inset-0 pointer-events-none">
        <Balatro
          isRotate={false}
          mouseInteraction={true}
          pixelFilter={700}
          color1="#000000"
          color2="#1b1b1b"
          color3="#000000"
          contrast={5}
        />
      </div>

      <div className="relative z-10 backdrop-blur-sm p-6 rounded-xl flex flex-col items-center justify-center">
        <Icon className="mb-4 h-16 w-16 text-zinc-100" strokeWidth={1.5} />
        <p className="text-lg font-semibold text-zinc-200">{config.emptyMessage}</p>
        <p className="text-sm text-zinc-400 mt-2 text-center">{config.emptySubtext}</p>
      </div>
    </div>
  );
};

const SavedSection = ({
  type,
  events,
}: {
  type: "wishlist" | "favorites";
  events: typeof tickets;
}) => {
  const config = SECTION_CONFIG[type];
  const Icon = config.icon;

  return (
    <section id={config.id} className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="shrink-0">
          <div className={`h-12 w-2 rounded-full ${config.gradientBar}`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Icon className="h-6 w-6" strokeWidth={2} />
            <h2 className="text-2xl font-bold tracking-tight">{config.title}</h2>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {config.countLabel(events.length)}
          </p>
        </div>
      </div>
      {events.length > 0 ? (
        <EventGrid events={events} />
      ) : (
        <EmptyState type={type} />
      )}
    </section>
  );
};

const FilterButtons = ({
  activeFilter,
  onChange,
}: {
  activeFilter: FilterType;
  onChange: (filter: FilterType) => void;
}) => (
  <div className="flex gap-2 flex-wrap">
    <Button
      onClick={() => onChange("all")}
      variant={activeFilter === "all" ? "default" : "outline"}
      className="rounded-full px-6 gap-2 cursor-pointer font-semibold"
    >
      <IconSparkles size={18} />
      All Items
    </Button>
    <Button
      onClick={() => onChange("wishlist")}
      variant={activeFilter === "wishlist" ? "default" : "outline"}
      className="rounded-full px-6 gap-2 cursor-pointer font-semibold"
    >
      <IconBookmark size={18} />
      Wishlist
    </Button>
    <Button
      onClick={() => onChange("favorites")}
      variant={activeFilter === "favorites" ? "default" : "outline"}
      className="rounded-full px-6 gap-2 cursor-pointer font-semibold"
    >
      <IconHeart size={18} />
      Favorites
    </Button>
  </div>
);

const ContentRenderer = ({
  filter,
  wishlistEvents,
  favoriteEvents,
}: {
  filter: FilterType;
  wishlistEvents: typeof tickets;
  favoriteEvents: typeof tickets;
}) => {
  switch (filter) {
    case "all":
      return (
        <div className="space-y-12">
          <SavedSection type="wishlist" events={wishlistEvents} />
          <SavedSection type="favorites" events={favoriteEvents} />
        </div>
      );
    case "wishlist":
      return <SavedSection type="wishlist" events={wishlistEvents} />;
    case "favorites":
      return <SavedSection type="favorites" events={favoriteEvents} />;
    default:
      return null;
  }
};

// Main Component
const SavedPage = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const { wishlistEvents, favoriteEvents } = useMemo(
    () => getEventsByCategory(),
    []
  );

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    toast.success(FILTER_CONFIG[filter].message);
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header Section */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Saved Events</h1>
          <p className="text-base text-muted-foreground max-w-xl">
            Curate your perfect event experience. Save events you love to your wishlist and mark your favorites for quick access.
          </p>
        </div>

        <FilterButtons
          activeFilter={activeFilter}
          onChange={handleFilterChange}
        />
      </div>

      {/* Content Section */}
      <ContentRenderer
        filter={activeFilter}
        wishlistEvents={wishlistEvents}
        favoriteEvents={favoriteEvents}
      />
    </div>
  );
};

export default SavedPage;