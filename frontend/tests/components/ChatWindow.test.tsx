import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ChatWindow } from "../../src/features/chat/components/ChatWindow";

vi.mock("../../src/services/chatApi", async () => {
  const actual = await vi.importActual<typeof import("../../src/services/chatApi")>(
    "../../src/services/chatApi",
  );
  return { ...actual, sendMessage: vi.fn() };
});

import { sendMessage } from "../../src/services/chatApi";

const sendMessageMock = vi.mocked(sendMessage);

async function askQuestion(question: string) {
  const user = userEvent.setup();
  // O TextField multiline do MUI mantém um espelho oculto para autodimensionar
  // a altura; o textbox visível é sempre o primeiro.
  const input = screen.getAllByRole("textbox")[0];
  await user.type(input, question);
  await user.click(screen.getByRole("button", { name: "Enviar pergunta" }));
}

describe("ChatWindow", () => {
  afterEach(() => {
    sendMessageMock.mockReset();
  });

  it("mostra o estado vazio quando não há mensagens", () => {
    render(<ChatWindow />);

    expect(
      screen.getByText("Faça uma pergunta sobre a documentação para começar a conversa."),
    ).toBeInTheDocument();
  });

  it("exibe o indicador de carregamento enquanto aguarda a resposta e some ao concluir", async () => {
    let resolveSendMessage: (value: { answer: string; sources: never[] }) => void = () => {};
    sendMessageMock.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveSendMessage = resolve;
        }),
    );

    render(<ChatWindow />);
    await askQuestion("Como funciona a autenticação?");

    expect(await screen.findByText("Consultando a documentação...")).toBeInTheDocument();

    resolveSendMessage({ answer: "Resposta pronta.", sources: [] });

    await waitFor(() =>
      expect(screen.queryByText("Consultando a documentação...")).not.toBeInTheDocument(),
    );
  });

  it("renderiza a pergunta do usuário, a resposta e as fontes utilizadas", async () => {
    sendMessageMock.mockResolvedValue({
      answer: "A autenticação usa token Bearer.",
      sources: [{ fileName: "autenticacao.md", excerpt: "Trecho relevante do documento.", score: 0.9 }],
    });

    render(<ChatWindow />);
    await askQuestion("Como funciona a autenticação?");

    expect(await screen.findByText("Como funciona a autenticação?")).toBeInTheDocument();
    expect(await screen.findByText("A autenticação usa token Bearer.")).toBeInTheDocument();
    expect(screen.getAllByText("autenticacao.md").length).toBeGreaterThan(0);
  });

  it("exibe um alerta de erro amigável quando a API falha e permite descartá-lo", async () => {
    const { ChatApiError } = await vi.importActual<typeof import("../../src/services/chatApi")>(
      "../../src/services/chatApi",
    );
    sendMessageMock.mockRejectedValue(
      new ChatApiError("Não foi possível obter uma resposta agora. Tente novamente em instantes."),
    );

    render(<ChatWindow />);
    await askQuestion("pergunta qualquer");

    const alert = await screen.findByRole("alert");
    expect(
      within(alert).getByText("Não foi possível obter uma resposta agora. Tente novamente em instantes."),
    ).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(within(alert).getByRole("button"));

    await waitFor(() => expect(screen.queryByRole("alert")).not.toBeInTheDocument());
  });
});
