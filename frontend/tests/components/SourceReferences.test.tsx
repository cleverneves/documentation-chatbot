import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { SourceReferences } from "../../src/features/chat/components/SourceReferences";

describe("SourceReferences", () => {
  it("não renderiza nada quando não há fontes", () => {
    const { container } = render(<SourceReferences sources={[]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("lista os arquivos de origem utilizados no resumo", () => {
    render(
      <SourceReferences
        sources={[
          { fileName: "autenticacao.md", excerpt: "Trecho sobre autenticação.", score: 0.9 },
          { fileName: "faq.md", excerpt: "Trecho da FAQ.", score: 0.7 },
        ]}
      />,
    );

    // O texto também existe (oculto) nos detalhes recolhidos; usamos o
    // resumo do accordion como escopo para verificar o que é visível de fato.
    const summary = screen.getByText("Fontes utilizadas:").closest("button")!;
    expect(within(summary).getByText("autenticacao.md")).toBeInTheDocument();
    expect(within(summary).getByText("faq.md")).toBeInTheDocument();
  });

  it("exibe o trecho de cada fonte ao expandir os detalhes", async () => {
    const user = userEvent.setup();
    render(
      <SourceReferences
        sources={[
          { fileName: "autenticacao.md", excerpt: "Trecho sobre autenticação.", score: 0.9 },
          { fileName: "faq.md", excerpt: "Trecho da FAQ.", score: 0.7 },
        ]}
      />,
    );

    await user.click(screen.getByText("Fontes utilizadas:"));

    expect(await screen.findByText("Trecho sobre autenticação.")).toBeInTheDocument();
    expect(await screen.findByText("Trecho da FAQ.")).toBeInTheDocument();
  });
});
