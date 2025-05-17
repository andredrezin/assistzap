import { Link, useLocation } from 'react-router-dom';
import { Home, MessageCircle, GitBranch, History, Settings, LogOut } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/dashboard', label: 'Painel', icon: <Home className="mr-2" /> },
    { path: '/whatsapp', label: 'Conexão WhatsApp', icon: <MessageCircle className="mr-2" /> },
    { path: '/flows', label: 'Fluxos de Atendimento', icon: <GitBranch className="mr-2" /> },
    { path: '/history', label: 'Histórico de Conversas', icon: <History className="mr-2" /> },
    { path: '/settings', label: 'Configurações', icon: <Settings className="mr-2" /> },
    { path: '/', label: 'Sair', icon: <LogOut className="mr-2" /> },
  ];

  return (
    <div className="w-64 bg-blue-900 text-white h-screen p-4 flex flex-col">
      <h1 className="text-xl font-bold mb-6">AssistZap Pro</h1>
      <nav className="flex-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center p-2 rounded mb-2 hover:bg-blue-700 ${
              location.pathname === item.path ? 'bg-blue-700' : ''
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
