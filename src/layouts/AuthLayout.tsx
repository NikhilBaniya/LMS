import React from 'react';
import { Outlet } from 'react-router-dom';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f3f5f8] flex items-center justify-center p-4 sm:p-6 md:p-10">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl overflow-hidden min-h-[560px] grid grid-cols-1 md:grid-cols-2">
        <Outlet />
      </div>
    </div>
  );
};
