"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { toast } from "sonner";

const schema = z.object({
  query: z.string().min(1, "Enter a search term"),
});

export type SearchBarValues = z.infer<typeof schema>;

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

function onSearch(values: z.infer<typeof schema>) {
  try {
    console.log(values);
    toast.success("Successful search");
  } catch (error) {
    console.error("Form submission error", error);
    toast.error("Failed to submit the form. Please try again.");
  }
}

export default function SearchBar({
  placeholder = "Search...",
  className = "",
}: SearchBarProps) {
  const form = useForm<SearchBarValues>({
    resolver: zodResolver(schema),
    defaultValues: { query: "" },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSearch)}
        className={`relative w-full max-w-lg bg-white ${className}`}
      >
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    placeholder={placeholder}
                    {...field}
                    className="pl-10 h-12 border border-zinc-700"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
