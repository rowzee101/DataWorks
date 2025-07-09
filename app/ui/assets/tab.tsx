'use client';

import { useState } from 'react';
// import AssetsTable from '@/app/ui/Assetstable'; 
import type { Asset } from '@/app/lib/definitions'; 
import type { ProductType , SupplierManufacturer } from '@/app/lib/definitions'; 
import { Suspense } from 'react';

import dynamic from 'next/dynamic';

const AssetsTable = dynamic(() => import('@/app/ui/Assetstable'), {
  ssr: false,
  loading: () => <div>Loading assets...</div>,
});

const ProductTypesTable = dynamic(() => import('@/app/ui/ProductTypestable'), {
  ssr: false,
  loading: () => <div>Loading products...</div>,
});


// import Table from '@/app/ui/invoices/table';

type TabsProps = {
  assets: Asset[];
  Myassets: Asset[];
  searchQuery?: string;
  productTypes: ProductType[];
  SupplierManufacturer: SupplierManufacturer[];

  // suppliersManufacturers?: { id: number; name: string }[]; // Uncomment if needed

};


export function Tabs({ assets, productTypes , Myassets  , SupplierManufacturer}: TabsProps) {

  const [activeTab, setActiveTab] = useState<'Client Assets' | 'My Assets' | 'Product Types' >('Client Assets');
  return (
    <div className="mt-6">
      {/* Tab Buttons */}
      <div className="flex space-x-4 border-b">
        {['Client Assets', 'My Assets','Product Types' , 'Suppliers & Manufacturers'].map((tab) => (
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
          {activeTab === 'Client Assets' && <AssetsTable assets={assets} productTypes={productTypes} />}
          {activeTab === 'My Assets' && <AssetsTable assets={Myassets} productTypes={productTypes} />}
          {activeTab === 'Product Types' && <ProductTypesTable productTypes={productTypes} suppliersManufacturers={SupplierManufacturer} />}
      </div>
    </div>
  );
}