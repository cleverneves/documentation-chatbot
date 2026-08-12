---
name: frontend-testing
description: Create and validate React component and user-flow tests for the documentation chatbot.
---

# Frontend Testing Skill

## Objective

Create tests that validate important frontend behavior.

## Process

### 1. Inspect

Before writing tests:

- Inspect existing test conventions.
- Identify test framework.
- Inspect the target component.
- Identify dependencies.
- Identify user-visible behavior.

### 2. Identify Scenarios

For a chat feature, consider:

- Empty input
- Valid question
- Loading state
- Successful response
- API error
- Retry
- Sources
- Long response

### 3. Implement

Prefer user-centric tests.

Example scenario:

Given the chat input is empty
When the user submits
Then the request should not be sent
And the UI should indicate the input requirement

### 4. Mock APIs

Mock HTTP communication.

Do not depend on:

- Real FastAPI
- LlamaIndex
- ChromaDB
- OpenAI

### 5. Run

Execute:

- Targeted tests
- Related test suite
- Full suite when appropriate

### 6. Diagnose

When a test fails:

- Read the complete error.
- Identify root cause.
- Determine whether application or test code is incorrect.
- Fix the root cause.
- Re-run.

Never weaken assertions just to obtain a passing test.