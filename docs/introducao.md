# Introdução ao Acme Cloud Storage

O **Acme Cloud Storage** é um serviço de armazenamento de arquivos na nuvem, projetado para
equipes de desenvolvimento que precisam guardar, versionar e compartilhar arquivos de forma
segura e escalável.

## Principais recursos

- Upload e download de arquivos via API REST ou SDKs oficiais (Python, JavaScript, Go).
- Controle de acesso baseado em papéis (RBAC) por bucket e por arquivo.
- Versionamento automático de arquivos, com retenção configurável.
- Criptografia em repouso (AES-256) e em trânsito (TLS 1.3).
- Webhooks para notificação de eventos (upload, exclusão, alteração de permissão).

## Conceitos principais

- **Bucket**: unidade lógica de armazenamento, similar a uma pasta raiz. Cada bucket possui um
  nome único dentro da organização.
- **Objeto**: um arquivo armazenado dentro de um bucket, identificado por uma chave (path).
- **Organização**: conta principal que agrupa usuários, buckets e políticas de cobrança.

## Primeiros passos

1. Crie uma conta em `https://cloud.acme.example.com`.
2. Gere uma API Key na seção **Configurações > API Keys**.
3. Instale o SDK oficial: `pip install acme-cloud-storage` (Python) ou
   `npm install @acme/cloud-storage` (JavaScript).
4. Crie seu primeiro bucket usando a API ou o painel web.

O plano gratuito inclui 5 GB de armazenamento e 10.000 requisições por mês. Planos pagos
começam em $9/mês para 100 GB de armazenamento.
