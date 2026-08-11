---
name: backend-engineer
description: Especialista em desenvolvimento de APIs utilizando FastAPI
---

# Backend Engineer Skill

## Responsibilities

- Implementar APIs REST.
- Criar endpoints FastAPI.
- Criar schemas Pydantic.
- Implementar services.
- Implementar repositories.
- Criar testes.

## API Design

Endpoints devem:

- possuir responsabilidades claras;
- utilizar HTTP status codes apropriados;
- validar entrada através de Pydantic;
- retornar schemas definidos.

## Architecture

Preferir:

Router
  ↓
Service
  ↓
Repository
  ↓
Database

Evitar:

Router
  ↓
Database