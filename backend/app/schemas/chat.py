from pydantic import BaseModel, Field


class ChatMessage(BaseModel):
    role: str = Field(description="'user' ou 'assistant'")
    content: str


class ChatRequest(BaseModel):
    question: str = Field(min_length=1, description="Pergunta do usuário sobre a documentação.")
    history: list[ChatMessage] = Field(
        default_factory=list,
        description="Histórico opcional da conversa (não utilizado no MVP).",
    )


class SourceReferenceResponse(BaseModel):
    file_name: str
    excerpt: str
    score: float | None = None


class ChatResponse(BaseModel):
    answer: str
    sources: list[SourceReferenceResponse]
