"""Leitura de documentos de um diretório para uso pelo pipeline de ingestão."""

from pathlib import Path

from llama_index.core import SimpleDirectoryReader
from llama_index.core.schema import Document

SUPPORTED_EXTENSIONS = [".md", ".txt"]


def load_documents(docs_dir: str) -> list[Document]:
    """Carrega todos os documentos suportados de um diretório (recursivamente)."""
    docs_path = Path(docs_dir)
    if not docs_path.exists():
        raise FileNotFoundError(f"Diretório de documentos não encontrado: {docs_dir}")

    reader = SimpleDirectoryReader(
        input_dir=str(docs_path),
        required_exts=SUPPORTED_EXTENSIONS,
        recursive=True,
    )
    return reader.load_data()
