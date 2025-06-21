import React, { useState, useEffect } from "react";
import { cn } from "#/utils/utils";
import {
  formatTimestamp,
  formatDuration,
} from "#/utils/format-timestamp";

interface TimestampProps {
  timestamp: string;
  responseTime?: string; // Timestamp of the user message that triggered this response
  className?: string;
}

/**
 * A timestamp component that displays relative time and updates automatically.
 * Shows response time for agent messages when available.
 */
export function Timestamp({
  timestamp,
  responseTime,
  className,
}: TimestampProps) {
  const [timestampData, setTimestampData] = useState(
    formatTimestamp(timestamp),
  );

  // Update relative time every minute
  useEffect(() => {
    const updateTime = () => {
      setTimestampData(formatTimestamp(timestamp));
    };

    // Update immediately
    updateTime();

    // Set up interval to update every minute
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, [timestamp]);

  const duration = responseTime
    ? formatDuration(responseTime, timestamp)
    : undefined;

  const title = duration
    ? `${timestampData.absolute}\nResponse time: ${duration}`
    : timestampData.absolute;

  const displayText = duration
    ? `${timestampData.relative} • ${duration}`
    : timestampData.relative;

  return (
    <time
      className={cn("text-xs text-neutral-400 select-none", className)}
      title={title}
      dateTime={timestamp}
    >
      {displayText}
    </time>
  );
}