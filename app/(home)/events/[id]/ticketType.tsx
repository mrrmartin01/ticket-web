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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IconFlame } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { TicketType as ITicketType } from "@/types/events";
import { getSymbol } from "@/lib/currencyConvertor";

interface TicketTypeProps {
  data: ITicketType[];
}

export function TicketType({ data }: TicketTypeProps) {
  const [selected, setSelected] = React.useState<ITicketType | null>(null);

  if (!data || !Array.isArray(data)) return null;

  return (
    <div className="w-full max-w-5xl mx-auto py-5">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="">
          {data.map((ticket, index) => {
            return (
              <CarouselItem
                key={index}
                className="basis-1/2 sm:basis-1/2 lg:basis-1/3 "
              >
                <div className="h-full">
                  <Dialog>
                    <div>
                      <DialogTrigger
                        asChild
                        onClick={() => setSelected(ticket)}
                      >
                        <Card
                          className={cn(
                            "relative w-full h-full overflow-hidden border-2 cursor-pointer transition-all duration-300 hover:shadow-xl"
                          )}
                        >
                          {ticket?.quantityAvailable === 0 && (
                            <div className="w-full pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
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

                          {ticket?.group && (
                            <div className="absolute bottom-0 right-0 z-10 w-full bg-primary text-primary-foreground text-xs font-bold text-center">
                              Group Ticket
                            </div>
                          )}

                          <CardContent className="flex flex-col h-full p-2">
                            <h3 className="capitalize text-lg md:text-sm lg:text-lg font-extrabold tracking-tight">
                              {ticket.name}
                            </h3>

                            <div className="mt-px">
                              <span className="text-sm md:text-xl font-mono font-semibold">
                                {getSymbol(ticket.currency)}
                                {ticket.price}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      </DialogTrigger>
                      {selected && (
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>
                              Is this the ticket you want to purchase?
                            </DialogTitle>

                            <DialogDescription>
                              <span className="mt-3 flex space-x-2 font-bold text-lg">
                                <span className="capitalize">
                                  {selected.name} -
                                </span>
                                <span>
                                  <span className="text-black text-xl">
                                    {getSymbol(selected.currency)}
                                    {selected.price}
                                  </span>
                                  {selected?.group && (
                                    <span className="ml-1 text-xs text-muted-foreground">
                                      /per person
                                    </span>
                                  )}
                                </span>
                              </span>
                            </DialogDescription>
                          </DialogHeader>
                          <ul className="pl-2 space-y-2">
                            {ticket?.quantityAvailable === 0 ? (
                              <li className="text-red-500 text-xl">Sold Out</li>
                            ) : (
                              selected?.features?.map((feature) => (
                                <li
                                  key={feature}
                                  className="flex items-center text-gray-800"
                                >
                                  <IconFlame
                                    size={15}
                                    className="mr-1 text-gray-400"
                                  />
                                  {feature}
                                </li>
                              ))
                            )}
                          </ul>

                          <DialogFooter className="sm:justify-start mt-3">
                            <DialogClose asChild>
                              {ticket?.quantityAvailable !== 0 && (
                                <Button
                                  type="button"
                                  className="cursor-pointer"
                                >
                                  Proceed to payment
                                </Button>
                              )}
                            </DialogClose>
                            <DialogClose asChild>
                              <Button
                                type="button"
                                variant="outline"
                                className="cursor-pointer"
                              >
                                Close
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      )}
                    </div>
                  </Dialog>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        {data.length > 4 && (
          <div className="flex justify-center gap-4 mt-8">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        )}
      </Carousel>
    </div>
  );
}
