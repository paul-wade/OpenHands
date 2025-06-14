import { ConfirmationButtons } from "#/components/shared/buttons/confirmation-buttons";
import { OpenHandsAction } from "#/types/core/actions";
import {
  isUserMessage,
  isErrorObservation,
  isAssistantMessage,
  isOpenHandsAction,
  isOpenHandsObservation,
  isFinishAction,
  isRejectObservation,
  isMcpObservation,
} from "#/types/core/guards";
import { OpenHandsObservation } from "#/types/core/observations";
import { ImageCarousel } from "../images/image-carousel";
import { ChatMessage } from "./chat-message";
import { ErrorMessage } from "./error-message";
import { MCPObservationContent } from "./mcp-observation-content";
import { getObservationResult } from "./event-content-helpers/get-observation-result";
import { getEventContent } from "./event-content-helpers/get-event-content";
import { GenericEventMessage } from "./generic-event-message";
import { useResponseTime } from "#/hooks/use-response-time";

const hasThoughtProperty = (
  obj: Record<string, unknown>,
): obj is { thought: string } => "thought" in obj && !!obj.thought;

interface EventMessageProps {
  event: OpenHandsAction | OpenHandsObservation;
  hasObservationPair: boolean;
  isAwaitingUserConfirmation: boolean;
  isLastMessage: boolean;
  allEvents?: (OpenHandsAction | OpenHandsObservation)[]; // For calculating response times
}

export function EventMessage({
  event,
  hasObservationPair,
  isAwaitingUserConfirmation,
  isLastMessage,
  allEvents = [],
}: EventMessageProps) {
  const shouldShowConfirmationButtons =
    isLastMessage && event.source === "agent" && isAwaitingUserConfirmation;

  const responseTime = useResponseTime(event, allEvents);

  if (isErrorObservation(event)) {
    return (
      <ErrorMessage
        errorId={event.extras.error_id}
        defaultMessage={event.message}
      />
    );
  }

  if (hasObservationPair && isOpenHandsAction(event)) {
    if (hasThoughtProperty(event.args)) {
      return (
        <ChatMessage
          type="agent"
          message={event.args.thought}
          timestamp={event.timestamp}
          responseTime={responseTime}
        />
      );
    }
    return null;
  }

  if (isFinishAction(event)) {
    return (
      <ChatMessage
        type="agent"
        message={getEventContent(event).details}
        timestamp={event.timestamp}
        responseTime={responseTime}
      />
    );
  }

  if (isUserMessage(event) || isAssistantMessage(event)) {
    return (
      <ChatMessage
        type={event.source}
        message={isUserMessage(event) ? event.args.content : event.message}
        timestamp={event.timestamp}
        responseTime={responseTime}
      >
        {event.args.image_urls && event.args.image_urls.length > 0 && (
          <ImageCarousel size="small" images={event.args.image_urls} />
        )}
        {shouldShowConfirmationButtons && <ConfirmationButtons />}
      </ChatMessage>
    );
  }

  if (isRejectObservation(event)) {
    return (
      <ChatMessage
        type="agent"
        message={event.content}
        timestamp={event.timestamp}
        responseTime={responseTime}
      />
    );
  }

  if (isMcpObservation(event)) {
    return (
      <div>
        <GenericEventMessage
          title={getEventContent(event).title}
          details={<MCPObservationContent event={event} />}
          success={getObservationResult(event)}
          timestamp={event.timestamp}
          responseTime={responseTime}
        />
        {shouldShowConfirmationButtons && <ConfirmationButtons />}
      </div>
    );
  }

  return (
    <div>
      {isOpenHandsAction(event) && hasThoughtProperty(event.args) && (
        <ChatMessage
          type="agent"
          message={event.args.thought}
          timestamp={event.timestamp}
          responseTime={responseTime}
        />
      )}

      <GenericEventMessage
        title={getEventContent(event).title}
        details={getEventContent(event).details}
        success={
          isOpenHandsObservation(event)
            ? getObservationResult(event)
            : undefined
        }
        timestamp={event.timestamp}
        responseTime={responseTime}
      />

      {shouldShowConfirmationButtons && <ConfirmationButtons />}
    </div>
  );
}
