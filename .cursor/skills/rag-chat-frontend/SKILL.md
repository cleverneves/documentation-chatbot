---
name: rag-chat-frontend
description: Build and improve the React frontend of the documentation chatbot powered by FastAPI and LlamaIndex RAG.
---

# RAG Chat Frontend

## Context

This project is a documentation consultation chatbot.

Architecture:

React
  ↓
FastAPI
  ↓
RAG
  ↓
LlamaIndex
  ↓
LLM

The frontend is responsible only for the user interface and communication with FastAPI.

## Responsibilities

The frontend is responsible for:

- Chat interface
- User input
- Conversation display
- Loading state
- Error state
- Empty state
- Source display
- Basic session conversation state

The frontend is NOT responsible for:

- Retrieval
- Embeddings
- Chunking
- Vector search
- Prompt construction
- LLM calls
- Document ingestion

## Chat Flow

Expected flow:

1. User enters a question.
2. Frontend validates the input.
3. Frontend sends the question to FastAPI.
4. UI displays loading state.
5. FastAPI executes RAG.
6. Backend returns the answer.
7. Frontend displays the answer.
8. Frontend displays sources when available.

## UX

The chat must clearly distinguish:

User:

question

Assistant:

generated answer

Sources:

retrieved documentation references

## Loading

During generation:

- Disable duplicate submission when appropriate.
- Show a clear loading indicator.
- Keep existing messages visible.
- Do not freeze the entire application.

## Error

If the API fails:

- Preserve the user's question.
- Display a concise error message.
- Allow retry when appropriate.
- Do not expose internal backend details.

## Sources

When sources are returned:

- Display them near the answer.
- Make them visually distinguishable.
- Preserve useful metadata returned by the API.
- Do not fabricate source information.

## Conversation State

For the MVP, conversation state can remain in React memory.

Do not introduce persistence unless explicitly required.

Do not introduce a global state library unless necessary.

## API Contract

Never assume the backend contract.

Inspect the FastAPI implementation or API schema before changing frontend integration.

If the backend contract changes, update the corresponding TypeScript types.

## Streaming

If streaming is available, implement it only if required by the backend.

Do not add streaming complexity merely because the application is a chatbot.

## UX Priority

Prioritize:

1. Readability
2. Responsiveness
3. Clear feedback
4. Simple interaction
5. Source transparency

Avoid unnecessary animations and visual complexity.