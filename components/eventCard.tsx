import Image from "next/image";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { IconMapPinFilled } from "@tabler/icons-react";
import Link from "next/link";
import { EventItem } from "@/types/events";
import { formatFullDate, formatRelativeDate } from "@/lib/formateDate";

const EventCard = ({ data }: { data: EventItem }) => {
  const { id, name, description, ticketsType, location, date, image } = data;

  const dateReadable = formatRelativeDate(date);
  const dateFull = formatFullDate(date);
  return (
    <Link
      href={`/events/${id}`}
      className="flex flex-col rounded-lg w-[320px] border hover:scale-105 hover:shadow-2xl transition-all duration-500"
    >
      <div className="relative w-full aspect-4/3">
        <Image
          src={image || "/test.avif"}
          alt={name}
          fill
          className="object-cover rounded-t-md"
          sizes="400px"
        />

        <div className="absolute top-2 left-3">
          <Tooltip>
            <TooltipTrigger>
              <Button
                asChild
                className="rounded-3xl border border-zinc-400 bg-zinc-950/70"
              >
                <p>{dateReadable}</p>
              </Button>
            </TooltipTrigger>

            <TooltipContent>
              <p>{dateFull}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2 min-h-[150px] justify-between">
        {name && <h3 className="font-semibold line-clamp-2 capitalize">{name}</h3>}

        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        )}

        {ticketsType.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1 overflow-none">
            {ticketsType.map((ticket) => (
              <span
                key={ticket.id}
                className="text-sm rounded-full border border-zinc-400 bg-zinc-200 px-3"
              >
                {ticket.name}
              </span>
            ))}
          </div>
        )}

        {location && (
          <p className="flex gap-1 items-center">
            <IconMapPinFilled size={17} fill="gray" />
            <span className="text-sm text-zinc-900 capitalize">{location}</span>
          </p>
        )}
      </div>
    </Link>
  );
};

export default EventCard;
