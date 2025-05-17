import { useState } from 'react';
import Layout from '../components/Layout/Layout';
import { BarChart, CheckCircle, MessageCircle, Zap } from 'lucide-react';

const DashboardPage = () => {
  return (
    <Layout title="Painel">
      <div className="space-y-6">
        {/* Status do Sistema */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Status do Sistema</h3>
          <div className="flex items-center text-green-600 mb-2">
            <CheckCircle className="mr-2" size={20} />
            <p>Seu sistema de atendimento automatizado via WhatsApp está conectado e funcionando normalmente.</p>
          </div>
          
          <h4 className="font-medium mt-4 mb-2">Próximos Passos:</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Personalize suas mensagens automáticas na página de Fluxos de Atendimento</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Configure a integração com IA na página de Configurações</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Monitore as conversas na página de Histórico</span>
            </li>
          </ul>
        </div>
        
        {/* Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-green-100 text-green-500 mr-4">
                <MessageCircle size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Total de Conversas</h3>
                <p className="text-gray-500 text-sm">Últimas 24 horas</p>
              </div>
            </div>
            <p className="text-3xl font-bold">1</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-blue-100 text-blue-500 mr-4">
                <Zap size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Fluxos Ativos</h3>
                <p className="text-gray-500 text-sm">Configurados</p>
              </div>
            </div>
            <p className="text-3xl font-bold">1</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-500 mr-4">
                <BarChart size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Mensagens Recebidas</h3>
                <p className="text-gray-500 text-sm">Últimas 24 horas</p>
              </div>
            </div>
            <p className="text-3xl font-bold">2</p>
          </div>
        </div>
        
        {/* Status do WhatsApp */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Status do WhatsApp</h3>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <p className="font-medium">Conectado</p>
          </div>
          <p className="text-gray-600 mt-2 text-sm">Última atualização: há 5 minutos</p>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
