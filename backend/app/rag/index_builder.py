"""Construção e persistência do índice vetorial no ChromaDB."""

from llama_index.core import StorageContext, VectorStoreIndex
from llama_index.core.schema import Document
from llama_index.vector_stores.chroma import ChromaVectorStore

from app.core.logging import get_logger
from app.vectorstore.chroma_client import get_chroma_collection

logger = get_logger(__name__)


def get_vector_store() -> ChromaVectorStore:
    collection = get_chroma_collection()
    return ChromaVectorStore(chroma_collection=collection)


def build_index(documents: list[Document], force: bool = False) -> VectorStoreIndex:
    """Gera embeddings para os documentos e persiste no ChromaDB.

    Nota (limitação do MVP): a operação não é totalmente idempotente. Se a
    coleção já possuir vetores e `force` for False, a ingestão é pulada e o
    índice existente é apenas carregado, para evitar duplicar documentos.
    Para reindexar do zero, apague o diretório de persistência do Chroma
    (`CHROMA_PERSIST_DIR`) ou use `force=True`.
    """
    collection = get_chroma_collection()
    vector_store = ChromaVectorStore(chroma_collection=collection)

    if collection.count() > 0 and not force:
        logger.info(
            "Coleção '%s' já contém %d vetores; pulando reingestão (use force=True para reindexar).",
            collection.name,
            collection.count(),
        )
        return VectorStoreIndex.from_vector_store(vector_store)

    storage_context = StorageContext.from_defaults(vector_store=vector_store)
    index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
    logger.info("Índice construído com %d documento(s) na coleção '%s'.", len(documents), collection.name)
    return index


def load_index() -> VectorStoreIndex:
    """Carrega o índice a partir do índice vetorial já persistido no ChromaDB."""
    vector_store = get_vector_store()
    return VectorStoreIndex.from_vector_store(vector_store)
