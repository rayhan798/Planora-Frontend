import { useMemo } from "react";
import type { Event } from "@/types/event.types";

export const useEventCard = (event: Event) => {
  const numericFee = useMemo(() => Number(event.fee) || 0, [event.fee]);

  const typeString = useMemo(() => {
    return event.isPublic
      ? numericFee === 0
        ? "Public Free"
        : "Public Paid"
      : numericFee === 0
      ? "Private Free"
      : "Private Paid";
  }, [event.isPublic, numericFee]);

  const formattedDate = useMemo(() => {
    return event.date
      ? new Date(event.date).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "Date N/A";
  }, [event.date]);

  return {
    numericFee,
    typeString,
    formattedDate,
  };
};