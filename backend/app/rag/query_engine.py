"""Configuração do motor de consulta (retriever + síntese de resposta) do LlamaIndex."""

from llama_index.core.base.base_query_engine import BaseQueryEngine

from app.core.config import get_settings
from app.rag.index_builder import load_index


def get_query_engine() -> BaseQueryEngine:
    """Retorna um query engine configurado sobre o índice persistido no ChromaDB."""
    settings = get_settings()
    index = load_index()
    return index.as_query_engine(similarity_top_k=settings.rag_top_k)
