"""Teste de ingestão ponta a ponta: documentos de exemplo -> embeddings -> ChromaDB.

Usa `MockEmbedding` do LlamaIndex para não depender de uma chave real da OpenAI,
validando apenas a persistência e a capacidade de consulta do pipeline de RAG.
"""

from pathlib import Path

import pytest
from llama_index.core import Settings as LlamaSettings
from llama_index.core.embeddings import MockEmbedding

from app.core.config import get_settings
from app.rag.index_builder import build_index
from app.rag.loaders import load_documents
from app.vectorstore.chroma_client import get_chroma_client, get_chroma_collection

DOCS_DIR = Path(__file__).resolve().parents[3] / "docs"
EMBED_DIM = 8


@pytest.fixture
def isolated_settings(tmp_path, monkeypatch):
    monkeypatch.setenv("CHROMA_PERSIST_DIR", str(tmp_path / "chroma"))
    monkeypatch.setenv("CHROMA_COLLECTION_NAME", "test_collection")
    monkeypatch.setenv("DOCS_DIR", str(DOCS_DIR))

    get_settings.cache_clear()
    get_chroma_client.cache_clear()
    LlamaSettings.embed_model = MockEmbedding(embed_dim=EMBED_DIM)

    yield get_settings()

    get_settings.cache_clear()
    get_chroma_client.cache_clear()


def test_ingestion_persists_documents_and_is_queryable(isolated_settings):
    settings = isolated_settings

    documents = load_documents(settings.docs_dir)
    assert len(documents) >= 3, "Espera-se pelo menos os 3 documentos de exemplo em docs/"

    build_index(documents)

    collection = get_chroma_collection()
    assert collection.count() > 0

    results = collection.query(query_embeddings=[[0.1] * EMBED_DIM], n_results=1)
    assert len(results["documents"][0]) == 1
