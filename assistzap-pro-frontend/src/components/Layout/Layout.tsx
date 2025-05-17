import { ReactNode } from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
  title: string;
}

const Layout = ({ children, title }: LayoutProps) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow p-4">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        </header>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
