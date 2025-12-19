export const formatRelativeDate = (iso: string) => {
  const date = new Date(iso);
  const now = new Date();

  // Normalize times to avoid timezone-related mismatches
  const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const nowOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const diffMs = dateOnly.getTime() - nowOnly.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  if (diffDays === -1) return "Yesterday";

  if (diffDays > 1 && diffDays <= 7) {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
    }); // e.g. "Friday"
  }

  // Fallback → standard date format (still local timezone)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};


export const formatFullDate = (iso: string) => {
  const date = new Date(iso);

  return date.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

