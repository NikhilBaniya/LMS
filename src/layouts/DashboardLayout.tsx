import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AddAdminModal } from '../components/common/AddAdminModal';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';
import { useAuth } from '../context/AuthContext';

export const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [addAdminOpen, setAddAdminOpen] = useState(false);
  const { logout, register } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const handleAdminAdded = (adminData: { email: string; name: string; role: string }) => {
    register({
      username: adminData.email.split('@')[0],
      password: 'password123',
      name: adminData.name,
      role: adminData.role,
      email: adminData.email,
    });
  };

  return (
    <div className="min-h-screen bg-[#f3f5f8] flex">
      {/* Sidebar - Exact HCC styling */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          onOpenAddAdmin={() => setAddAdminOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Add Admin Modal (Screenshot 1) */}
      <AddAdminModal
        isOpen={addAdminOpen}
        onClose={() => setAddAdminOpen(false)}
        onSuccess={handleAdminAdded}
      />
    </div>
  );
};

