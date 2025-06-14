import React from "react";
import { formatTimestamp, formatDuration } from "#/utils/format-timestamp";
import { cn } from "#/utils/utils";

interface TimestampProps {
  timestamp: string;
  responseTime?: string; // For AI responses, this would be the user message timestamp
  className?: string;
  alwaysVisible?: boolean; // If true, always show timestamp, not just on hover
}

export function Timestamp({
  timestamp,
  responseTime,
  className,
  alwaysVisible = false,
}: TimestampProps) {
  const [formattedTime, setFormattedTime] = React.useState(() =>
    formatTimestamp(timestamp),
  );

  // Update relative time every minute
  React.useEffect(() => {
    const interval = setInterval(() => {
      setFormattedTime(formatTimestamp(timestamp));
    }, 60000);

    return () => clearInterval(interval);
  }, [timestamp]);

  const duration = responseTime
    ? formatDuration(responseTime, timestamp)
    : null;

  return (
    <time
      dateTime={timestamp}
      title={`${formattedTime.absolute}${duration ? ` • Response time: ${duration}` : ""}`}
      className={cn(
        "text-xs text-neutral-400 select-none transition-opacity duration-200",
        alwaysVisible ? "opacity-100" : "opacity-0 group-hover:opacity-100",
        className,
      )}
    >
      {formattedTime.relative}
      {duration && <span className="ml-1 text-neutral-500">• {duration}</span>}
    </time>
  );
}
