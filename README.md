# Documentação de Implantação do AssistZap Pro

Este documento contém as instruções para implantação do AssistZap Pro na plataforma Render.

## Estrutura do Projeto

O AssistZap Pro é uma aplicação monolítica que consiste em:
- Backend Node.js/Express
- Frontend HTML/CSS/JavaScript
- APIs para integração com WhatsApp e IA

## Requisitos para Implantação

- Conta na plataforma Render (https://render.com)
- Node.js 16.x ou superior

## Arquivos e Diretórios Importantes

- `backend/index.js`: Ponto de entrada da aplicação
- `backend/routes/`: APIs do sistema
- `frontend-build/`: Arquivos estáticos do frontend
- `data/`: Diretório para armazenamento de dados

## Implantação na Render

### Configuração do Web Service

1. Faça login na sua conta Render
2. Clique em "New" e selecione "Web Service"
3. Configure os seguintes parâmetros:
   - **Name**: assistzap-pro
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node backend/index.js`
   - **Plan**: Free (ou outro plano conforme necessidade)

### Variáveis de Ambiente

Configure as seguintes variáveis de ambiente no Render:
- `PORT`: 10000 (Render atribuirá automaticamente)
- `NODE_ENV`: production

## Verificação da Implantação

Após a implantação, verifique se:
1. O serviço está rodando corretamente
2. A página de login está acessível
3. É possível fazer login com as credenciais padrão (admin/admin123)
4. Todas as funcionalidades estão operacionais

## Credenciais Padrão

- **Usuário**: admin
- **Senha**: admin123

## Funcionalidades Principais

1. **Painel de Controle**: Visão geral do sistema
2. **Conexão com WhatsApp**: Integração via QR Code
3. **Fluxos de Atendimento**: Configuração de fluxos automatizados
4. **Histórico de Conversas**: Visualização e análise de conversas
5. **Configurações**: Personalização da IA e integrações

## Solução de Problemas

### Problemas Comuns

1. **Erro de Conexão**: Verifique se o servidor está rodando
2. **Erro de Login**: Verifique as credenciais padrão
3. **QR Code não aparece**: Verifique a conexão com a API do WhatsApp

### Logs

Para verificar logs:
1. Acesse o dashboard do Render
2. Selecione o serviço
3. Clique na aba "Logs"

## Manutenção

Para atualizar a aplicação:
1. Faça as alterações no código
2. Reimplante na plataforma Render

## Contato e Suporte

Para suporte técnico, entre em contato com o desenvolvedor.
