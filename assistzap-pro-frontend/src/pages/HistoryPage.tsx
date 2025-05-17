import { useState } from 'react';
import Layout from '../components/Layout/Layout';
import { History as HistoryIcon, Search, Calendar, User, MessageCircle } from 'lucide-react';

interface Message {
  from: string;
  text: string;
  timestamp: string;
}

interface Conversation {
  id: number;
  client: string;
  lastMessage: string;
  timestamp: string;
  messages: Message[];
}

const HistoryPage = () => {
  const [conversations, setConversations] = useState<Conversation[]>([
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
  ]);
  
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR');
  };

  const filteredConversations = conversations.filter(
    conv => conv.client.includes(searchTerm) || 
    conv.messages.some(msg => msg.text.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Layout title="Histórico de Conversas">
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold flex items-center">
              <HistoryIcon className="mr-2" size={20} />
              Conversas Recentes
            </h3>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar conversas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 border-r pr-4">
              <h4 className="font-medium mb-4">Clientes</h4>
              
              {filteredConversations.length === 0 ? (
                <p className="text-gray-500">Nenhuma conversa encontrada</p>
              ) : (
                <div className="space-y-2">
                  {filteredConversations.map(conv => (
                    <div 
                      key={conv.id}
                      onClick={() => handleSelectConversation(conv)}
                      className={`p-3 rounded-lg cursor-pointer ${
                        selectedConversation?.id === conv.id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center mb-1">
                        <User className="text-gray-400 mr-2" size={16} />
                        <span className="font-medium">{conv.client}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MessageCircle className="mr-1" size={14} />
                        <span className="truncate">{conv.lastMessage}</span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1 flex items-center">
                        <Calendar className="mr-1" size={12} />
                        {formatDate(conv.timestamp)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="md:col-span-2">
              <h4 className="font-medium mb-4">Detalhes da Conversa</h4>
              
              {!selectedConversation ? (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                  <MessageCircle size={48} className="mb-4 opacity-30" />
                  <p>Selecione uma conversa para ver os detalhes</p>
                </div>
              ) : (
                <div>
                  <div className="bg-gray-100 p-3 rounded-lg mb-4">
                    <span className="font-medium">Cliente:</span> {selectedConversation.client}
                  </div>
                  
                  <div className="space-y-4 max-h-96 overflow-y-auto p-2">
                    {selectedConversation.messages.map((msg, index) => (
                      <div 
                        key={index}
                        className={`flex ${msg.from === 'client' ? 'justify-start' : 'justify-end'}`}
                      >
                        <div 
                          className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                            msg.from === 'client' 
                              ? 'bg-gray-100 text-gray-800' 
                              : 'bg-blue-600 text-white'
                          }`}
                        >
                          <p>{msg.text}</p>
                          <p className={`text-xs mt-1 ${msg.from === 'client' ? 'text-gray-500' : 'text-blue-100'}`}>
                            {formatDate(msg.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Relatórios</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Taxa de Resposta</h4>
              <p className="text-3xl font-bold text-green-600">100%</p>
              <p className="text-sm text-gray-500">Mensagens respondidas automaticamente</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Conversas Convertidas</h4>
              <p className="text-3xl font-bold text-blue-600">0</p>
              <p className="text-sm text-gray-500">Levaram a um link de pagamento</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Volume de Mensagens</h4>
              <p className="text-3xl font-bold text-yellow-600">2</p>
              <p className="text-sm text-gray-500">Mensagens nas últimas 24h</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HistoryPage;
