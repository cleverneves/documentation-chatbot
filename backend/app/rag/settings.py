"""Configuração global do LlamaIndex (modelos de embedding e LLM)."""

from llama_index.core import Settings as LlamaSettings

from app.llm.openai_client import get_openai_embedding_model, get_openai_llm


def configure_llama_index() -> None:
    """Aplica a configuração global do LlamaIndex (modelo de embedding e LLM)."""
    LlamaSettings.llm = get_openai_llm()
    LlamaSettings.embed_model = get_openai_embedding_model()
    LlamaSettings.chunk_size = 512
    LlamaSettings.chunk_overlap = 64
