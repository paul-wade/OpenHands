export interface FormattedTimestamp {
  relative: string;
  absolute: string;
  date: Date;
}

export function formatTimestamp(timestamp: string): FormattedTimestamp {
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

  const absolute = date.toLocaleString();

  return { relative, absolute, date };
}

export function formatDuration(startTime: string, endTime: string): string {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const diffMs = end.getTime() - start.getTime();

  if (diffMs < 1000) {
    return `${diffMs}ms`;
  }
  if (diffMs < 60000) {
    return `${(diffMs / 1000).toFixed(1)}s`;
  }
  const minutes = Math.floor(diffMs / 60000);
  const seconds = Math.floor((diffMs % 60000) / 1000);
  return `${minutes}m ${seconds}s`;
}
