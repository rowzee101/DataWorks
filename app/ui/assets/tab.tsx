'use client';

import { useState } from 'react';
// import AssetsTable from '@/app/ui/Assetstable'; 
import type { Asset } from '@/app/lib/definitions'; 
import { Suspense } from 'react';

import dynamic from 'next/dynamic';

const AssetsTable = dynamic(() => import('@/app/ui/Assetstable'), {
  ssr: false,
  loading: () => <div>Loading assets...</div>,
});


// import Table from '@/app/ui/invoices/table';

type TabsProps = {
  assets: Asset[];
  Myassets: Asset[];
  searchQuery?: string;
  productTypes: { id: number; name: string }[];

  // tickets and users to be implemented later
};


export function Tabs({ assets, productTypes , Myassets }: TabsProps) {

  const [activeTab, setActiveTab] = useState<'Client Assets' | 'My Assets' | 'Product Types'>('Client Assets');
  return (
    <div className="mt-6">
      {/* Tab Buttons */}
      <div className="flex space-x-4 border-b">
        {['Client Assets', 'My Assets','Product Types'].map((tab) => (
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
          {activeTab === 'Client Assets' && <AssetsTable assets={assets} productTypes={productTypes} />}
          {activeTab === 'My Assets' && <AssetsTable assets={Myassets} productTypes={productTypes} />}
          {activeTab === 'Product Types' && <div className="text-gray-600">Product Types content goes here.</div>}
      </div>
    </div>
  );
}