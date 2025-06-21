import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { formatTimestamp, formatDuration } from "./format-timestamp";

describe("formatTimestamp", () => {
  beforeEach(() => {
    // Mock Date.now() to return a fixed timestamp
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-01-01T12:00:00.000Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should return 'just now' for timestamps less than 10 seconds ago", () => {
    const timestamp = "2024-01-01T11:59:55.000Z"; // 5 seconds ago
    const result = formatTimestamp(timestamp);
    expect(result.relative).toBe("just now");
  });

  it("should return seconds for timestamps between 10 seconds and 1 minute ago", () => {
    const timestamp = "2024-01-01T11:59:30.000Z"; // 30 seconds ago
    const result = formatTimestamp(timestamp);
    expect(result.relative).toBe("30s ago");
  });

  it("should return minutes for timestamps less than 1 hour ago", () => {
    const timestamp = "2024-01-01T11:45:00.000Z"; // 15 minutes ago
    const result = formatTimestamp(timestamp);
    expect(result.relative).toBe("15m ago");
  });

  it("should return hours for timestamps less than 24 hours ago", () => {
    const timestamp = "2024-01-01T09:00:00.000Z"; // 3 hours ago
    const result = formatTimestamp(timestamp);
    expect(result.relative).toBe("3h ago");
  });

  it("should return days for timestamps less than 7 days ago", () => {
    const timestamp = "2023-12-30T12:00:00.000Z"; // 2 days ago
    const result = formatTimestamp(timestamp);
    expect(result.relative).toBe("2d ago");
  });

  it("should return formatted date for timestamps more than 7 days ago", () => {
    const timestamp = "2023-12-20T12:00:00.000Z"; // 12 days ago
    const result = formatTimestamp(timestamp);
    expect(result.relative).toBe("12/20/2023");
  });

  it("should return correct absolute timestamp", () => {
    const timestamp = "2024-01-01T11:45:00.000Z";
    const result = formatTimestamp(timestamp);
    expect(result.absolute).toBe(new Date(timestamp).toLocaleString());
  });

  it("should return correct date object", () => {
    const timestamp = "2024-01-01T11:45:00.000Z";
    const result = formatTimestamp(timestamp);
    expect(result.date).toEqual(new Date(timestamp));
  });
});

describe("formatDuration", () => {
  it("should format milliseconds correctly", () => {
    const start = "2024-01-01T12:00:00.000Z";
    const end = "2024-01-01T12:00:00.500Z";
    const result = formatDuration(start, end);
    expect(result).toBe("500ms");
  });

  it("should format seconds correctly", () => {
    const start = "2024-01-01T12:00:00.000Z";
    const end = "2024-01-01T12:00:02.500Z";
    const result = formatDuration(start, end);
    expect(result).toBe("2.5s");
  });

  it("should format minutes and seconds correctly", () => {
    const start = "2024-01-01T12:00:00.000Z";
    const end = "2024-01-01T12:02:30.000Z";
    const result = formatDuration(start, end);
    expect(result).toBe("2m 30s");
  });

  it("should handle zero duration", () => {
    const timestamp = "2024-01-01T12:00:00.000Z";
    const result = formatDuration(timestamp, timestamp);
    expect(result).toBe("0ms");
  });
});