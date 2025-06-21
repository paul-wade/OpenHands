import React, { useState, useEffect, useRef } from "react";
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
  const timestampRef = useRef(timestamp);

  // Keep ref updated with current timestamp
  useEffect(() => {
    timestampRef.current = timestamp;
    setTimestampData(formatTimestamp(timestamp));
  }, [timestamp]);

  // Set up interval to update timestamps
  useEffect(() => {
    const updateTime = () => {
      setTimestampData(formatTimestamp(timestampRef.current));
    };

    // Update every 5 seconds to show seconds granularity for recent messages
    // This is a good balance between accuracy and performance
    const interval = setInterval(updateTime, 5000);

    return () => clearInterval(interval);
  }, []); // Empty dependency array so interval runs continuously

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