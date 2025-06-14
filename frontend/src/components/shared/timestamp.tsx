import React from "react";
import { cn } from "#/utils/utils";
import { useFormattedTimestamp } from "#/utils/format-timestamp";

interface TimestampProps {
  timestamp: string;
  className?: string;
  showOnHover?: boolean;
}

export function Timestamp({
  timestamp,
  className,
  showOnHover = false,
}: TimestampProps) {
  const [isHovering, setIsHovering] = React.useState(false);
  const formatted = useFormattedTimestamp(timestamp);

  return (
    <time
      dateTime={timestamp}
      title={formatted.absolute}
      className={cn(
        "text-xs text-neutral-400 transition-opacity duration-200",
        showOnHover && !isHovering && "opacity-0",
        showOnHover && isHovering && "opacity-100",
        !showOnHover && "opacity-70",
        className,
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {formatted.relative}
    </time>
  );
}
