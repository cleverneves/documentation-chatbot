"""Script CLI para indexar os documentos de `docs/` no ChromaDB.

Uso:
    python scripts/ingest.py [--force]
"""

import argparse
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.core.logging import configure_logging, get_logger  # noqa: E402
from app.services.ingestion_service import ingest_documents  # noqa: E402

logger = get_logger(__name__)


def main() -> None:
    parser = argparse.ArgumentParser(description="Indexa os documentos de docs/ no ChromaDB.")
    parser.add_argument(
        "--force",
        action="store_true",
        help="Reindexa mesmo que a coleção já possua documentos.",
    )
    args = parser.parse_args()

    configure_logging()
    total = ingest_documents(force=args.force)
    logger.info("Ingestão concluída: %d documento(s) processado(s).", total)


if __name__ == "__main__":
    main()
