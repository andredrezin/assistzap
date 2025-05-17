import { useState } from 'react';
import Layout from '../components/Layout/Layout';
import { Settings as SettingsIcon, Save, MessageSquare, Bot, Code } from 'lucide-react';

interface GeneralSettings {
  iaName: string;
  voiceTone: string;
  initialMessage: string;
}

interface Instructions {
  promptPrincipal: string;
  salesTechniques: string;
  objections: string;
  triggers: string;
  closingStrategy: string;
}

interface AISettings {
  apiKey: string;
  provider: string;
}

interface Tracking {
  facebookPixel: string;
  googleTagManager: string;
}

interface ChatMessage {
  role: string;
  content: string;
}

const SettingsPage = () => {
  const [generalSettings, setGeneralSettings] = useState<GeneralSettings>({
    iaName: 'AssistZap Pro',
    voiceTone: 'educado, informal',
    initialMessage: 'Olá, bem-vindo! Quer saber mais sobre nossos produtos?'
  });

  const [instructions, setInstructions] = useState<Instructions>({
    promptPrincipal: 'Você é AssistZap Pro, um vendedor de [produto]. Converse de forma amigável e persuasiva.',
    salesTechniques: 'Oferecer desconto por tempo limitado\nMencionar clientes satisfeitos',
    objections: '{"Está caro": "Entendo, mas o valor traz retorno rápido!"}',
    triggers: 'Urgência: "Oferta válida hoje!"\nEscassez: "Últimas unidades!"',
    closingStrategy: 'Pergunte: "Posso enviar o link de pagamento?"'
  });

  const [aiSettings, setAiSettings] = useState<AISettings>({
    apiKey: '',
    provider: 'deepseek'
  });

  const [tracking, setTracking] = useState<Tracking>({
    facebookPixel: '',
    googleTagManager: ''
  });

  const [trainingChat, setTrainingChat] = useState<ChatMessage[]>([]);
  const [trainingInput, setTrainingInput] = useState<string>('');

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGeneralSettings({
      ...generalSettings,
      [name]: value
    });
  };

  const handleInstructionsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInstructions({
      ...instructions,
      [name]: value
    });
  };

  const handleAiChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAiSettings({
      ...aiSettings,
      [name]: value
    });
  };

  const handleTrackingChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTracking({
      ...tracking,
      [name]: value
    });
  };

  const handleSaveSettings = () => {
    // Simulação de salvamento - será substituída pela integração real com o backend
    alert('Configurações salvas com sucesso!');
  };

  const handleSendTrainingMessage = () => {
    if (trainingInput.trim() === '') return;

    // Adiciona mensagem do usuário
    setTrainingChat([
      ...trainingChat,
      { role: 'user', content: trainingInput }
    ]);

    // Simulação de resposta da IA - será substituída pela integração real com a API
    setTimeout(() => {
      setTrainingChat(prev => [
        ...prev,
        { 
          role: 'assistant', 
          content: `Aqui está uma resposta simulada para: "${trainingInput}". Em produção, isso será gerado pela API DeepSeek.` 
        }
      ]);
      setTrainingInput('');
    }, 1000);
  };

  const handleSaveTraining = () => {
    // Simulação de salvamento do treinamento - será substituída pela integração real
    alert('Treinamento salvo com sucesso!');
  };

  return (
    <Layout title="Configurações">
      <div className="space-y-8">
        {/* Personalização da IA */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <SettingsIcon className="mr-2" size={20} />
            Personalização da IA
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome da IA
              </label>
              <input 
                type="text" 
                name="iaName"
                value={generalSettings.iaName}
                onChange={handleGeneralChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tom de Voz
              </label>
              <input 
                type="text" 
                name="voiceTone"
                value={generalSettings.voiceTone}
                onChange={handleGeneralChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mensagem Inicial
            </label>
            <textarea 
              name="initialMessage"
              value={generalSettings.initialMessage}
              onChange={handleGeneralChange}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
            />
          </div>
        </div>
        
        {/* Instruções Personalizadas */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <MessageSquare className="mr-2" size={20} />
            Instruções Personalizadas
          </h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prompt Principal
            </label>
            <textarea 
              name="promptPrincipal"
              value={instructions.promptPrincipal}
              onChange={handleInstructionsChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Técnicas de Vendas
              </label>
              <textarea 
                name="salesTechniques"
                value={instructions.salesTechniques}
                onChange={handleInstructionsChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Respostas a Objeções
              </label>
              <textarea 
                name="objections"
                value={instructions.objections}
                onChange={handleInstructionsChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gatilhos Mentais
              </label>
              <textarea 
                name="triggers"
                value={instructions.triggers}
                onChange={handleInstructionsChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estratégias de Fechamento
              </label>
              <input 
                type="text" 
                name="closingStrategy"
                value={instructions.closingStrategy}
                onChange={handleInstructionsChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
              />
            </div>
          </div>
        </div>
        
        {/* Treinamento da IA */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Bot className="mr-2" size={20} />
            Treinamento da IA
          </h3>
          
          <div className="bg-gray-50 p-4 rounded-lg h-64 overflow-y-auto mb-4 border border-gray-200">
            {trainingChat.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Bot size={32} className="mb-2 opacity-30" />
                <p>Inicie uma conversa para treinar a IA</p>
              </div>
            ) : (
              <div className="space-y-4">
                {trainingChat.map((msg, index) => (
                  <div 
                    key={index}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                        msg.role === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p>{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex mb-4">
            <input 
              type="text" 
              value={trainingInput}
              onChange={(e) => setTrainingInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendTrainingMessage()}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
              placeholder="Digite uma mensagem para treinar a IA..."
            />
            <button 
              onClick={handleSendTrainingMessage}
              className="px-4 py-2 bg-blue-900 text-white rounded-r-md hover:bg-blue-800"
            >
              Enviar
            </button>
          </div>
          
          <button 
            onClick={handleSaveTraining}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Salvar Treinamento
          </button>
        </div>
        
        {/* Integração de IA */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Code className="mr-2" size={20} />
            Integração de IA
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Provedor de IA
              </label>
              <select 
                name="provider"
                value={aiSettings.provider}
                onChange={handleAiChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="deepseek">DeepSeek</option>
                <option value="openai">OpenAI</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Chave da API
              </label>
              <input 
                type="password" 
                name="apiKey"
                value={aiSettings.apiKey}
                onChange={handleAiChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                placeholder="Insira sua chave de API"
              />
            </div>
          </div>
        </div>
        
        {/* Rastreamento */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Rastreamento</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Facebook Pixel
            </label>
            <textarea 
              name="facebookPixel"
              value={tracking.facebookPixel}
              onChange={handleTrackingChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-mono text-sm" 
              placeholder="<script>!function(f,b,e,v,n,t,s){...}</script>"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Google Tag Manager
            </label>
            <textarea 
              name="googleTagManager"
              value={tracking.googleTagManager}
              onChange={handleTrackingChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-mono text-sm" 
              placeholder="<script>(function(w,d,s,l,i){...}</script>"
            />
          </div>
        </div>
        
        {/* Botão Salvar */}
        <div className="flex justify-end">
          <button 
            onClick={handleSaveSettings}
            className="px-6 py-3 bg-blue-900 text-white rounded-md hover:bg-blue-800 flex items-center"
          >
            <Save className="mr-2" size={18} />
            Salvar Todas as Configurações
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
