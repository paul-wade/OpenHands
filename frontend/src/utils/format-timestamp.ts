import React from "react";

/**
 * Formats a timestamp for display in the UI
 */
export function formatTimestamp(timestamp: string): {
  relative: string;
  absolute: string;
  date: Date;
} {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  let relative: string;
  if (diffMinutes < 1) {
    relative = "just now";
  } else if (diffMinutes < 60) {
    relative = `${diffMinutes}m ago`;
  } else if (diffHours < 24) {
    relative = `${diffHours}h ago`;
  } else if (diffDays < 7) {
    relative = `${diffDays}d ago`;
  } else {
    relative = date.toLocaleDateString();
  }

  const absolute = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

  return { relative, absolute, date };
}

/**
 * Hook to get a formatted timestamp that updates every minute
 */
export function useFormattedTimestamp(timestamp: string) {
  const [formatted, setFormatted] = React.useState(() =>
    formatTimestamp(timestamp),
  );

  React.useEffect(() => {
    const updateTimestamp = () => {
      setFormatted(formatTimestamp(timestamp));
    };

    // Update immediately
    updateTimestamp();

    // Update every minute
    const interval = setInterval(updateTimestamp, 60000);

    return () => clearInterval(interval);
  }, [timestamp]);

  return formatted;
}
