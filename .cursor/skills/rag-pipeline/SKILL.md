---
name: rag-pipeline
description: Analyze, debug and improve the documentation chatbot RAG pipeline.
---

# RAG Pipeline

## Objective

Diagnose and improve RAG quality systematically.

## Pipeline Analysis

When an answer is poor, analyze the pipeline in this order:

1. Document availability
2. Document loading
3. Chunking
4. Embeddings
5. Vector storage
6. Retrieval
7. Context quality
8. Prompt
9. LLM generation

Do not immediately change the LLM or prompt.

## Retrieval Problems

If the answer is incorrect:

First inspect whether the correct information was retrieved.

If relevant documents were not retrieved, investigate:

- Chunk size
- Chunk overlap
- Embedding model
- Query
- top_k
- Metadata
- Vector store

## Generation Problems

If relevant context was retrieved but the answer is incorrect:

Investigate:

- Prompt
- Context formatting
- Context length
- LLM configuration
- Source handling

## Debugging

When possible inspect:

- User query
- Retrieved chunks
- Similarity/relevance
- Final context
- Generated response
- Sources

## Changes

Change one major variable at a time when evaluating RAG quality.

Document the reason for meaningful changes.

## MVP

Prefer incremental improvements.

Do not introduce complex RAG techniques before establishing that the basic pipeline works.