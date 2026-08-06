"""Dependências de injeção para os endpoints da API."""

from typing import Callable

from app.services.chat_service import ChatAnswer, answer_question


def get_chat_service() -> Callable[[str], ChatAnswer]:
    return answer_question
