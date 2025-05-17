import Layout from '../components/Layout/Layout';
import { useState } from 'react';
import { GitBranch, Plus, Save, Trash } from 'lucide-react';

const FlowsPage = () => {
  const [flows, setFlows] = useState([
    { id: 1, condition: 'preço', response: 'O preço é R$ 99,90, com desconto hoje!' },
    { id: 2, condition: 'prazo', response: 'O prazo de entrega é de 5 a 7 dias úteis.' }
  ]);
  
  const [newCondition, setNewCondition] = useState('');
  const [newResponse, setNewResponse] = useState('');

  const handleAddFlow = () => {
    if (newCondition.trim() === '' || newResponse.trim() === '') {
      return;
    }
    
    const newFlow = {
      id: Date.now(),
      condition: newCondition,
      response: newResponse
    };
    
    setFlows([...flows, newFlow]);
    setNewCondition('');
    setNewResponse('');
  };

  const handleDeleteFlow = (id) => {
    setFlows(flows.filter(flow => flow.id !== id));
  };

  const handleSaveFlows = () => {
    // Simulação de salvamento - será substituída pela integração real com o backend
    alert('Fluxos salvos com sucesso!');
  };

  return (
    <Layout title="Fluxos de Atendimento">
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Editor de Fluxos</h3>
            <button 
              onClick={handleSaveFlows}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center"
            >
              <Save className="mr-2" size={16} />
              Salvar Todos os Fluxos
            </button>
          </div>
          
          <p className="text-gray-600 mb-6">
            Configure respostas automáticas baseadas em palavras-chave que seus clientes enviam.
          </p>
          
          <div className="space-y-4 mb-8">
            {flows.map(flow => (
              <div key={flow.id} className="border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row md:items-center">
                <div className="flex-1 mb-4 md:mb-0">
                  <div className="flex items-center mb-2">
                    <GitBranch className="text-blue-500 mr-2" size={20} />
                    <span className="font-medium">Se o cliente digitar:</span>
                  </div>
                  <div className="ml-8 p-2 bg-gray-50 rounded border border-gray-200">
                    {flow.condition}
                  </div>
                </div>
                
                <div className="flex-1 mb-4 md:mb-0 md:mx-4">
                  <div className="font-medium mb-2">Responder:</div>
                  <div className="p-2 bg-gray-50 rounded border border-gray-200">
                    {flow.response}
                  </div>
                </div>
                
                <div>
                  <button 
                    onClick={() => handleDeleteFlow(flow.id)}
                    className="px-3 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
                  >
                    <Trash size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-6">
            <h4 className="font-medium mb-4 flex items-center">
              <Plus className="text-green-500 mr-2" size={20} />
              Adicionar Novo Fluxo
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Se o cliente digitar:
                </label>
                <input 
                  type="text" 
                  value={newCondition}
                  onChange={(e) => setNewCondition(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Ex: promoção"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Responder:
                </label>
                <input 
                  type="text" 
                  value={newResponse}
                  onChange={(e) => setNewResponse(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Ex: Temos uma promoção especial hoje!"
                />
              </div>
            </div>
            
            <button 
              onClick={handleAddFlow}
              className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800"
            >
              Adicionar Fluxo
            </button>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Dicas para Fluxos Eficientes</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Use palavras-chave que seus clientes provavelmente digitarão</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Mantenha respostas claras e diretas</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Inclua chamadas para ação nas suas respostas</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Teste seus fluxos regularmente para garantir que funcionam como esperado</span>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default FlowsPage;
