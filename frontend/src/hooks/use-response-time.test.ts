import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useResponseTime } from "./use-response-time";
import { OpenHandsAction } from "#/types/core/actions";
import { OpenHandsObservation } from "#/types/core/observations";

// Mock events for testing
const createUserMessage = (id: string, timestamp: string): OpenHandsAction => ({
  id,
  timestamp,
  source: "user",
  action: "message",
  args: { content: "test message" },
});

const createAgentMessage = (id: string, timestamp: string): OpenHandsAction => ({
  id,
  timestamp,
  source: "agent",
  action: "message",
  message: "test response",
});

describe("useResponseTime", () => {
  it("should return undefined for user messages", () => {
    const userMessage = createUserMessage("1", "2024-01-01T12:00:00.000Z");
    const allEvents = [userMessage];

    const { result } = renderHook(() =>
      useResponseTime(userMessage, allEvents),
    );

    expect(result.current).toBeUndefined();
  });

  it("should return timestamp of most recent user message for agent messages", () => {
    const userMessage1 = createUserMessage("1", "2024-01-01T12:00:00.000Z");
    const userMessage2 = createUserMessage("2", "2024-01-01T12:05:00.000Z");
    const agentMessage = createAgentMessage("3", "2024-01-01T12:06:00.000Z");
    
    const allEvents = [userMessage1, userMessage2, agentMessage];

    const { result } = renderHook(() =>
      useResponseTime(agentMessage, allEvents),
    );

    expect(result.current).toBe("2024-01-01T12:05:00.000Z");
  });

  it("should return undefined if no user message found before agent message", () => {
    const agentMessage1 = createAgentMessage("1", "2024-01-01T12:00:00.000Z");
    const agentMessage2 = createAgentMessage("2", "2024-01-01T12:05:00.000Z");
    
    const allEvents = [agentMessage1, agentMessage2];

    const { result } = renderHook(() =>
      useResponseTime(agentMessage2, allEvents),
    );

    expect(result.current).toBeUndefined();
  });

  it("should return undefined if current event is not found in allEvents", () => {
    const userMessage = createUserMessage("1", "2024-01-01T12:00:00.000Z");
    const agentMessage = createAgentMessage("2", "2024-01-01T12:05:00.000Z");
    
    const allEvents = [userMessage];

    const { result } = renderHook(() =>
      useResponseTime(agentMessage, allEvents),
    );

    expect(result.current).toBeUndefined();
  });

  it("should find user message even with other events in between", () => {
    const userMessage = createUserMessage("1", "2024-01-01T12:00:00.000Z");
    const agentAction = createAgentMessage("2", "2024-01-01T12:01:00.000Z");
    const observation: OpenHandsObservation = {
      id: "3",
      timestamp: "2024-01-01T12:02:00.000Z",
      source: "agent",
      observation: "run",
      content: "Command executed",
      cause: "2",
    };
    const agentMessage = createAgentMessage("4", "2024-01-01T12:03:00.000Z");
    
    const allEvents = [userMessage, agentAction, observation, agentMessage];

    const { result } = renderHook(() =>
      useResponseTime(agentMessage, allEvents),
    );

    expect(result.current).toBe("2024-01-01T12:00:00.000Z");
  });
});