import { useCallback, useState } from "react";
import { ChatApiError, sendMessage } from "../../../services/chatApi";
import type { Message } from "../types";

function createId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

interface UseChatResult {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  sendUserMessage: (question: string) => Promise<void>;
  dismissError: () => void;
}

export function useChat(): UseChatResult {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendUserMessage = useCallback(async (question: string) => {
    const trimmed = question.trim();
    if (!trimmed) {
      return;
    }

    const userMessage: Message = { id: createId(), role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const result = await sendMessage(trimmed);
      const assistantMessage: Message = {
        id: createId(),
        role: "assistant",
        content: result.answer,
        sources: result.sources,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const message =
        err instanceof ChatApiError
          ? err.message
          : "Ocorreu um erro inesperado. Tente novamente.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const dismissError = useCallback(() => setError(null), []);

  return { messages, isLoading, error, sendUserMessage, dismissError };
}
