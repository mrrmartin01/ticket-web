export default function EventsCardSkeleton() {
  return (
    <div className="flex flex-col rounded-lg w-[320px] border bg-white dark:bg-zinc-900 animate-pulse">
      {/* Image placeholder */}
      <div className="relative w-full aspect-4/3 rounded-t-md bg-gray-300 dark:bg-zinc-700">
        {/* Date badge placeholder */}
        <div className="absolute top-2 left-3 h-7 w-20 rounded-3xl bg-gray-400/70 dark:bg-zinc-600/70" />
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-3 min-h-[150px] justify-between">
        {/* Name lines */}
        <div className="space-y-2">
          <div className="h-4 w-3/4 rounded bg-gray-300 dark:bg-zinc-700" />
          <div className="h-4 w-1/2 rounded bg-gray-300 dark:bg-zinc-700" />
        </div>

        {/* Description lines */}
        <div className="space-y-2 mt-1">
          <div className="h-3 w-full rounded bg-gray-300 dark:bg-zinc-700" />
          <div className="h-3 w-5/6 rounded bg-gray-300 dark:bg-zinc-700" />
        </div>

        {/* Ticket type pills */}
        <div className="flex gap-2 mt-2">
          <div className="h-5 w-14 rounded-full bg-gray-300 dark:bg-zinc-700" />
          <div className="h-5 w-16 rounded-full bg-gray-300 dark:bg-zinc-700" />
        </div>

        {/* Location row */}
        <div className="flex items-center gap-2 mt-2">
          <div className="h-4 w-4 rounded bg-gray-300 dark:bg-zinc-700" />
          <div className="h-3 w-24 rounded bg-gray-300 dark:bg-zinc-700" />
        </div>
      </div>
    </div>
  );
}
