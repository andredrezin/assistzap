import Layout from '../components/Layout/Layout';
import { QrCode, Smartphone, RefreshCw } from 'lucide-react';
import { useState } from 'react';

const WhatsAppPage = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = () => {
    setIsLoading(true);
    // Simulação de conexão - será substituída pela integração real com o backend
    setTimeout(() => {
      setIsConnected(true);
      setIsLoading(false);
    }, 2000);
  };

  const handleDisconnect = () => {
    setIsLoading(true);
    // Simulação de desconexão - será substituída pela integração real com o backend
    setTimeout(() => {
      setIsConnected(false);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Layout title="Conexão WhatsApp">
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Status da Conexão</h3>
          
          <div className="flex items-center mb-6">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
            <p className="font-medium">{isConnected ? 'Conectado' : 'Desconectado'}</p>
          </div>
          
          {isConnected ? (
            <div className="space-y-4">
              <div className="flex items-center text-green-600">
                <Smartphone className="mr-2" size={20} />
                <p>WhatsApp conectado e pronto para receber mensagens</p>
              </div>
              
              <button 
                onClick={handleDisconnect}
                disabled={isLoading}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 flex items-center"
              >
                {isLoading && <RefreshCw className="mr-2 animate-spin" size={16} />}
                Desconectar
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center">
                <QrCode size={200} className="mb-4" />
                <p className="text-gray-600 text-center">Escaneie o QR Code com seu WhatsApp para conectar</p>
                <p className="text-gray-500 text-sm text-center mt-2">Abra o WhatsApp no seu celular, toque em Menu ou Configurações e selecione WhatsApp Web</p>
              </div>
              
              <div className="flex justify-center">
                <button 
                  onClick={handleConnect}
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800 disabled:opacity-50 flex items-center"
                >
                  {isLoading && <RefreshCw className="mr-2 animate-spin" size={16} />}
                  {isLoading ? 'Conectando...' : 'Conectar WhatsApp'}
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Instruções</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Abra o WhatsApp no seu celular</li>
            <li>Toque em Menu ou Configurações e selecione WhatsApp Web</li>
            <li>Aponte a câmera do seu celular para o QR Code acima</li>
            <li>Mantenha seu celular conectado à internet durante o uso</li>
          </ol>
          
          <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800">
            <p className="font-medium">Importante:</p>
            <p>Seu celular precisa estar conectado à internet para que o AssistZap Pro funcione corretamente.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WhatsAppPage;
