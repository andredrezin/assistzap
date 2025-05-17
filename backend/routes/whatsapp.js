const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Caminho para o arquivo de dados
const dataFilePath = path.join(__dirname, '../data/whatsapp.json');

// Garantir que o arquivo existe
if (!fs.existsSync(dataFilePath)) {
  fs.writeFileSync(dataFilePath, JSON.stringify({
    status: 'disconnected',
    qrCode: '',
    lastUpdate: new Date().toISOString()
  }, null, 2));
}

// Obter status do WhatsApp
router.get('/status', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    res.json(data);
  } catch (error) {
    console.error('Erro ao ler status do WhatsApp:', error);
    res.status(500).json({ error: 'Erro ao ler status do WhatsApp' });
  }
});

// Conectar WhatsApp
router.post('/connect', (req, res) => {
  try {
    // Simulação de geração de QR Code - em produção, isso seria feito pela biblioteca Baileys
    const data = {
      status: 'pending',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=whatsapp-connect-' + Date.now(),
      lastUpdate: new Date().toISOString()
    };
    
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    
    // Simulação de conexão após 10 segundos
    setTimeout(() => {
      const connectedData = {
        status: 'connected',
        qrCode: '',
        lastUpdate: new Date().toISOString()
      };
      fs.writeFileSync(dataFilePath, JSON.stringify(connectedData, null, 2));
    }, 10000);
    
    res.json(data);
  } catch (error) {
    console.error('Erro ao conectar WhatsApp:', error);
    res.status(500).json({ error: 'Erro ao conectar WhatsApp' });
  }
});

// Desconectar WhatsApp
router.post('/disconnect', (req, res) => {
  try {
    const data = {
      status: 'disconnected',
      qrCode: '',
      lastUpdate: new Date().toISOString()
    };
    
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    
    res.json(data);
  } catch (error) {
    console.error('Erro ao desconectar WhatsApp:', error);
    res.status(500).json({ error: 'Erro ao desconectar WhatsApp' });
  }
});

// Enviar mensagem
router.post('/send', (req, res) => {
  try {
    const { recipient, message } = req.body;
    
    if (!recipient || !message) {
      return res.status(400).json({ error: 'Destinatário e mensagem são obrigatórios' });
    }
    
    // Verificar status da conexão
    const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    
    if (data.status !== 'connected') {
      return res.status(400).json({ error: 'WhatsApp não está conectado' });
    }
    
    // Simulação de envio de mensagem - em produção, isso seria feito pela biblioteca Baileys
    
    // Adicionar mensagem ao histórico
    const historyFilePath = path.join(__dirname, '../data/history.json');
    let history = [];
    
    if (fs.existsSync(historyFilePath)) {
      history = JSON.parse(fs.readFileSync(historyFilePath, 'utf8'));
    }
    
    // Procurar conversa existente ou criar nova
    let conversation = history.find(conv => conv.client === recipient);
    
    if (!conversation) {
      conversation = {
        id: history.length + 1,
        client: recipient,
        lastMessage: message,
        timestamp: new Date().toISOString(),
        messages: []
      };
      history.push(conversation);
    }
    
    // Adicionar mensagem à conversa
    conversation.messages.push({
      from: 'bot',
      text: message,
      timestamp: new Date().toISOString()
    });
    
    conversation.lastMessage = message;
    conversation.timestamp = new Date().toISOString();
    
    fs.writeFileSync(historyFilePath, JSON.stringify(history, null, 2));
    
    res.json({ success: true, message: 'Mensagem enviada com sucesso' });
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    res.status(500).json({ error: 'Erro ao enviar mensagem' });
  }
});

module.exports = router;
