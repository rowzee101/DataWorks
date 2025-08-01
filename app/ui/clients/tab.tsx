'use client';

import { useState } from 'react';
import AssetsTable from '@/app/ui/Assetstable'; 
import type { Asset , ProductType} from '@/app/lib/definitions'; 


// import Table from '@/app/ui/invoices/table';

type TabsProps = {
  clientId: number;
  assets: Asset[];
  searchQuery?: string;
  productTypes: ProductType[];


  // tickets and users to be implemented later
};

export function Tabs({ assets, clientId, productTypes }: TabsProps) {

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
              activeTab === tab ? 'border-b-2 border-[#205B34] text-[#205B34]' : 'text-gray-600'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === 'assets' && < AssetsTable assets={assets} productTypes = {productTypes} />}
        {activeTab === 'tickets' && <div>Show tickets for client {clientId} here.</div>}
        {activeTab === 'users' && <div>Show Users for client {clientId} here.</div>}
      </div>
    </div>
  );
}
{/* <Table query={searchQuery_} currentPage={currentPage} /> */}