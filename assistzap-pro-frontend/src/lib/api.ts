import axios from 'axios';

// API base URL - será substituída pelo URL de produção após implantação
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://assistzap-pro-api.onrender.com/api'
  : 'http://localhost:3000/api';

// Configuração do cliente axios
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para adicionar token de autenticação
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Serviço de autenticação
export const authService = {
  login: async (username, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { username, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('isAuthenticated', 'true');
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro ao fazer login' };
    }
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
  },
  
  isAuthenticated: () => {
    return localStorage.getItem('isAuthenticated') === 'true';
  }
};

// Serviço de fluxos de atendimento
export const flowsService = {
  getFlows: async () => {
    try {
      const response = await apiClient.get('/flows');
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro ao obter fluxos' };
    }
  },
  
  addFlow: async (flow) => {
    try {
      const response = await apiClient.post('/flows', flow);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro ao adicionar fluxo' };
    }
  },
  
  updateFlow: async (id, flow) => {
    try {
      const response = await apiClient.put(`/flows/${id}`, flow);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro ao atualizar fluxo' };
    }
  },
  
  deleteFlow: async (id) => {
    try {
      const response = await apiClient.delete(`/flows/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro ao excluir fluxo' };
    }
  }
};

// Serviço de histórico de conversas
export const historyService = {
  getHistory: async () => {
    try {
      const response = await apiClient.get('/history');
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro ao obter histórico' };
    }
  },
  
  getConversation: async (client) => {
    try {
      const response = await apiClient.get(`/history/${client}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro ao obter conversa' };
    }
  },
  
  addMessage: async (client, message) => {
    try {
      const response = await apiClient.post(`/history/${client}/messages`, message);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro ao adicionar mensagem' };
    }
  },
  
  getStats: async () => {
    try {
      const response = await apiClient.get('/history/stats/summary');
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro ao obter estatísticas' };
    }
  }
};

// Serviço de configurações
export const configService = {
  getConfig: async () => {
    try {
      const response = await apiClient.get('/config');
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro ao obter configurações' };
    }
  },
  
  updateGeneralConfig: async (config) => {
    try {
      const response = await apiClient.put('/config/general', config);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro ao atualizar configurações gerais' };
    }
  },
  
  updateInstructions: async (instructions) => {
    try {
      const response = await apiClient.put('/config/instructions', instructions);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro ao atualizar instruções' };
    }
  },
  
  updateAIConfig: async (config) => {
    try {
      const response = await apiClient.put('/config/ai', config);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro ao atualizar configurações de IA' };
    }
  },
  
  updateTracking: async (tracking) => {
    try {
      const response = await apiClient.put('/config/tracking', tracking);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro ao atualizar configurações de rastreamento' };
    }
  }
};

// Serviço de IA
export const aiService = {
  getTraining: async () => {
    try {
      const response = await apiClient.get('/ai/training');
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro ao obter treinamento' };
    }
  },
  
  addTraining: async (userInput) => {
    try {
      const response = await apiClient.post('/ai/training', { user_input: userInput });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro ao adicionar treinamento' };
    }
  }
};

// Serviço de WhatsApp
export const whatsappService = {
  getStatus: async () => {
    try {
      const response = await apiClient.get('/whatsapp/status');
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro ao obter status do WhatsApp' };
    }
  },
  
  connect: async () => {
    try {
      const response = await apiClient.post('/whatsapp/connect');
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro ao conectar WhatsApp' };
    }
  },
  
  disconnect: async () => {
    try {
      const response = await apiClient.post('/whatsapp/disconnect');
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro ao desconectar WhatsApp' };
    }
  },
  
  sendMessage: async (recipient, message) => {
    try {
      const response = await apiClient.post('/whatsapp/send', { recipient, message });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro ao enviar mensagem' };
    }
  }
};

export default {
  authService,
  flowsService,
  historyService,
  configService,
  aiService,
  whatsappService
};
