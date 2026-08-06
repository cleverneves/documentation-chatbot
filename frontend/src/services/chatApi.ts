import { API_BASE_URL } from "../config/env";
import type { Source } from "../features/chat/types";

interface ChatApiSource {
  file_name: string;
  excerpt: string;
  score: number | null;
}

interface ChatApiResponse {
  answer: string;
  sources: ChatApiSource[];
}

export interface SendMessageResult {
  answer: string;
  sources: Source[];
}

export class ChatApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "ChatApiError";
    this.status = status;
  }
}

export async function sendMessage(question: string): Promise<SendMessageResult> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}/api/v1/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });
  } catch {
    throw new ChatApiError(
      "Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.",
    );
  }

  if (!response.ok) {
    let detail = "Ocorreu um erro ao processar sua pergunta.";
    try {
      const errorBody = (await response.json()) as { detail?: string };
      if (errorBody.detail) {
        detail = errorBody.detail;
      }
    } catch {
      // corpo de erro não é JSON válido; mantém mensagem padrão
    }
    throw new ChatApiError(detail, response.status);
  }

  const data = (await response.json()) as ChatApiResponse;

  return {
    answer: data.answer,
    sources: data.sources.map((source) => ({
      fileName: source.file_name,
      excerpt: source.excerpt,
      score: source.score,
    })),
  };
}
