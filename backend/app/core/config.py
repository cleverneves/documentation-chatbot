from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Configurações da aplicação, carregadas de variáveis de ambiente/.env."""

    model_config = SettingsConfigDict(
        env_file=("../.env", ".env"),
        env_file_encoding="utf-8",
        extra="ignore",
    )

    # OpenAI
    openai_api_key: str = ""
    openai_llm_model: str = "gpt-4o-mini"
    openai_embedding_model: str = "text-embedding-3-small"

    # ChromaDB
    chroma_persist_dir: str = "./data/chroma"
    chroma_collection_name: str = "documentation"

    # API
    api_host: str = "0.0.0.0"
    api_port: int = 8000
    cors_allowed_origins: str = "http://localhost:5173"

    # RAG
    docs_dir: str = "../docs"
    rag_top_k: int = 4

    @property
    def cors_allowed_origins_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_allowed_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
