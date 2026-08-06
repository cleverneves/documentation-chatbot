from fastapi import FastAPI

from app.core.exceptions import register_exception_handlers
from app.core.logging import configure_logging, get_logger

configure_logging()
logger = get_logger(__name__)

app = FastAPI(title="Documentation Chatbot API")

register_exception_handlers(app)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
