import { useMemo } from "react";
import { OpenHandsAction } from "#/types/core/actions";
import { OpenHandsObservation } from "#/types/core/observations";
import { isUserMessage } from "#/types/core/guards";

/**
 * Hook to calculate response time for AI messages by finding the most recent user message
 */
export function useResponseTime(
  currentEvent: OpenHandsAction | OpenHandsObservation,
  allEvents: (OpenHandsAction | OpenHandsObservation)[],
): string | undefined {
  return useMemo(() => {
    // Only calculate response time for agent messages
    if (currentEvent.source !== "agent") {
      return undefined;
    }

    // Find the most recent user message before this event
    const currentIndex = allEvents.findIndex(
      (event) => event.id === currentEvent.id,
    );
    if (currentIndex === -1) return undefined;

    // Look backwards for the most recent user message
    for (let i = currentIndex - 1; i >= 0; i -= 1) {
      const event = allEvents[i];
      if (isUserMessage(event)) {
        return event.timestamp;
      }
    }

    return undefined;
  }, [currentEvent, allEvents]);
}
