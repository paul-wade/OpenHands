import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { formatTimestamp } from "../format-timestamp";

describe("formatTimestamp", () => {
  beforeEach(() => {
    // Mock Date.now() to return a fixed timestamp for consistent testing
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-01-01T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should return 'just now' for timestamps less than 1 minute ago", () => {
    const timestamp = "2024-01-01T11:59:30Z"; // 30 seconds ago
    const result = formatTimestamp(timestamp);

    expect(result.relative).toBe("just now");
    expect(result.absolute).toBe("1/1/2024 11:59:30 AM");
  });

  it("should return minutes for timestamps less than 1 hour ago", () => {
    const timestamp = "2024-01-01T11:45:00Z"; // 15 minutes ago
    const result = formatTimestamp(timestamp);

    expect(result.relative).toBe("15m ago");
  });

  it("should return hours for timestamps less than 24 hours ago", () => {
    const timestamp = "2024-01-01T09:00:00Z"; // 3 hours ago
    const result = formatTimestamp(timestamp);

    expect(result.relative).toBe("3h ago");
  });

  it("should return days for timestamps less than 7 days ago", () => {
    const timestamp = "2023-12-30T12:00:00Z"; // 2 days ago
    const result = formatTimestamp(timestamp);

    expect(result.relative).toBe("2d ago");
  });

  it("should return date for timestamps more than 7 days ago", () => {
    const timestamp = "2023-12-20T12:00:00Z"; // 12 days ago
    const result = formatTimestamp(timestamp);

    expect(result.relative).toBe("12/20/2023");
  });

  it("should return correct absolute timestamp", () => {
    const timestamp = "2024-01-01T10:30:45Z";
    const result = formatTimestamp(timestamp);

    expect(result.absolute).toBe("1/1/2024 10:30:45 AM");
  });

  it("should return correct Date object", () => {
    const timestamp = "2024-01-01T10:30:45Z";
    const result = formatTimestamp(timestamp);

    expect(result.date).toEqual(new Date(timestamp));
  });
});
