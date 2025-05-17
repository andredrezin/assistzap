import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import WhatsAppPage from './pages/WhatsAppPage';
import FlowsPage from './pages/FlowsPage';
import HistoryPage from './pages/HistoryPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  // Simulação simples de autenticação - em produção, usar um contexto de autenticação adequado
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <DashboardPage /> : <Navigate to="/" />} 
        />
        <Route 
          path="/whatsapp" 
          element={isAuthenticated ? <WhatsAppPage /> : <Navigate to="/" />} 
        />
        <Route 
          path="/flows" 
          element={isAuthenticated ? <FlowsPage /> : <Navigate to="/" />} 
        />
        <Route 
          path="/history" 
          element={isAuthenticated ? <HistoryPage /> : <Navigate to="/" />} 
        />
        <Route 
          path="/settings" 
          element={isAuthenticated ? <SettingsPage /> : <Navigate to="/" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
