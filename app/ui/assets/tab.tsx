'use client';

import { useState } from 'react';
import type { Asset , ProductType , SupplierManufacturer , Assettype} from '@/app/lib/definitions'; 
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
  Assettype: Assettype[];

  // suppliersManufacturers?: { id: number; name: string }[]; // Uncomment if needed

};


export function Tabs({ assets, productTypes , Myassets  , SupplierManufacturer , Assettype}: TabsProps) {

  const [activeTab, setActiveTab] = useState<'Client Assets' | 'My Assets' | 'Product & Types' >('Client Assets');
  return (
    <div className="mt-6">
      {/* Tab Buttons */}
      <div className="flex space-x-4 border-b">
        {['Client Assets', 'My Assets','Product & Types'].map((tab) => (
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
          {activeTab === 'Client Assets' && <AssetsTable assets={assets} productTypes={productTypes} supplierNmanufacturer={SupplierManufacturer} Assettype={Assettype} />}
          {activeTab === 'My Assets' && <AssetsTable assets={Myassets} productTypes={productTypes} supplierNmanufacturer={SupplierManufacturer} Assettype={Assettype} />}
          {activeTab === 'Product & Types' && <ProductTypesTable productTypes={productTypes} suppliersManufacturers={SupplierManufacturer} Assettype={Assettype} />}
      </div>
    </div>
  );
}