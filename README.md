# Documentation Chatbot

MVP de um chatbot para consulta de documentação, utilizando **React (Material UI)**, **FastAPI**, **LlamaIndex**, **ChromaDB** e **OpenAI**.

O sistema permite indexar arquivos de documentação (Markdown) e responder perguntas em linguagem natural com base nesse conteúdo, utilizando uma arquitetura RAG (Retrieval-Augmented Generation).

## Estrutura do Monorepo

```
documentation-chatbot/
├── backend/     # API FastAPI + pipeline RAG (LlamaIndex/ChromaDB/OpenAI)
├── frontend/    # SPA React (Material UI) - interface de chat
├── docs/        # Documentos a serem indexados (fonte de conhecimento)
├── infra/       # Configurações de infraestrutura auxiliares
├── .env.example # Variáveis de ambiente de referência
└── docker-compose.yml
```

## Pré-requisitos

- Python 3.11+
- Node.js 18+
- Uma chave de API da OpenAI

## Como rodar (ambiente local)

Consulte o [`backend/README.md`](backend/README.md) e o [`frontend/README.md`](frontend/README.md) para instruções detalhadas de cada serviço.

Resumo rápido:

1. Copie `.env.example` para `.env` na raiz e preencha `OPENAI_API_KEY`.
2. Backend: crie um ambiente virtual, instale as dependências em `backend/requirements.txt`, rode a ingestão (`python scripts/ingest.py`) e depois `uvicorn app.main:app --reload`.
3. Frontend: `npm install` e `npm run dev` dentro de `frontend/`.

## Como rodar (Docker)

```
docker-compose up --build
```

O serviço `backend` expõe um healthcheck em `/health`; o `frontend` só inicia depois que o
backend estiver saudável.

## Testes e qualidade

| Onde | Comando | O que cobre |
|---|---|---|
| `backend/` | `pytest` | Endpoint de chat (`tests/api/`) e ingestão ponta a ponta (`tests/integration/`) |
| `frontend/` | `npm run test` | Chat: `chatApi`, `useChat`, `ChatInput`, `ChatWindow`, `SourceReferences` |
| `frontend/` | `npm run lint` | ESLint (React + TypeScript) |

Nenhum teste depende de chamadas reais à OpenAI, ao LlamaIndex ou ao ChromaDB.

## Documentação adicional

- [`backend/README.md`](backend/README.md): setup do backend, ingestão de documentos e endpoints da API.
- [`frontend/README.md`](frontend/README.md): setup do frontend.
