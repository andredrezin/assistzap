const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Caminho para o arquivo de dados
const dataFilePath = path.join(__dirname, '../data/history.json');

// Garantir que o arquivo existe
if (!fs.existsSync(dataFilePath)) {
  fs.writeFileSync(dataFilePath, JSON.stringify([
    {
      id: 1,
      client: '+5511999999999',
      lastMessage: 'Qual o preço?',
      timestamp: '2025-05-16T22:00:00Z',
      messages: [
        { from: 'client', text: 'Qual o preço?', timestamp: '2025-05-16T22:00:00Z' },
        { from: 'bot', text: 'O preço é R$ 99,90, com desconto hoje!', timestamp: '2025-05-16T22:00:05Z' }
      ]
    }
  ], null, 2));
}

// Obter todo o histórico
router.get('/', (req, res) => {
  try {
    const history = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    res.json(history);
  } catch (error) {
    console.error('Erro ao ler histórico:', error);
    res.status(500).json({ error: 'Erro ao ler histórico' });
  }
});

// Obter conversa específica
router.get('/:client', (req, res) => {
  try {
    const history = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    const conversation = history.find(conv => conv.client === req.params.client);
    
    if (!conversation) {
      return res.status(404).json({ error: 'Conversa não encontrada' });
    }
    
    res.json(conversation);
  } catch (error) {
    console.error('Erro ao ler conversa:', error);
    res.status(500).json({ error: 'Erro ao ler conversa' });
  }
});

// Adicionar mensagem a uma conversa
router.post('/:client/messages', (req, res) => {
  try {
    const { text, from } = req.body;
    const client = req.params.client;
    
    if (!text || !from) {
      return res.status(400).json({ error: 'Texto e origem da mensagem são obrigatórios' });
    }
    
    const history = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    let conversation = history.find(conv => conv.client === client);
    
    if (!conversation) {
      // Criar nova conversa
      conversation = {
        id: history.length > 0 ? Math.max(...history.map(conv => conv.id)) + 1 : 1,
        client,
        lastMessage: text,
        timestamp: new Date().toISOString(),
        messages: []
      };
      history.push(conversation);
    }
    
    // Adicionar mensagem
    const message = {
      from,
      text,
      timestamp: new Date().toISOString()
    };
    
    conversation.messages.push(message);
    conversation.lastMessage = text;
    conversation.timestamp = message.timestamp;
    
    fs.writeFileSync(dataFilePath, JSON.stringify(history, null, 2));
    
    res.status(201).json(message);
  } catch (error) {
    console.error('Erro ao adicionar mensagem:', error);
    res.status(500).json({ error: 'Erro ao adicionar mensagem' });
  }
});

// Obter estatísticas do histórico
router.get('/stats/summary', (req, res) => {
  try {
    const history = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    
    // Calcular estatísticas
    const totalConversations = history.length;
    
    let totalMessages = 0;
    let clientMessages = 0;
    let botMessages = 0;
    
    history.forEach(conv => {
      totalMessages += conv.messages.length;
      clientMessages += conv.messages.filter(msg => msg.from === 'client').length;
      botMessages += conv.messages.filter(msg => msg.from === 'bot').length;
    });
    
    // Calcular mensagens nas últimas 24h
    const now = new Date();
    const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    
    let messagesLast24h = 0;
    history.forEach(conv => {
      messagesLast24h += conv.messages.filter(msg => {
        const msgDate = new Date(msg.timestamp);
        return msgDate >= last24h;
      }).length;
    });
    
    const stats = {
      totalConversations,
      totalMessages,
      clientMessages,
      botMessages,
      messagesLast24h,
      responseRate: totalMessages > 0 ? (botMessages / clientMessages * 100).toFixed(2) + '%' : '0%'
    };
    
    res.json(stats);
  } catch (error) {
    console.error('Erro ao obter estatísticas:', error);
    res.status(500).json({ error: 'Erro ao obter estatísticas' });
  }
});

module.exports = router;
