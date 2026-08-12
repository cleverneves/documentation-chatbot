"""Caso de uso: responder a pergunta de um usuário com base na documentação indexada."""

from dataclasses import dataclass

from app.core.exceptions import ChatQueryError
from app.core.logging import get_logger
from app.rag.query_engine import get_query_engine
from app.rag.settings import configure_llama_index

logger = get_logger(__name__)

MAX_SOURCE_EXCERPT_LENGTH = 500


@dataclass
class SourceReference:
    file_name: str
    excerpt: str
    score: float | None = None


@dataclass
class ChatAnswer:
    answer: str
    sources: list[SourceReference]


def answer_question(question: str) -> ChatAnswer:
    """Consulta o pipeline de RAG e retorna a resposta com as fontes utilizadas."""
    if not question or not question.strip():
        raise ChatQueryError("A pergunta não pode ser vazia.")

    configure_llama_index()

    logger.info("Pergunta recebida (%d caractere(s)).", len(question))

    try:
        query_engine = get_query_engine()
        response = query_engine.query(question)
    except Exception as exc:  # noqa: BLE001 - detalhes reais ficam apenas no log do servidor
        logger.exception("Falha ao consultar o pipeline de RAG.")
        raise ChatQueryError(
            "Não foi possível obter uma resposta agora. Tente novamente em instantes."
        ) from exc

    sources = [
        SourceReference(
            file_name=node.metadata.get("file_name", "desconhecido"),
            excerpt=node.get_content()[:MAX_SOURCE_EXCERPT_LENGTH],
            score=node.score,
        )
        for node in response.source_nodes
    ]

    logger.info("Resposta gerada com %d trecho(s) de origem recuperado(s).", len(sources))

    return ChatAnswer(answer=str(response), sources=sources)
