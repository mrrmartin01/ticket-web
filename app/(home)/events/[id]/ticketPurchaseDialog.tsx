import * as React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IconFlame } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { TicketType as ITicketType } from "@/types/events";
import { getSymbol } from "@/lib/currencyConvertor";
import { Input } from "@/components/ui/input";
import { useMakeBooking } from "@/hooks/booking";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema } from "@/lib/validation-schemas";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface TicketPurchaseDialogProps {
  ticket: ITicketType | null;
  open: boolean;
  onClose: () => void;
}

export function TicketPurchaseDialog({
  ticket,
  open,
  onClose,
}: TicketPurchaseDialogProps) {
  const { handleMakeBooking, isLoading } = useMakeBooking();

  const schema = React.useMemo(() => {
    return bookingSchema(ticket?.quantityAvailable ?? 1);
  }, [ticket?.quantityAvailable]);

  type BookingFormValues = z.infer<typeof schema>;

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { quantity: 1 },
  });

  React.useEffect(() => {
    if (ticket) {
      form.reset({ quantity: 1 });
    }
  }, [ticket, form]);

  const quantity = useWatch({
    control: form.control,
    name: "quantity",
  });

  if (!ticket) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Is this the ticket you want to purchase?</DialogTitle>

          <DialogDescription>
            <span className="mt-3 flex space-x-2 font-bold text-lg">
              <span className="capitalize">{ticket.name} -</span>
              <span>
                <span className="text-black text-xl">
                  {getSymbol(ticket.currency)}
                  {ticket.price}
                </span>
                {ticket.group && (
                  <span className="ml-1 text-xs text-muted-foreground">
                    /per person
                  </span>
                )}
              </span>
            </span>
          </DialogDescription>
        </DialogHeader>

        <ul className="pl-2 space-y-2">
          {ticket.quantityAvailable === 0 ? (
            <li className="text-red-500 text-xl">Sold Out</li>
          ) : (
            ticket.features?.map((feature) => (
              <li key={feature} className="flex items-center text-gray-800">
                <IconFlame size={15} className="mr-1 text-gray-400" />
                {feature}
              </li>
            ))
          )}
        </ul>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(async (values) => {
              await handleMakeBooking({
                items: [
                  {
                    ticketTypeId: ticket.id,
                    quantity: values.quantity,
                  },
                ],
              });
            })}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>

                  <div className="flex justify-between items-center gap-4">
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={ticket.quantityAvailable}
                        {...field}
                        className="w-1/5 "
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>

                    <p className="w-2/5 font-semibold">
                      Total = {getSymbol(ticket.currency)}
                      {ticket.price * (quantity ?? 1)}
                    </p>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex justify-between w-full flex-col sm:flex-row gap-2">
                <Button
                  className="cursor-pointer"
                  type="submit"
                  disabled={isLoading || ticket.quantityAvailable === 0}
                >
                  {isLoading ? "Processing..." : "Proceed to payment"}
                </Button>

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
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
