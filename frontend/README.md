# Frontend — Documentation Chatbot

Interface de chat em **React + Vite + TypeScript**, estilizada com **Material UI (MUI)**, para
conversar com a documentação indexada pelo backend.

## Estrutura

```
frontend/
├── src/
│   ├── main.tsx                  # bootstrap + ThemeProvider (MUI)
│   ├── App.tsx
│   ├── theme/                    # tema MUI (paleta, tipografia)
│   ├── components/                # componentes genéricos (Layout)
│   ├── features/chat/
│   │   ├── components/            # ChatWindow, MessageList, MessageBubble,
│   │   │                          # ChatInput, SourceReferences
│   │   ├── hooks/useChat.ts       # estado da conversa
│   │   └── types.ts
│   ├── services/chatApi.ts        # client HTTP para o backend
│   └── config/env.ts              # variáveis de ambiente (Vite)
└── Dockerfile
```

## Pré-requisitos

- Node.js 18+
- Backend rodando (veja [`../backend/README.md`](../backend/README.md))

## Configuração

Copie o arquivo de exemplo de variáveis de ambiente:

```
cp .env.example .env
```

| Variável | Descrição | Padrão |
|---|---|---|
| `VITE_API_BASE_URL` | URL base da API do backend | `http://localhost:8000` |

## Instalação e execução

```
npm install
npm run dev
```

A aplicação fica disponível em `http://localhost:5173`.

## Build de produção

```
npm run build
npm run preview
```
