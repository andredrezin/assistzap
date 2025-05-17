# Documentação de Implantação do AssistZap Pro

Este documento contém as instruções para implantação permanente do AssistZap Pro na plataforma Render.

## Estrutura do Projeto

O AssistZap Pro é composto por duas partes principais:
1. **Backend**: API Node.js/Express
2. **Frontend**: Aplicação React

## Requisitos para Implantação

- Conta na plataforma Render (https://render.com)
- Node.js 18.x ou superior
- Repositório Git (opcional, mas recomendado)

## Implantação do Backend

### Configuração no Render

1. Faça login na sua conta Render
2. Clique em "New" e selecione "Web Service"
3. Conecte seu repositório Git ou use a opção "Deploy from source"
4. Configure os seguintes parâmetros:
   - **Name**: assistzap-pro-api
   - **Runtime**: Node
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && node index.js`
   - **Plan**: Free (ou outro plano conforme necessidade)

### Variáveis de Ambiente

Configure as seguintes variáveis de ambiente no Render:
- `PORT`: 10000 (Render atribuirá automaticamente)
- `NODE_ENV`: production
- `DEEPSEEK_API_KEY`: Sua chave da API DeepSeek (opcional)
- `SESSION_ID`: assistzap-pro

## Implantação do Frontend

### Configuração no Render

1. Faça login na sua conta Render
2. Clique em "New" e selecione "Static Site"
3. Conecte seu repositório Git ou use a opção "Deploy from source"
4. Configure os seguintes parâmetros:
   - **Name**: assistzap-pro
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/build`
   - **Plan**: Free (ou outro plano conforme necessidade)

### Variáveis de Ambiente

Configure as seguintes variáveis de ambiente no Render:
- `REACT_APP_API_URL`: URL do seu backend (ex: https://assistzap-pro-api.onrender.com/api)

## Verificação da Implantação

Após a implantação, verifique se:
1. O backend está respondendo corretamente (acesse https://assistzap-pro-api.onrender.com/api)
2. O frontend está carregando corretamente (acesse https://assistzap-pro.onrender.com)
3. A comunicação entre frontend e backend está funcionando

## Solução de Problemas

### Problemas Comuns

1. **Erro de CORS**: Verifique se o backend está configurado para aceitar requisições do frontend
2. **Erro de Conexão**: Verifique se as URLs estão corretas nas variáveis de ambiente
3. **Erro de Autenticação**: Verifique se o token está sendo enviado corretamente

### Logs

Para verificar logs:
1. Acesse o dashboard do Render
2. Selecione o serviço (backend ou frontend)
3. Clique na aba "Logs"

## Manutenção

Para atualizar a aplicação:
1. Faça as alterações no código
2. Faça commit e push para o repositório Git
3. O Render detectará as alterações e fará a reimplantação automaticamente

## Contato e Suporte

Para suporte técnico, entre em contato com o desenvolvedor.
