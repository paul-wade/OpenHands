import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { formatTimestamp, formatDuration } from "../format-timestamp";

describe("formatTimestamp", () => {
  beforeEach(() => {
    // Mock the current time to ensure consistent test results
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-01-15T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should format timestamp as 'just now' for very recent times", () => {
    const timestamp = "2024-01-15T11:59:30Z"; // 30 seconds ago
    const result = formatTimestamp(timestamp);

    expect(result.relative).toBe("just now");
    expect(result.absolute).toBe("1/15/2024, 11:59:30 AM");
    expect(result.date).toEqual(new Date(timestamp));
  });

  it("should format timestamp in minutes for recent times", () => {
    const timestamp = "2024-01-15T11:45:00Z"; // 15 minutes ago
    const result = formatTimestamp(timestamp);

    expect(result.relative).toBe("15m ago");
  });

  it("should format timestamp in hours for times within 24 hours", () => {
    const timestamp = "2024-01-15T09:00:00Z"; // 3 hours ago
    const result = formatTimestamp(timestamp);

    expect(result.relative).toBe("3h ago");
  });

  it("should format timestamp in days for times within a week", () => {
    const timestamp = "2024-01-13T12:00:00Z"; // 2 days ago
    const result = formatTimestamp(timestamp);

    expect(result.relative).toBe("2d ago");
  });

  it("should format timestamp as date for times older than a week", () => {
    const timestamp = "2024-01-01T12:00:00Z"; // 14 days ago
    const result = formatTimestamp(timestamp);

    expect(result.relative).toBe("1/1/2024");
  });

  it("should handle edge case of exactly 1 minute", () => {
    const timestamp = "2024-01-15T11:59:00Z"; // exactly 1 minute ago
    const result = formatTimestamp(timestamp);

    expect(result.relative).toBe("1m ago");
  });

  it("should handle edge case of exactly 1 hour", () => {
    const timestamp = "2024-01-15T11:00:00Z"; // exactly 1 hour ago
    const result = formatTimestamp(timestamp);

    expect(result.relative).toBe("1h ago");
  });
});

describe("formatDuration", () => {
  it("should format duration in milliseconds for very short durations", () => {
    const start = "2024-01-15T12:00:00.000Z";
    const end = "2024-01-15T12:00:00.500Z";

    expect(formatDuration(start, end)).toBe("500ms");
  });

  it("should format duration in seconds for short durations", () => {
    const start = "2024-01-15T12:00:00.000Z";
    const end = "2024-01-15T12:00:02.500Z";

    expect(formatDuration(start, end)).toBe("2.5s");
  });

  it("should format duration in minutes and seconds for longer durations", () => {
    const start = "2024-01-15T12:00:00Z";
    const end = "2024-01-15T12:02:30Z";

    expect(formatDuration(start, end)).toBe("2m 30s");
  });

  it("should handle exactly 1 second", () => {
    const start = "2024-01-15T12:00:00.000Z";
    const end = "2024-01-15T12:00:01.000Z";

    expect(formatDuration(start, end)).toBe("1.0s");
  });

  it("should handle exactly 1 minute", () => {
    const start = "2024-01-15T12:00:00Z";
    const end = "2024-01-15T12:01:00Z";

    expect(formatDuration(start, end)).toBe("1m 0s");
  });
});
