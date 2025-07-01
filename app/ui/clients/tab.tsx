'use client';

import { useState } from 'react';

type TabsProps = {
  clientId: number;
};

export function Tabs({ clientId }: TabsProps) {
  const [activeTab, setActiveTab] = useState<'assets' | 'tickets' | 'users'>('assets');

  return (
    <div className="mt-6">
      {/* Tab Buttons */}
      <div className="flex space-x-4 border-b">
        {['assets', 'tickets', 'users'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as typeof activeTab)}
            className={`pb-2 font-semibold ${
              activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === 'assets' && <div>Show Assets for client {clientId} here.</div>}
        {activeTab === 'tickets' && <div>Show Tickets for client {clientId} here.</div>}
        {activeTab === 'users' && <div>Show Users for client {clientId} here.</div>}
      </div>
    </div>
  );
}
