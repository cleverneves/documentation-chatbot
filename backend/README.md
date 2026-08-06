# Backend — Documentation Chatbot API

API em **FastAPI** que expõe um pipeline de RAG (Retrieval-Augmented Generation) construído com
**LlamaIndex**, **ChromaDB** e **OpenAI**, para responder perguntas com base em documentação
indexada a partir de arquivos Markdown.

## Estrutura

```
backend/
├── app/
│   ├── main.py              # bootstrap do FastAPI
│   ├── core/                # config, logging, exceptions
│   ├── api/                 # rotas HTTP (v1)
│   ├── schemas/             # contratos Pydantic (request/response)
│   ├── services/            # casos de uso (chat, ingestão)
│   ├── rag/                 # LlamaIndex: loaders, index builder, query engine
│   ├── vectorstore/         # cliente ChromaDB
│   └── llm/                 # cliente OpenAI (LLM + embeddings)
├── scripts/
│   └── ingest.py            # CLI para indexar docs/
├── tests/
│   └── integration/         # testes de integração (com MockEmbedding)
├── requirements.txt
└── Dockerfile
```

## Pré-requisitos

- Python 3.11+
- Uma chave de API da OpenAI válida (`OPENAI_API_KEY`)

## Configuração

1. Copie o arquivo de exemplo de variáveis de ambiente (na raiz do monorepo ou dentro de
   `backend/`) e preencha os valores:

   ```
   cp ../.env.example ../.env
   ```

   Principais variáveis:

   | Variável | Descrição | Padrão |
   |---|---|---|
   | `OPENAI_API_KEY` | Chave de API da OpenAI (obrigatória) | — |
   | `OPENAI_LLM_MODEL` | Modelo de chat usado para gerar respostas | `gpt-4o-mini` |
   | `OPENAI_EMBEDDING_MODEL` | Modelo usado para gerar embeddings | `text-embedding-3-small` |
   | `CHROMA_PERSIST_DIR` | Diretório de persistência do ChromaDB | `./data/chroma` |
   | `CHROMA_COLLECTION_NAME` | Nome da coleção no ChromaDB | `documentation` |
   | `DOCS_DIR` | Diretório com os documentos a indexar | `../docs` |
   | `RAG_TOP_K` | Quantidade de trechos recuperados por pergunta | `4` |
   | `CORS_ALLOWED_ORIGINS` | Origens permitidas (separadas por vírgula) | `http://localhost:5173` |

## Instalação

```
python -m venv .venv
.venv\Scripts\activate        # Windows
# source .venv/bin/activate   # Linux/Mac
pip install -r requirements.txt
```

Para rodar os testes, instale também as dependências de desenvolvimento:

```
pip install -r requirements-dev.txt
```

## Indexando a documentação

Antes de usar o chat, é necessário indexar os documentos de `docs/` no ChromaDB:

```
python scripts/ingest.py
```

Use `--force` para reindexar mesmo que a coleção já possua documentos:

```
python scripts/ingest.py --force
```

## Rodando a API

```
uvicorn app.main:app --reload --port 8000
```

A documentação interativa fica disponível em `http://localhost:8000/docs`.

## Endpoints principais

- `GET /health`: health-check simples.
- `POST /api/v1/chat`: recebe `{ "question": "..." }` e retorna a resposta gerada com base na
  documentação indexada, incluindo as fontes utilizadas (`sources`).

## Testes

```
pytest
```

Os testes de integração usam `MockEmbedding` do LlamaIndex, portanto não fazem chamadas reais
à API da OpenAI nem exigem uma chave válida.
