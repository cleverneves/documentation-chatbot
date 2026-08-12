"""Testes da API do endpoint de chat (POST /api/v1/chat).

O serviço de chat é substituído por um dublê via `dependency_overrides`,
então estes testes não dependem de OpenAI, LlamaIndex ou ChromaDB.
"""

import pytest
from fastapi.testclient import TestClient

from app.api.deps import get_chat_service
from app.core.exceptions import ChatQueryError
from app.main import app
from app.services.chat_service import ChatAnswer, SourceReference


@pytest.fixture
def client():
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()


def test_post_chat_returns_answer_and_sources_on_success(client):
    fake_answer = ChatAnswer(
        answer="A autenticação é feita via token Bearer.",
        sources=[
            SourceReference(file_name="autenticacao.md", excerpt="Trecho relevante.", score=0.87),
        ],
    )
    app.dependency_overrides[get_chat_service] = lambda: (lambda question: fake_answer)

    response = client.post("/api/v1/chat", json={"question": "Como funciona a autenticação?"})

    assert response.status_code == 200
    body = response.json()
    assert body["answer"] == fake_answer.answer
    assert body["sources"] == [
        {"file_name": "autenticacao.md", "excerpt": "Trecho relevante.", "score": 0.87}
    ]


def test_post_chat_returns_422_when_question_is_missing(client):
    response = client.post("/api/v1/chat", json={})

    assert response.status_code == 422


def test_post_chat_returns_422_when_question_is_empty(client):
    response = client.post("/api/v1/chat", json={"question": ""})

    assert response.status_code == 422


def test_post_chat_returns_502_and_hides_internal_details_on_service_error(client):
    def raise_chat_query_error(question: str) -> ChatAnswer:
        raise ChatQueryError("Não foi possível obter uma resposta agora. Tente novamente em instantes.")

    app.dependency_overrides[get_chat_service] = lambda: raise_chat_query_error

    response = client.post("/api/v1/chat", json={"question": "Pergunta qualquer"})

    assert response.status_code == 502
    detail = response.json()["detail"]
    assert "insufficient_quota" not in detail
    assert "openai" not in detail.lower()
    assert "traceback" not in detail.lower()
