'use client';

import React, { useState } from 'react';
import Link from 'next/link'; 
import { useDebouncedCallback } from 'use-debounce';
import { AddAsset , EditAsset, DeleteAsset} from '@/app/ui/invoices/buttons';

type Asset = {
  id: number;
  asset_barnumber: string;
  asset_number: string;
  manufacturer_number: string;
  purchase_date: string;
  last_service_date: string | null;
  note: string | null;
  // add other fields as needed
};

interface AssetsTableProps {
  assets: Asset[];
}

export default function AssetsTable({ assets }: AssetsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');


  // Debounce the search input by 300ms
  const handleSearch = useDebouncedCallback((value: string) => {
    setDebouncedSearch(value);
  }, 300);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    handleSearch(e.target.value);
  };


  const filteredAssets = assets.filter((asset) => {
    const term = searchTerm.toLowerCase();
    return (
      (asset.asset_number || '').toLowerCase().includes(term) ||
      (asset.manufacturer_number || '').toLowerCase().includes(term) ||
      (asset.asset_barnumber || '').toLowerCase().includes(term) ||
      (asset.note || '').toLowerCase().includes(term)
    );
  });

  // return (
  //   <div>
  //     <input
  //       type="text"
  //       placeholder="Search assets..."
  //       value={searchTerm}
  //       onChange={onSearchChange}
  //       className="mb-4 p-2 border rounded w-full max-w-sm"
  //     />

  //     <table className="min-w-full border-collapse border border-gray-300">
  //       <thead>
  //         <tr>
  //           <th className="border border-gray-300 px-4 py-2">Asset Number</th>
  //           <th className="border border-gray-300 px-4 py-2">Manufacturer Number</th>
  //           <th className="border border-gray-300 px-4 py-2">Asset Barnumber</th>
  //           <th className="border border-gray-300 px-4 py-2">Purchase Date</th>
  //           <th className="border border-gray-300 px-4 py-2">Last Service Date</th>
  //           <th className="border border-gray-300 px-4 py-2">Note</th>
  //           <th className="border border-gray-300 px-4 py-2">Actions</th> {/* New  Edit column */}
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {filteredAssets.length > 0 ? (
  //           filteredAssets.map((asset) => (
  //             <tr key={asset.id}>
  //               <td className="border border-gray-300 px-4 py-2">{asset.asset_number}</td>
  //               <td className="border border-gray-300 px-4 py-2">{asset.manufacturer_number}</td>
  //               <td className="border border-gray-300 px-4 py-2">{asset.asset_barnumber}</td>
  //               <td className="border border-gray-300 px-4 py-2">{new Date(asset.purchase_date).toLocaleDateString()}</td>
  //               <td className="border border-gray-300 px-4 py-2">{asset.last_service_date ? new Date(asset.last_service_date).toLocaleDateString() : '-'}</td>
  //               <td className="border border-gray-300 px-4 py-2">{asset.note || '-'}</td>
  //               <td className="border border-gray-300 px-4 py-2 text-center"> 
  //                 <Link href={`/assets/${asset.id}/edit`} className="text-blue-600 hover:underline">
  //                   Edit
  //                 </Link>
  //               </td>
  //             </tr>
  //           ))
  //         ) : (
  //           <tr>
  //             <td colSpan={7} className="text-center p-4">
  //               No assets found.
  //             </td>
  //           </tr>
  //         )}
  //       </tbody>
  //     </table>
  //   </div>
  // );


  return (
    <div className="mt-6 flow-root">
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Search assets..."
          value={searchTerm}
          onChange={onSearchChange}
          className="p-2 border rounded flex-1 w-full"
        />
        <AddAsset />
      </div>

      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Responsive (mobile) layout could be added here if needed */}
          <div className="md:hidden">
            {filteredAssets.map((asset) => (
              <div
                key={asset.id}
                className="mb-2 w-full rounded-md bg-white p-4 shadow"
              >
                <div className="mb-2">
                  <p className="text-sm text-gray-500">Asset Number</p>
                  <p className="font-medium">{asset.asset_number}</p>
                </div>
                <div className="mb-2">
                  <p className="text-sm text-gray-500">Manufacturer Number</p>
                  <p>{asset.manufacturer_number}</p>
                </div>
                <div className="mb-2">
                  <p className="text-sm text-gray-500">Asset Bar-code</p>
                  <p>{asset.asset_barnumber}</p>
                </div>
                <div className="mb-2">
                  <p className="text-sm text-gray-500">Purchase Date</p>
                  <p>{new Date(asset.purchase_date).toLocaleDateString()}</p>
                </div>
                <div className="mb-2">
                  <p className="text-sm text-gray-500">Last Service Date</p>
                  <p>{asset.last_service_date ? new Date(asset.last_service_date).toLocaleDateString() : '-'}</p>
                </div>
                <div className="mb-2">
                  <p className="text-sm text-gray-500">Note</p>
                  <p>{asset.note || '-'}</p>
                </div>
                <div className="flex justify-end gap-2">
                  <EditAsset id={asset.id.toString()} />
                  <DeleteAsset id={asset.id.toString()} />
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th className="px-4 py-5 font-medium sm:pl-6">Asset Number</th>
                <th className="px-3 py-5 font-medium">Manufacturer Number</th>
                <th className="px-3 py-5 font-medium">Asset Bar-code</th>
                <th className="px-3 py-5 font-medium">Purchase Date</th>
                <th className="px-3 py-5 font-medium">Last Service Date</th>
                <th className="px-3 py-5 font-medium">Note</th>
                <th className="py-3 pl-6 pr-3 text-right">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white text-sm">
              {filteredAssets.length > 0 ? (
                filteredAssets.map((asset, idx) => (
                  <tr
                    key={asset.id}
                    className="w-full border-b py-3 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      {asset.asset_number}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {asset.manufacturer_number}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {asset.asset_barnumber}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {new Date(asset.purchase_date).toLocaleDateString()}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {asset.last_service_date
                        ? new Date(asset.last_service_date).toLocaleDateString()
                        : '-'}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {asset.note || '-'}
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-2">
                        <EditAsset id={asset.id.toString()} />
                        <DeleteAsset id={asset.id.toString()} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center p-4 text-sm text-gray-500"
                  >
                    No assets found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
