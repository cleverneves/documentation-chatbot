"""Configuração global do LlamaIndex (modelos de embedding e LLM)."""

from llama_index.core import Settings as LlamaSettings

from app.core.config import get_settings
from app.llm.openai_client import get_openai_embedding_model, get_openai_llm


def configure_llama_index() -> None:
    """Aplica a configuração global do LlamaIndex (modelo de embedding, LLM e chunking)."""
    settings = get_settings()
    LlamaSettings.llm = get_openai_llm()
    LlamaSettings.embed_model = get_openai_embedding_model()
    LlamaSettings.chunk_size = settings.rag_chunk_size
    LlamaSettings.chunk_overlap = settings.rag_chunk_overlap
