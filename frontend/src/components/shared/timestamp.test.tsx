import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { Timestamp } from "./timestamp";

describe("Timestamp", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-01-01T12:00:00.000Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should render relative time", () => {
    const timestamp = "2024-01-01T11:45:00.000Z"; // 15 minutes ago
    render(<Timestamp timestamp={timestamp} />);
    
    expect(screen.getByText("15m 0s ago")).toBeInTheDocument();
  });

  it("should show response time when provided", () => {
    const timestamp = "2024-01-01T11:45:00.000Z";
    const responseTime = "2024-01-01T11:44:00.000Z"; // 1 minute response time
    render(<Timestamp timestamp={timestamp} responseTime={responseTime} />);
    
    expect(screen.getByText(/15m 0s ago/)).toBeInTheDocument();
    expect(screen.getByText(/• 1m 0s/)).toBeInTheDocument();
  });

  it("should have correct title attribute with absolute time", () => {
    const timestamp = "2024-01-01T11:45:00.000Z";
    render(<Timestamp timestamp={timestamp} />);
    
    const timeElement = screen.getByRole("time");
    expect(timeElement).toHaveAttribute("title", expect.stringContaining("1/1/2024"));
  });

  it("should include response time in title when provided", () => {
    const timestamp = "2024-01-01T11:45:00.000Z";
    const responseTime = "2024-01-01T11:44:00.000Z";
    render(<Timestamp timestamp={timestamp} responseTime={responseTime} />);
    
    const timeElement = screen.getByRole("time");
    expect(timeElement).toHaveAttribute("title", expect.stringContaining("Response time: 1m 0s"));
  });

  it("should have correct datetime attribute", () => {
    const timestamp = "2024-01-01T11:45:00.000Z";
    render(<Timestamp timestamp={timestamp} />);
    
    const timeElement = screen.getByRole("time");
    expect(timeElement).toHaveAttribute("datetime", timestamp);
  });

  it("should apply custom className", () => {
    const timestamp = "2024-01-01T11:45:00.000Z";
    render(<Timestamp timestamp={timestamp} className="custom-class" />);
    
    const timeElement = screen.getByRole("time");
    expect(timeElement).toHaveClass("custom-class");
  });
});