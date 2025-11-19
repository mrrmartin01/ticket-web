import { DateFilterButtons } from "@/components/dateFilterButtons";
import { Hero } from "@/components/hero";
import TicketCard from "@/components/ticketCard";
import { tickets } from "@/data/tickets";

export default function Home() {
  return (
    <div className="items-center justify-center font-sans bg-zinc-50 dark:bg-black">
      <Hero />
      <div className="mt-5">
        <DateFilterButtons />
      </div>
      <div className="w-full flex justify-center px-5 my-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {tickets.map((item) => (
            <TicketCard key={item.title} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
