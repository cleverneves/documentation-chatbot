"""Caso de uso: indexar a documentação disponível em disco no ChromaDB."""

from app.core.config import get_settings
from app.core.exceptions import DocumentIngestionError
from app.core.logging import get_logger
from app.rag.index_builder import build_index
from app.rag.loaders import load_documents
from app.rag.settings import configure_llama_index

logger = get_logger(__name__)


def ingest_documents(force: bool = False) -> int:
    """Carrega os documentos do diretório configurado e os indexa no ChromaDB.

    Retorna a quantidade de documentos carregados/processados.
    """
    settings = get_settings()
    configure_llama_index()

    try:
        documents = load_documents(settings.docs_dir)
    except FileNotFoundError as exc:
        raise DocumentIngestionError(str(exc)) from exc

    if not documents:
        logger.warning("Nenhum documento encontrado em '%s'.", settings.docs_dir)
        return 0

    try:
        build_index(documents, force=force)
    except Exception as exc:  # noqa: BLE001 - convertido para erro de domínio
        raise DocumentIngestionError(f"Falha ao indexar documentos: {exc}") from exc

    return len(documents)
