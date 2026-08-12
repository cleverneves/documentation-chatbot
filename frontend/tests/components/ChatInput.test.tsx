import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ChatInput } from "../../src/features/chat/components/ChatInput";

// O TextField multiline do MUI renderiza um <textarea> visível e um espelho
// oculto (aria-hidden) usado apenas para autodimensionar a altura. O visível
// é sempre o primeiro elemento com role "textbox".
function getVisibleTextbox() {
  return screen.getAllByRole("textbox")[0];
}

describe("ChatInput", () => {
  it("mantém o botão de enviar desabilitado quando o campo está vazio", () => {
    render(<ChatInput onSend={vi.fn()} isLoading={false} />);

    expect(screen.getByRole("button", { name: "Enviar pergunta" })).toBeDisabled();
  });

  it("habilita o botão de enviar após digitar uma pergunta e chama onSend ao clicar", async () => {
    const user = userEvent.setup();
    const onSend = vi.fn();
    render(<ChatInput onSend={onSend} isLoading={false} />);

    const input = getVisibleTextbox();
    await user.type(input, "Como funciona a autenticação?");

    const sendButton = screen.getByRole("button", { name: "Enviar pergunta" });
    expect(sendButton).toBeEnabled();

    await user.click(sendButton);

    expect(onSend).toHaveBeenCalledWith("Como funciona a autenticação?");
    expect(input).toHaveValue("");
  });

  it("envia a pergunta ao pressionar Enter, mas não ao pressionar Shift+Enter", async () => {
    const user = userEvent.setup();
    const onSend = vi.fn();
    render(<ChatInput onSend={onSend} isLoading={false} />);

    const input = getVisibleTextbox();
    await user.type(input, "pergunta com shift{Shift>}{Enter}{/Shift}");
    expect(onSend).not.toHaveBeenCalled();

    await user.type(input, "pergunta final{Enter}");
    expect(onSend).toHaveBeenCalledWith(expect.stringContaining("pergunta final"));
  });

  it("desabilita o campo e o botão de enviar durante o carregamento", () => {
    render(<ChatInput onSend={vi.fn()} isLoading={true} />);

    expect(getVisibleTextbox()).toBeDisabled();
    expect(screen.getByRole("button", { name: "Enviar pergunta" })).toBeDisabled();
  });
});
