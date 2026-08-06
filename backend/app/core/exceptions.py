from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse

from app.core.logging import get_logger

logger = get_logger(__name__)


class AppError(Exception):
    """Erro base da aplicação, com status HTTP e mensagem amigável."""

    def __init__(self, message: str, status_code: int = status.HTTP_400_BAD_REQUEST) -> None:
        self.message = message
        self.status_code = status_code
        super().__init__(message)


class DocumentIngestionError(AppError):
    """Erro ao ingerir/indexar documentos."""

    def __init__(self, message: str) -> None:
        super().__init__(message, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ChatQueryError(AppError):
    """Erro ao processar uma pergunta do usuário."""

    def __init__(self, message: str) -> None:
        super().__init__(message, status_code=status.HTTP_502_BAD_GATEWAY)


def register_exception_handlers(app: FastAPI) -> None:
    @app.exception_handler(AppError)
    async def app_error_handler(request: Request, exc: AppError) -> JSONResponse:
        logger.warning("AppError: %s", exc.message)
        return JSONResponse(status_code=exc.status_code, content={"detail": exc.message})

    @app.exception_handler(Exception)
    async def unhandled_exception_handler(request: Request, exc: Exception) -> JSONResponse:
        logger.exception("Erro não tratado: %s", exc)
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"detail": "Erro interno inesperado."},
        )
