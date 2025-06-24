# Reset Chat History Implementation Summary

## Overview
This implementation adds a "Reset Chat History" feature that allows users to clear conversation history while preserving the runtime environment. This is particularly useful for projects with long setup times (like Lean4).

## Implementation Details

### Backend Changes

1. **EventStore** (`openhands/events/event_store.py`):
   - Added `clear_events()` method to delete all event files while preserving the session

2. **EventStream** (`openhands/events/stream.py`):
   - Added `clear_history()` method that:
     - Calls EventStore.clear_events()
     - Clears internal caches (_events, _filtered_events)
     - Resets event counter to 0

3. **API Endpoint** (`openhands/server/routes/manage_conversations.py`):
   - Added `POST /conversations/{conversation_id}/reset-history` endpoint
   - Validates conversation ownership
   - Calls event_stream.clear_history()
   - Returns 200 OK on success

### Frontend Changes

1. **API Client** (`frontend/src/api/open-hands.ts`):
   - Added `resetConversationHistory()` method

2. **Mutation Hook** (`frontend/src/hooks/mutation/use-reset-conversation-history.ts`):
   - Created React Query mutation hook
   - Invalidates conversation and conversations list queries on success

3. **UI Components**:
   - Updated `ConversationCardContextMenu` to include "Reset Chat History" option
   - Added confirmation modal in `ConversationCard` with clear explanation
   - Modal explains what will be preserved (environment) vs cleared (chat history)

## User Experience

1. User clicks ellipsis menu on conversation card
2. Selects "Reset Chat History"
3. Confirmation modal appears explaining:
   - Chat messages will be cleared
   - Environment, files, and dependencies remain intact
4. On confirmation, history is cleared and UI refreshes

## Benefits

- Preserves expensive environment setup (hours of dependency building)
- Allows fresh start for new tasks without confusion
- Clear user communication about what happens
- Simple, intuitive UI interaction

## Future Enhancements

See `docs/design/conversation-forking-proposal.md` for a more comprehensive solution that includes:
- Conversation forking (branching)
- Environment state detection
- Smart context management
- Better long-term workflow support