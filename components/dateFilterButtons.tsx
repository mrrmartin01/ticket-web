"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export function DateFilterButtons() {
  const filters = [
    { id: 1, name: "All" },
    { id: 2, name: "Today" },
    { id: 3, name: "Tomorrow" },
    { id: 4, name: "This week" },
    { id: 5, name: "This weekend" },
    { id: 6, name: "Next week" },
    { id: 7, name: "Next weekend" },
    { id: 8, name: "This month" },
    { id: 9, name: "Next month" },
    { id: 10, name: "This year" },
    { id: 11, name: "Next year" },
  ];

  const [active, setActive] = useState<number>(1);

  return (
    <div className="w-full overflow-x-auto py-2 no-scrollbar">
      <div className="flex justify-center gap-2 w-max mx-auto">
        {filters.map((item) => (
          <Button
            key={item.id}
            onClick={() => {
              setActive(item.id);
              toast.success(`Selected: ${item.name}`);
            }}
            variant={active === item.id ? "default" : "outline"}
            className="rounded-full px-4 py-2 whitespace-nowrap"
          >
            {item.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
