"""Configuração do motor de consulta (retriever + síntese de resposta) do LlamaIndex."""

from llama_index.core import PromptTemplate
from llama_index.core.base.base_query_engine import BaseQueryEngine

from app.core.config import get_settings
from app.rag.index_builder import load_index

# Prompt customizado para priorizar o contexto recuperado e evitar respostas
# inventadas quando a documentação não cobre a pergunta (ver rag-core.mdc).
QA_PROMPT_TEMPLATE = PromptTemplate(
    "Você é um assistente que responde perguntas exclusivamente com base na "
    "documentação fornecida abaixo.\n"
    "Informações de contexto:\n"
    "---------------------\n"
    "{context_str}\n"
    "---------------------\n"
    "Regras:\n"
    "- Baseie sua resposta apenas no contexto acima, sem usar conhecimento prévio.\n"
    "- Se o contexto não tiver informação suficiente para responder, diga "
    "claramente que não encontrou essa informação na documentação, em vez de "
    "inventar uma resposta.\n"
    "- Seja direto e objetivo.\n"
    "Pergunta: {query_str}\n"
    "Resposta: "
)

REFINE_PROMPT_TEMPLATE = PromptTemplate(
    "A pergunta original é: {query_str}\n"
    "Já existe uma resposta parcial: {existing_answer}\n"
    "Há a oportunidade de refinar essa resposta (somente se necessário) com "
    "mais contexto abaixo.\n"
    "------------\n"
    "{context_msg}\n"
    "------------\n"
    "Regras:\n"
    "- Use o novo contexto apenas se ele agregar informação relevante à pergunta.\n"
    "- Se o novo contexto não for útil, mantenha a resposta original sem alterações.\n"
    "- Nunca invente informações que não estejam no contexto fornecido.\n"
    "Resposta refinada: "
)


def get_query_engine() -> BaseQueryEngine:
    """Retorna um query engine configurado sobre o índice persistido no ChromaDB."""
    settings = get_settings()
    index = load_index()
    return index.as_query_engine(
        similarity_top_k=settings.rag_top_k,
        text_qa_template=QA_PROMPT_TEMPLATE,
        refine_template=REFINE_PROMPT_TEMPLATE,
    )
