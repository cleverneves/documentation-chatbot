# Autenticação na API

Todas as chamadas à API do Acme Cloud Storage devem incluir um cabeçalho de autenticação
usando uma **API Key**.

## Obtendo uma API Key

1. Acesse o painel web em `https://cloud.acme.example.com`.
2. Navegue até **Configurações > API Keys**.
3. Clique em **Gerar nova chave** e copie o valor exibido (ele não será mostrado novamente).

## Usando a API Key

Inclua o cabeçalho `Authorization` em todas as requisições:

```
Authorization: Bearer <SUA_API_KEY>
```

Exemplo com `curl`:

```
curl -H "Authorization: Bearer sk_live_abc123" \
     https://api.acme.example.com/v1/buckets
```

## Escopos de permissão

Cada API Key pode ser criada com um dos seguintes escopos:

- `read-only`: permite apenas leitura de buckets e objetos.
- `read-write`: permite leitura, upload e exclusão de objetos.
- `admin`: permite também gerenciar buckets, usuários e políticas de acesso.

## Rotação e revogação de chaves

Chaves comprometidas devem ser revogadas imediatamente na seção **API Keys**, clicando em
**Revogar**. Recomenda-se rotacionar as chaves de produção a cada 90 dias. Requisições feitas
com uma chave revogada retornam o código de erro HTTP `401 Unauthorized`.

## Limites de taxa (rate limiting)

Por padrão, cada API Key tem um limite de **120 requisições por minuto**. Ao exceder esse
limite, a API retorna o código HTTP `429 Too Many Requests`, junto com o cabeçalho
`Retry-After` indicando quantos segundos aguardar antes de tentar novamente.
