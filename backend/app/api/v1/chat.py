from typing import Callable

from fastapi import APIRouter, Depends

from app.api.deps import get_chat_service
from app.schemas.chat import ChatRequest, ChatResponse, SourceReferenceResponse
from app.services.chat_service import ChatAnswer

router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("", response_model=ChatResponse)
def post_chat(
    request: ChatRequest,
    chat_service: Callable[[str], ChatAnswer] = Depends(get_chat_service),
) -> ChatResponse:
    result = chat_service(request.question)
    return ChatResponse(
        answer=result.answer,
        sources=[
            SourceReferenceResponse(file_name=s.file_name, excerpt=s.excerpt, score=s.score)
            for s in result.sources
        ],
    )
