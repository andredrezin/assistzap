const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Caminho para o arquivo de dados
const dataFilePath = path.join(__dirname, '../data/flows.json');

// Garantir que o arquivo existe
if (!fs.existsSync(dataFilePath)) {
  fs.writeFileSync(dataFilePath, JSON.stringify([
    {
      id: 1,
      name: 'Atendimento Inicial',
      trigger: 'Mensagem de boas-vindas',
      status: 'active',
      steps: [
        {
          id: 1,
          type: 'message',
          content: 'Olá, bem-vindo! Quer saber mais sobre nossos produtos?',
          options: ['Sim', 'Não']
        },
        {
          id: 2,
          type: 'condition',
          condition: 'Sim',
          nextStep: 3
        },
        {
          id: 3,
          type: 'message',
          content: 'Ótimo! Temos produtos incríveis com preços especiais hoje. O que você está procurando?'
        }
      ]
    }
  ], null, 2));
}

// Obter todos os fluxos
router.get('/', (req, res) => {
  try {
    const flows = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    res.json(flows);
  } catch (error) {
    console.error('Erro ao ler fluxos:', error);
    res.status(500).json({ error: 'Erro ao ler fluxos' });
  }
});

// Obter um fluxo específico
router.get('/:id', (req, res) => {
  try {
    const flows = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    const flow = flows.find(f => f.id === parseInt(req.params.id));
    
    if (!flow) {
      return res.status(404).json({ error: 'Fluxo não encontrado' });
    }
    
    res.json(flow);
  } catch (error) {
    console.error('Erro ao ler fluxo:', error);
    res.status(500).json({ error: 'Erro ao ler fluxo' });
  }
});

// Criar novo fluxo
router.post('/', (req, res) => {
  try {
    const { name, trigger, steps } = req.body;
    
    if (!name || !trigger) {
      return res.status(400).json({ error: 'Nome e gatilho são obrigatórios' });
    }
    
    const flows = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    
    const newFlow = {
      id: flows.length > 0 ? Math.max(...flows.map(f => f.id)) + 1 : 1,
      name,
      trigger,
      status: 'active',
      steps: steps || []
    };
    
    flows.push(newFlow);
    
    fs.writeFileSync(dataFilePath, JSON.stringify(flows, null, 2));
    
    res.status(201).json(newFlow);
  } catch (error) {
    console.error('Erro ao criar fluxo:', error);
    res.status(500).json({ error: 'Erro ao criar fluxo' });
  }
});

// Atualizar fluxo existente
router.put('/:id', (req, res) => {
  try {
    const { name, trigger, status, steps } = req.body;
    const flowId = parseInt(req.params.id);
    
    const flows = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    const flowIndex = flows.findIndex(f => f.id === flowId);
    
    if (flowIndex === -1) {
      return res.status(404).json({ error: 'Fluxo não encontrado' });
    }
    
    flows[flowIndex] = {
      ...flows[flowIndex],
      name: name || flows[flowIndex].name,
      trigger: trigger || flows[flowIndex].trigger,
      status: status || flows[flowIndex].status,
      steps: steps || flows[flowIndex].steps
    };
    
    fs.writeFileSync(dataFilePath, JSON.stringify(flows, null, 2));
    
    res.json(flows[flowIndex]);
  } catch (error) {
    console.error('Erro ao atualizar fluxo:', error);
    res.status(500).json({ error: 'Erro ao atualizar fluxo' });
  }
});

// Excluir fluxo
router.delete('/:id', (req, res) => {
  try {
    const flowId = parseInt(req.params.id);
    
    const flows = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    const flowIndex = flows.findIndex(f => f.id === flowId);
    
    if (flowIndex === -1) {
      return res.status(404).json({ error: 'Fluxo não encontrado' });
    }
    
    flows.splice(flowIndex, 1);
    
    fs.writeFileSync(dataFilePath, JSON.stringify(flows, null, 2));
    
    res.json({ success: true, message: 'Fluxo excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir fluxo:', error);
    res.status(500).json({ error: 'Erro ao excluir fluxo' });
  }
});

module.exports = router;
