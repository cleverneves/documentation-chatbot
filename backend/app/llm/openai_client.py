"""Encapsula a configuração de credenciais e modelos da OpenAI para uso pelo LlamaIndex."""

from llama_index.embeddings.openai import OpenAIEmbedding
from llama_index.llms.openai import OpenAI

from app.core.config import get_settings


def get_openai_llm() -> OpenAI:
    settings = get_settings()
    return OpenAI(
        model=settings.openai_llm_model,
        api_key=settings.openai_api_key,
    )


def get_openai_embedding_model() -> OpenAIEmbedding:
    settings = get_settings()
    return OpenAIEmbedding(
        model=settings.openai_embedding_model,
        api_key=settings.openai_api_key,
    )
