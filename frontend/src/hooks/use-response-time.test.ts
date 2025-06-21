import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useResponseTime } from "./use-response-time";
import { UserMessageAction, AssistantMessageAction } from "#/types/core/actions";
import { CommandObservation } from "#/types/core/observations";

// Mock events for testing
const createUserMessage = (id: number, timestamp: string): UserMessageAction => ({
  id,
  timestamp,
  source: "user",
  action: "message",
  message: "test message",
  args: { 
    content: "test message",
    image_urls: [],
    file_urls: []
  },
});

const createAgentMessage = (id: number, timestamp: string): AssistantMessageAction => ({
  id,
  timestamp,
  source: "agent",
  action: "message", 
  message: "test response",
  args: { 
    thought: "thinking about response",
    image_urls: [],
    file_urls: [],
    wait_for_response: false
  },
});

const createObservation = (id: number, timestamp: string, cause: number): CommandObservation => ({
  id,
  timestamp,
  source: "agent",
  observation: "run",
  message: "command output",
  cause,
  content: "command executed",
  extras: {
    command: "test command",
    metadata: {}
  },
});

describe("useResponseTime", () => {
  it("should return undefined for user messages", () => {
    const userMessage = createUserMessage(1, "2023-01-01T10:00:00Z");
    const allEvents = [userMessage];

    const { result } = renderHook(() => useResponseTime(userMessage, allEvents));

    expect(result.current).toBeUndefined();
  });

  it("should return timestamp of most recent user message for agent messages", () => {
    const userMessage = createUserMessage(1, "2023-01-01T10:00:00Z");
    const agentMessage = createAgentMessage(2, "2023-01-01T10:01:00Z");
    const allEvents = [userMessage, agentMessage];

    const { result } = renderHook(() => useResponseTime(agentMessage, allEvents));

    expect(result.current).toBe("2023-01-01T10:00:00Z");
  });

  it("should return undefined if no user message found before agent message", () => {
    const agentMessage = createAgentMessage(1, "2023-01-01T10:00:00Z");
    const allEvents = [agentMessage];

    const { result } = renderHook(() => useResponseTime(agentMessage, allEvents));

    expect(result.current).toBeUndefined();
  });

  it("should return undefined if current event is not found in allEvents", () => {
    const userMessage = createUserMessage(1, "2023-01-01T10:00:00Z");
    const agentMessage = createAgentMessage(2, "2023-01-01T10:01:00Z");
    const allEvents = [userMessage];

    const { result } = renderHook(() => useResponseTime(agentMessage, allEvents));

    expect(result.current).toBeUndefined();
  });

  it("should find user message even with other events in between", () => {
    const userMessage = createUserMessage(1, "2023-01-01T10:00:00Z");
    const observation = createObservation(2, "2023-01-01T10:00:30Z", 1);
    const agentMessage = createAgentMessage(3, "2023-01-01T10:01:00Z");
    const allEvents = [userMessage, observation, agentMessage];

    const { result } = renderHook(() => useResponseTime(agentMessage, allEvents));

    expect(result.current).toBe("2023-01-01T10:00:00Z");
  });
});