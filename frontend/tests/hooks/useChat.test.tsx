import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useChat } from "../../src/features/chat/hooks/useChat";
import { ChatApiError } from "../../src/services/chatApi";

vi.mock("../../src/services/chatApi", async () => {
  const actual = await vi.importActual<typeof import("../../src/services/chatApi")>(
    "../../src/services/chatApi",
  );
  return { ...actual, sendMessage: vi.fn() };
});

import { sendMessage } from "../../src/services/chatApi";

const sendMessageMock = vi.mocked(sendMessage);

describe("useChat", () => {
  afterEach(() => {
    sendMessageMock.mockReset();
  });

  it("ignora envio de pergunta vazia ou apenas com espaços", async () => {
    const { result } = renderHook(() => useChat());

    await act(async () => {
      await result.current.sendUserMessage("   ");
    });

    expect(sendMessageMock).not.toHaveBeenCalled();
    expect(result.current.messages).toHaveLength(0);
  });

  it("adiciona a mensagem do usuário e a resposta do assistente em caso de sucesso", async () => {
    sendMessageMock.mockResolvedValue({
      answer: "A autenticação usa token Bearer.",
      sources: [{ fileName: "autenticacao.md", excerpt: "trecho", score: 0.9 }],
    });

    const { result } = renderHook(() => useChat());

    await act(async () => {
      await result.current.sendUserMessage("Como funciona a autenticação?");
    });

    expect(result.current.messages).toHaveLength(2);
    expect(result.current.messages[0]).toMatchObject({
      role: "user",
      content: "Como funciona a autenticação?",
    });
    expect(result.current.messages[1]).toMatchObject({
      role: "assistant",
      content: "A autenticação usa token Bearer.",
    });
    expect(result.current.messages[1].sources).toEqual([
      { fileName: "autenticacao.md", excerpt: "trecho", score: 0.9 },
    ]);
    expect(result.current.error).toBeNull();
  });

  it("expõe isLoading como true enquanto a requisição está em andamento", async () => {
    let resolveSendMessage: (value: { answer: string; sources: never[] }) => void = () => {};
    sendMessageMock.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveSendMessage = resolve;
        }),
    );

    const { result } = renderHook(() => useChat());

    act(() => {
      void result.current.sendUserMessage("pergunta");
    });

    await waitFor(() => expect(result.current.isLoading).toBe(true));

    await act(async () => {
      resolveSendMessage({ answer: "resposta", sources: [] });
    });

    expect(result.current.isLoading).toBe(false);
  });

  it("expõe uma mensagem de erro amigável quando a API falha, sem adicionar resposta do assistente", async () => {
    sendMessageMock.mockRejectedValue(new ChatApiError("Não foi possível obter uma resposta agora.", 502));

    const { result } = renderHook(() => useChat());

    await act(async () => {
      await result.current.sendUserMessage("pergunta");
    });

    expect(result.current.error).toBe("Não foi possível obter uma resposta agora.");
    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0].role).toBe("user");
  });

  it("permite descartar a mensagem de erro", async () => {
    sendMessageMock.mockRejectedValue(new ChatApiError("Falha ao processar."));

    const { result } = renderHook(() => useChat());

    await act(async () => {
      await result.current.sendUserMessage("pergunta");
    });
    expect(result.current.error).not.toBeNull();

    act(() => {
      result.current.dismissError();
    });

    expect(result.current.error).toBeNull();
  });
});
