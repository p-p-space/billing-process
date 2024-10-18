'use client';

import { useState } from 'react';
//Internal app
import { RootLayout } from '@/interfaces';
import { Nabvar, Sidebar } from '@/components';

export default function Template({ children }: RootLayout) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      <Sidebar open={isSidebarOpen} />
      <div className="lg:container-main flex flex-col w-screen bg-custom-container">
        <Nabvar toggleSidebar={toggleSidebar} />
        <h1 className="text-2xl font-bold">Dashboard</h1>
        {children}
      </div>
    </div>
  );
}
