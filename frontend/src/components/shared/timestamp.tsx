import React from "react";
import { formatTimestamp, formatDuration } from "#/utils/format-timestamp";
import { cn } from "#/utils/utils";

interface TimestampProps {
  timestamp: string;
  responseTime?: string; // For AI responses, this would be the user message timestamp
  className?: string;
}

export function Timestamp({
  timestamp,
  responseTime,
  className,
}: TimestampProps) {
  const [formattedTime, setFormattedTime] = React.useState(() =>
    formatTimestamp(timestamp),
  );

  // Update relative time every minute
  React.useEffect(() => {
    const updateTime = () => {
      setFormattedTime(formatTimestamp(timestamp));
    };

    // Update immediately
    updateTime();

    // Then update every minute
    const interval = setInterval(updateTime, 60000);

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
        "text-xs text-neutral-400 select-none",
        className,
      )}
    >
      {formattedTime.relative}
      {duration && <span className="ml-1 text-neutral-500">• {duration}</span>}
    </time>
  );
}