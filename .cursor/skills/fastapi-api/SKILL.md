---
name: fastapi-api
description: Design and implement FastAPI endpoints with typed Pydantic contracts for the documentation chatbot.
---

# FastAPI API

## Workflow

### 1. Understand the Requirement

Identify:

- Endpoint
- HTTP method
- Request
- Response
- Errors
- Dependencies

### 2. Define Schema

Create Pydantic request and response models.

Example:

class ChatRequest(BaseModel):
    question: str


class ChatResponse(BaseModel):
    answer: str
    sources: list[Source]

### 3. Implement Service

Move application logic out of the route handler.

### 4. Implement Endpoint

The endpoint should:

1. Validate input.
2. Call the appropriate service.
3. Return typed response.
4. Handle expected errors.

### 5. Test

Test:

- Valid request
- Invalid request
- Successful response
- Expected failures

## API Contract

Never silently change an existing API contract.

If a breaking change is required, explicitly identify it.

## RAG

The endpoint should call a RAG service rather than directly implementing retrieval logic.