require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { createServer } = require('http');

// Inicialização do app Express
const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Verificar e criar diretórios de dados se não existirem
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Arquivos de dados iniciais
const dataFiles = ['flows.json', 'history.json', 'config.json', 'training.json'];
dataFiles.forEach(file => {
  const filePath = path.join(dataDir, file);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2));
  }
});

// Importar rotas
const whatsappRoutes = require('./routes/whatsapp');
const flowsRoutes = require('./routes/flows');
const historyRoutes = require('./routes/history');
const configRoutes = require('./routes/config');
const aiRoutes = require('./routes/ai');

// Autenticação simples (middleware)
const authMiddleware = (req, res, next) => {
  // Implementação simples para desenvolvimento
  // Em produção, usar JWT ou outro método mais seguro
  const authHeader = req.headers.authorization;
  
  if (!authHeader || authHeader !== 'Bearer admin123') {
    return res.status(401).json({ error: 'Não autorizado' });
  }
  
  next();
};

// Aplicar rotas
app.use('/api/whatsapp', authMiddleware, whatsappRoutes);
app.use('/api/flows', authMiddleware, flowsRoutes);
app.use('/api/history', authMiddleware, historyRoutes);
app.use('/api/config', authMiddleware, configRoutes);
app.use('/api/ai', authMiddleware, aiRoutes);

// Rota de login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  // Autenticação simples
  if (username === 'admin' && password === 'admin123') {
    res.json({ 
      success: true, 
      token: 'admin123', // Em produção, gerar JWT
      user: { username: 'admin' }
    });
  } else {
    res.status(401).json({ 
      success: false, 
      error: 'Credenciais inválidas' 
    });
  }
});

// Rota padrão da API
app.get('/api', (req, res) => {
  res.send('AssistZap Pro API está funcionando!');
});

// Servir arquivos estáticos do frontend (build React)
app.use(express.static(path.join(__dirname, '../frontend-build')));

// Rota catch-all para SPA (Single Page Application)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend-build', 'index.html'));
});

// Iniciar servidor
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = { app, server };
