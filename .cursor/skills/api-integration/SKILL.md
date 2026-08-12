---
name: api-integration
description: Integrate the React frontend with the FastAPI backend using explicit API contracts and typed TypeScript services.
---

# API Integration Skill

## Objective

Implement reliable communication between the React frontend and FastAPI backend.

Architecture:

React
  ↓
Service
  ↓
FastAPI
  ↓
RAG

## Process

### 1. Inspect

Before implementing an integration:

- Locate the FastAPI endpoint.
- Inspect request schema.
- Inspect response schema.
- Inspect HTTP status codes.
- Inspect error behavior.

Do not guess the contract.

### 2. Define Types

Create TypeScript types representing the API contract.

Example:

export interface ChatRequest {
  question: string;
}

export interface ChatResponse {
  answer: string;
  sources: Source[];
}

Types must represent the actual API contract.

### 3. Service

Create or update a service responsible for HTTP communication.

Example:

chatService.ts

The service should:

- Build the request
- Send the request
- Parse the response
- Handle transport errors
- Return typed data

### 4. Hook

If the API operation requires React state, expose it through a custom hook.

Example:

useChat()

The hook may manage:

- Loading
- Error
- Response
- Conversation state

### 5. Component

The component should consume the hook or service.

Avoid raw HTTP calls inside JSX.

## Error Handling

Distinguish:

- Network error
- HTTP error
- Validation error
- Unexpected response

Expose user-friendly messages.

Do not expose backend internals.

## Contract Changes

If the backend API changes:

1. Update TypeScript types.
2. Update service.
3. Update hooks.
4. Update affected components.
5. Update tests.

## RAG Boundary

The frontend must remain unaware of:

- LlamaIndex
- Retrieval
- Embeddings
- ChromaDB
- LLM providers
- Prompt construction