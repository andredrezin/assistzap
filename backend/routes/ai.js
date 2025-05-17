const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Caminho para o arquivo de dados
const dataFilePath = path.join(__dirname, '../data/ai.json');

// Garantir que o arquivo existe
if (!fs.existsSync(dataFilePath)) {
  fs.writeFileSync(dataFilePath, JSON.stringify({
    training: []
  }, null, 2));
}

// Obter dados de treinamento
router.get('/training', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    res.json(data.training);
  } catch (error) {
    console.error('Erro ao ler dados de treinamento:', error);
    res.status(500).json({ error: 'Erro ao ler dados de treinamento' });
  }
});

// Adicionar exemplo de treinamento
router.post('/training', (req, res) => {
  try {
    const { user_input } = req.body;
    
    if (!user_input) {
      return res.status(400).json({ error: 'Input do usuário é obrigatório' });
    }
    
    const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    
    // Simular resposta da IA
    const aiResponse = `Aqui está uma resposta simulada para: "${user_input}". Em produção, isso seria gerado pela API DeepSeek.`;
    
    // Adicionar ao treinamento
    const trainingExample = {
      id: data.training.length + 1,
      user_input,
      ai_response: aiResponse,
      timestamp: new Date().toISOString()
    };
    
    data.training.push(trainingExample);
    
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    
    res.status(201).json(trainingExample);
  } catch (error) {
    console.error('Erro ao adicionar treinamento:', error);
    res.status(500).json({ error: 'Erro ao adicionar treinamento' });
  }
});

// Gerar resposta da IA
router.post('/generate', async (req, res) => {
  try {
    const { prompt, config } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt é obrigatório' });
    }
    
    // Obter configurações
    const configFilePath = path.join(__dirname, '../data/config.json');
    let aiConfig = {};
    
    if (fs.existsSync(configFilePath)) {
      const configData = JSON.parse(fs.readFileSync(configFilePath, 'utf8'));
      aiConfig = configData.ai || {};
    }
    
    // Verificar se há chave de API configurada
    if (!aiConfig.apiKey && !config?.apiKey) {
      // Simulação de resposta da IA
      return res.json({
        response: `Resposta simulada para: "${prompt}". Configure uma chave de API para usar a IA real.`,
        model: 'simulation'
      });
    }
    
    // Em produção, aqui seria feita a chamada real para a API DeepSeek ou OpenAI
    // Simulação de chamada de API
    const apiResponse = {
      response: `Resposta gerada pela IA para: "${prompt}". Esta é uma simulação.`,
      model: config?.provider || aiConfig.provider || 'deepseek'
    };
    
    res.json(apiResponse);
  } catch (error) {
    console.error('Erro ao gerar resposta da IA:', error);
    res.status(500).json({ error: 'Erro ao gerar resposta da IA' });
  }
});

module.exports = router;
