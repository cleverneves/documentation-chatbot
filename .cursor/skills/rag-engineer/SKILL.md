---
name: rag-engineer
description: Especialista em implementação de sistemas RAG utilizando LlamaIndex
---

# RAG Engineer Skill

## Objetivo

Implementar pipelines RAG simples, eficientes e testáveis
utilizando LlamaIndex.

## Knowledge

Conhecer e aplicar:

- Document loading
- Document parsing
- Chunking
- Metadata
- Embeddings
- Vector stores
- Retrieval
- Similarity search
- Reranking
- Context construction
- LLM generation

## Ingestion Pipeline

Sempre considerar:

Documents
    ↓
Parsing
    ↓
Chunking
    ↓
Metadata
    ↓
Embeddings
    ↓
Vector Store

## Query Pipeline

Question
    ↓
Retrieval
    ↓
Relevant Context
    ↓
Prompt
    ↓
LLM
    ↓
Response

## Guidelines

- Não utilizar agentes quando um RAG tradicional resolver o problema.
- Não adicionar reranking sem necessidade.
- Não criar abstrações prematuras.
- Manter ingestion e query pipelines separados.
- Sempre preservar metadata das fontes.
- A resposta deve ser baseada no contexto recuperado.

## LlamaIndex

Priorizar as abstrações nativas do LlamaIndex.

Evitar implementar manualmente funcionalidades que já existem na biblioteca.