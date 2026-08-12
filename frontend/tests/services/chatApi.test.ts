import { afterEach, describe, expect, it, vi } from "vitest";
import { ChatApiError, sendMessage } from "../../src/services/chatApi";

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

describe("chatApi.sendMessage", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("mapeia a resposta da API para o formato usado pelo domínio do chat", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        jsonResponse({
          answer: "A autenticação usa token Bearer.",
          sources: [{ file_name: "autenticacao.md", excerpt: "trecho", score: 0.9 }],
        }),
      ),
    );

    const result = await sendMessage("Como funciona a autenticação?");

    expect(result.answer).toBe("A autenticação usa token Bearer.");
    expect(result.sources).toEqual([
      { fileName: "autenticacao.md", excerpt: "trecho", score: 0.9 },
    ]);
  });

  it("lança ChatApiError com a mensagem do backend quando a API responde com erro", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        jsonResponse({ detail: "Não foi possível obter uma resposta agora." }, 502),
      ),
    );

    await expect(sendMessage("pergunta")).rejects.toMatchObject({
      name: "ChatApiError",
      message: "Não foi possível obter uma resposta agora.",
      status: 502,
    });
  });

  it("usa mensagem padrão quando o erro não é JSON válido", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response("<html>erro</html>", { status: 500 }),
      ),
    );

    await expect(sendMessage("pergunta")).rejects.toMatchObject({
      message: "Ocorreu um erro ao processar sua pergunta.",
      status: 500,
    });
  });

  it("lança ChatApiError amigável quando a requisição falha por conexão", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new TypeError("Failed to fetch")),
    );

    await expect(sendMessage("pergunta")).rejects.toBeInstanceOf(ChatApiError);
    await expect(sendMessage("pergunta")).rejects.toMatchObject({
      message: "Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.",
    });
  });
});
