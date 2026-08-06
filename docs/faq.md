# Perguntas Frequentes (FAQ)

## Como faço para aumentar o limite de armazenamento do meu plano?

Acesse **Configurações > Plano e Cobrança** no painel web e escolha um plano superior. O
upgrade é aplicado imediatamente e a cobrança é feita de forma proporcional (pro-rata) no
ciclo atual.

## É possível restaurar um arquivo excluído?

Sim. Arquivos excluídos ficam disponíveis na **lixeira** do bucket por até 30 dias antes de
serem removidos permanentemente. Você pode restaurá-los pela API (`POST
/v1/buckets/{bucket}/objects/{key}/restore`) ou pelo painel web.

## Qual o tamanho máximo de arquivo suportado?

O tamanho máximo por objeto é de **5 TB** utilizando upload multipart. Para uploads simples
(single request), o limite é de **5 GB**.

## O serviço é compatível com a API do Amazon S3?

Sim, o Acme Cloud Storage oferece um endpoint compatível com o protocolo S3, permitindo o uso
de ferramentas e SDKs existentes com alterações mínimas de configuração (apenas o endpoint e
as credenciais precisam ser trocados).

## Como reportar um problema ou solicitar suporte?

Clientes dos planos pagos podem abrir um chamado de suporte pelo painel web, na seção
**Ajuda > Novo Chamado**, com tempo de resposta garantido de até 4 horas úteis. Usuários do
plano gratuito podem buscar ajuda na comunidade em `https://forum.acme.example.com`.
