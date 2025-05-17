const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Caminho para o arquivo de configuração
const configFilePath = path.join(__dirname, '../data/config.json');

// Garantir que o arquivo existe
if (!fs.existsSync(configFilePath)) {
  fs.writeFileSync(configFilePath, JSON.stringify({
    ai: {
      provider: 'deepseek',
      apiKey: '',
      endpoint: 'https://api.deepseek.com/v1/chat/completions'
    },
    general: {
      iaName: 'AssistZap Pro',
      voiceTone: 'educado, informal',
      initialMessage: 'Olá, bem-vindo! Quer saber mais sobre nossos produtos?'
    },
    instructions: {
      promptPrincipal: 'Você é AssistZap Pro, um vendedor de [produto]. Converse de forma amigável e persuasiva.',
      salesTechniques: 'Oferecer desconto por tempo limitado\nMencionar clientes satisfeitos',
      objections: '{"Está caro": "Entendo, mas o valor traz retorno rápido!"}',
      triggers: 'Urgência: "Oferta válida hoje!"\nEscassez: "Últimas unidades!"',
      closingStrategy: 'Pergunte: "Posso enviar o link de pagamento?"'
    },
    tracking: {
      facebookPixel: '',
      googleTagManager: ''
    }
  }, null, 2));
}

// Obter todas as configurações
router.get('/', (req, res) => {
  try {
    const config = JSON.parse(fs.readFileSync(configFilePath, 'utf8'));
    res.json(config);
  } catch (error) {
    console.error('Erro ao ler configurações:', error);
    res.status(500).json({ error: 'Erro ao ler configurações' });
  }
});

// Atualizar configurações gerais
router.put('/general', (req, res) => {
  try {
    const { iaName, voiceTone, initialMessage } = req.body;
    
    if (!iaName || !voiceTone || !initialMessage) {
      return res.status(400).json({ error: 'Campos obrigatórios não preenchidos' });
    }
    
    const config = JSON.parse(fs.readFileSync(configFilePath, 'utf8'));
    
    config.general = {
      iaName,
      voiceTone,
      initialMessage
    };
    
    fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));
    
    res.json(config.general);
  } catch (error) {
    console.error('Erro ao atualizar configurações gerais:', error);
    res.status(500).json({ error: 'Erro ao atualizar configurações gerais' });
  }
});

// Atualizar instruções personalizadas
router.put('/instructions', (req, res) => {
  try {
    const { promptPrincipal, salesTechniques, objections, triggers, closingStrategy } = req.body;
    
    if (!promptPrincipal) {
      return res.status(400).json({ error: 'Prompt principal é obrigatório' });
    }
    
    const config = JSON.parse(fs.readFileSync(configFilePath, 'utf8'));
    
    config.instructions = {
      promptPrincipal,
      salesTechniques: salesTechniques || '',
      objections: objections || '{}',
      triggers: triggers || '',
      closingStrategy: closingStrategy || ''
    };
    
    fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));
    
    res.json(config.instructions);
  } catch (error) {
    console.error('Erro ao atualizar instruções:', error);
    res.status(500).json({ error: 'Erro ao atualizar instruções' });
  }
});

// Atualizar configurações de IA
router.put('/ai', (req, res) => {
  try {
    const { provider, apiKey, endpoint } = req.body;
    
    if (!provider || !apiKey) {
      return res.status(400).json({ error: 'Provedor e chave da API são obrigatórios' });
    }
    
    const config = JSON.parse(fs.readFileSync(configFilePath, 'utf8'));
    
    config.ai = {
      provider,
      apiKey,
      endpoint: endpoint || (provider === 'deepseek' 
        ? 'https://api.deepseek.com/v1/chat/completions' 
        : 'https://api.openai.com/v1/chat/completions')
    };
    
    fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));
    
    // Não retornar a chave da API na resposta por segurança
    const safeResponse = { ...config.ai };
    safeResponse.apiKey = '********';
    
    res.json(safeResponse);
  } catch (error) {
    console.error('Erro ao atualizar configurações de IA:', error);
    res.status(500).json({ error: 'Erro ao atualizar configurações de IA' });
  }
});

// Atualizar configurações de rastreamento
router.put('/tracking', (req, res) => {
  try {
    const { facebookPixel, googleTagManager } = req.body;
    
    const config = JSON.parse(fs.readFileSync(configFilePath, 'utf8'));
    
    config.tracking = {
      facebookPixel: facebookPixel || '',
      googleTagManager: googleTagManager || ''
    };
    
    fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));
    
    res.json(config.tracking);
  } catch (error) {
    console.error('Erro ao atualizar configurações de rastreamento:', error);
    res.status(500).json({ error: 'Erro ao atualizar configurações de rastreamento' });
  }
});

module.exports = router;
