import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { TicketPurchaseDialog } from "./ticketPurchaseDialog";
import { TicketType as ITicketType } from "@/types/events";
import { getSymbol } from "@/lib/currencyConvertor";

interface TicketTypeProps {
  data: ITicketType[];
}

export function TicketType({ data }: TicketTypeProps) {
  const [selectedTicket, setSelectedTicket] =
    React.useState<ITicketType | null>(null);

  if (!Array.isArray(data)) return null;

  return (
    <div className="w-full max-w-5xl mx-auto py-5">
      <Carousel opts={{ align: "start", loop: true }} className="w-full">
        <CarouselContent>
          {data.map((ticket) => (
            <CarouselItem
              key={ticket.id}
              className="basis-1/2 sm:basis-1/2 lg:basis-1/3"
            >
              <Card
                onClick={() => setSelectedTicket(ticket)}
                className={cn(
                  "relative w-full h-full overflow-hidden border-2 cursor-pointer transition-all duration-300 hover:shadow-xl"
                )}
              >
                {ticket.quantityAvailable === 0 && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                    <div className="w-[140%] rotate-[-40deg] bg-destructive text-white text-sm font-extrabold tracking-widest text-center py-2 shadow-lg">
                      SOLD OUT
                    </div>
                  </div>
                )}

                {ticket.badge && (
                  <div className="absolute top-0 right-0 z-10 w-full bg-primary text-primary-foreground text-xs font-bold text-center">
                    {ticket.badge}
                  </div>
                )}

                {ticket.group && (
                  <div className="absolute bottom-0 right-0 z-10 w-full bg-primary text-primary-foreground text-xs font-bold text-center">
                    Group Ticket
                  </div>
                )}

                <CardContent className="flex flex-col h-full p-2">
                  <h3 className="capitalize text-lg font-extrabold tracking-tight">
                    {ticket.name}
                  </h3>

                  <span className="text-xl font-mono font-semibold">
                    {getSymbol(ticket.currency)}
                    {ticket.price}
                  </span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {data.length > 4 && (
          <div className="flex justify-center gap-4 mt-8">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        )}
      </Carousel>

      <TicketPurchaseDialog
        ticket={selectedTicket}
        open={Boolean(selectedTicket)}
        onClose={() => setSelectedTicket(null)}
      />
    </div>
  );
}
