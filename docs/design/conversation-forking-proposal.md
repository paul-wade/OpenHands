# Conversation Forking Design Proposal

## Problem Statement

Users working on projects with long environment setup times (e.g., Lean4 mathematical proofs with hours of dependency building) face a workflow challenge:
- Starting a new conversation requires rebuilding the entire environment
- Continuing in the same conversation leads to agent confusion due to long conversation history
- Agents tend to repeat initialization tasks they've already completed

## Proposed Solution: Conversation Forking

### Core Concept

Allow users to "fork" a conversation, creating a new conversation that inherits the runtime environment from the parent while starting with a clean chat history.

### User Experience

1. **Fork Button**: Add a "New Task from Current Environment" button in the conversation UI
2. **Fork Dialog**: When clicked, show a dialog that:
   - Explains what will be preserved (runtime environment, installed dependencies, file system state)
   - Explains what will be reset (chat history, agent context)
   - Allows user to provide initial context for the new conversation
3. **Conversation Tree**: Show parent-child relationships in the conversation list

### Technical Implementation

#### Backend Changes

1. **New API Endpoint**: `POST /api/conversations/{conversation_id}/fork`
   ```python
   @app.post('/conversations/{conversation_id}/fork')
   async def fork_conversation(
       conversation_id: str,
       initial_message: str = None,
       preserve_context: bool = False,
       user_id: str | None = Depends(get_user_id),
   ) -> ConversationInfo:
       # 1. Create new conversation with new ID
       # 2. Attach to parent's runtime (don't create new one)
       # 3. Optionally preserve last N messages for context
       # 4. Store parent-child relationship in metadata
   ```

2. **Conversation Metadata Enhancement**:
   ```python
   class ConversationMetadata:
       conversation_id: str
       parent_conversation_id: Optional[str]
       fork_point_event_id: Optional[int]
       environment_snapshot: Optional[Dict[str, Any]]
   ```

3. **Runtime Sharing**:
   - Modify runtime attachment to support multiple conversations
   - Implement reference counting for runtime cleanup
   - Handle concurrent access safely

#### Frontend Changes

1. **Fork UI Component**:
   ```typescript
   interface ForkConversationModalProps {
     conversationId: string;
     onFork: (options: ForkOptions) => void;
   }
   
   interface ForkOptions {
     initialMessage?: string;
     preserveRecentContext?: boolean;
     contextMessageCount?: number;
   }
   ```

2. **Conversation Tree Visualization**:
   - Show parent-child relationships
   - Visual indicators for forked conversations
   - Navigation between related conversations

### Benefits

1. **Immediate Productivity**: Users can start new tasks without setup delays
2. **Clean Context**: Each task gets a fresh agent context
3. **Workflow Clarity**: Clear mental model (similar to git branching)
4. **Resource Efficiency**: Reuses existing runtimes

### Implementation Phases

#### Phase 1: Basic Forking (MVP)
- Simple fork operation creating new conversation with shared runtime
- Basic parent-child tracking
- Manual context provision by user

#### Phase 2: Smart Context
- Automatic environment summary injection
- Option to preserve recent messages
- Environment state detection

#### Phase 3: Advanced Features
- Conversation tree visualization
- Merge capabilities (learnings from child back to parent)
- Template creation from successful setups

### Alternative Approaches Considered

1. **Simple Chat Reset**: Clears history but loses all context
2. **Runtime Pooling**: Complex resource management
3. **Better Condensers**: Doesn't fully solve the problem
4. **Environment Markers**: Helpful but not sufficient alone

### Open Questions

1. How to handle runtime lifecycle when multiple conversations share it?
2. Should we limit the depth of conversation trees?
3. How to handle forking from already-forked conversations?
4. Storage implications of maintaining relationships?

### Success Metrics

1. Reduction in repeated setup tasks
2. Increased user productivity (more tasks completed)
3. Decreased time-to-first-meaningful-interaction
4. User satisfaction with workflow

## Conclusion

Conversation forking provides an intuitive solution to the long setup time problem while maintaining a clear mental model for users. It enables efficient multi-task workflows without sacrificing the benefits of isolated conversation contexts.