/**
 * Formats a timestamp into a relative time string (e.g., "2 minutes ago", "1 hour ago")
 */
export function formatRelativeTime(timestamp: string): string {
  const now = new Date();
  const date = new Date(timestamp);
  const diffMs = now.getTime() - date.getTime();

  // Less than 1 minute
  if (diffMs < 60000) {
    return "just now";
  }

  // Less than 1 hour
  if (diffMs < 3600000) {
    const minutes = Math.floor(diffMs / 60000);
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  }

  // Less than 1 day
  if (diffMs < 86400000) {
    const hours = Math.floor(diffMs / 3600000);
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  }

  // Less than 1 week
  if (diffMs < 604800000) {
    const days = Math.floor(diffMs / 86400000);
    return `${days} day${days === 1 ? "" : "s"} ago`;
  }

  // More than 1 week - show absolute date
  return date.toLocaleDateString();
}

/**
 * Formats a timestamp into an absolute time string
 */
export function formatAbsoluteTime(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleString();
}

/**
 * Formats a timestamp into abbreviated relative time (e.g., "2m ago", "1h ago")
 */
function formatAbbreviatedRelativeTime(timestamp: string): string {
  const now = new Date();
  const date = new Date(timestamp);
  const diffMs = now.getTime() - date.getTime();

  // Less than 1 minute
  if (diffMs < 60000) {
    return "just now";
  }

  // Less than 1 hour
  if (diffMs < 3600000) {
    const minutes = Math.floor(diffMs / 60000);
    return `${minutes}m ago`;
  }

  // Less than 1 day
  if (diffMs < 86400000) {
    const hours = Math.floor(diffMs / 3600000);
    return `${hours}h ago`;
  }

  // Less than 1 week
  if (diffMs < 604800000) {
    const days = Math.floor(diffMs / 86400000);
    return `${days}d ago`;
  }

  // More than 1 week - show absolute date
  return date.toLocaleDateString();
}

/**
 * Formats a timestamp into an object with relative, absolute, and date properties
 */
export function formatTimestamp(timestamp: string): {
  relative: string;
  absolute: string;
  date: Date;
} {
  const date = new Date(timestamp);
  return {
    relative: formatAbbreviatedRelativeTime(timestamp),
    absolute: formatAbsoluteTime(timestamp),
    date,
  };
}

/**
 * Calculates the duration between two timestamps and formats it as a human-readable string
 */
export function formatDuration(startTime: string, endTime: string): string {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const diffMs = end.getTime() - start.getTime();

  if (diffMs < 1000) {
    return `${diffMs}ms`;
  }

  // For durations less than 1 minute, show seconds with decimal
  if (diffMs < 60000) {
    const seconds = (diffMs / 1000).toFixed(1);
    return `${seconds}s`;
  }

  const minutes = Math.floor(diffMs / 60000);
  const seconds = Math.floor((diffMs % 60000) / 1000);
  return `${minutes}m ${seconds}s`;
}