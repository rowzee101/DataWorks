'use client';

import React, { useState } from 'react';
import { AddAsset , EditAsset, DeleteAsset} from '@/app/ui/invoices/buttons';
import { DownloadPDFButton } from '@/app/ui/clientSided/buttons';
import { useManualDebounce } from '@/app/lib/manualDebounce';
import type { Asset , ProductType , SupplierManufacturer , Assettype} from '@/app/lib/definitions'; 


interface AssetsTableProps {
  assets: Asset[];
  productTypes: ProductType[];
  supplierNmanufacturer: SupplierManufacturer[];
  Assettype: Assettype[];
}

export default function AssetsTable({ assets , productTypes , supplierNmanufacturer, Assettype}: AssetsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const productTypeMap = new Map(productTypes.map(pt => [pt.id, pt.name]));
  const supplierMap = new Map(supplierNmanufacturer.map(s => [s.id, s.name]));
  const assetTypeMap = new Map(Assettype.map(at => [at.id, at.name]));

  // Debounce the search input by 300ms
  const handleSearch = useManualDebounce((value: string) => {
    setDebouncedSearch(value);
  }, 300);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  const filteredAssets = assets.filter((asset) => {
    const term = searchTerm.toLowerCase();
    return (
      (asset.asset_number || '').toLowerCase().includes(term) ||
      (asset.manufacturer_number || '').toLowerCase().includes(term) ||
      (asset.asset_barnumber || '').toLowerCase().includes(term) ||
      (asset.note || '').toLowerCase().includes(term) ||
      (asset.purchase_date
        ? new Date(asset.purchase_date).toISOString().toLowerCase()
        : ''
      ).includes(term) ||
      (asset.last_service_date
        ? new Date(asset.last_service_date).toISOString().toLowerCase()
        : ''
      ).includes(term) ||
      (asset.product_type_id || '').toString().toLowerCase().includes(term) ||
      (asset.asset_type_id || '').toString().toLowerCase().includes(term) ||
      (asset.manufacturer_id || '').toString().toLowerCase().includes(term) ||
      (asset.supplier_id || '').toString().toLowerCase().includes(term)

    );
  });


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

        {/* Download Button */}
        <DownloadPDFButton clientName={'Assets Table'} />
      </div>
      <div className="w-full overflow-x-auto" id="pdf-content">
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
                    <p className="text-sm text-gray-500">Asset Bar-code</p>
                    <p>{asset.asset_barnumber}</p>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm text-gray-500">Asset/Model</p>
                    <p>{productTypeMap.get(asset.product_type_id) || '-'}</p>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm text-gray-500">Type</p>
                    <p>{asset.asset_type_id !== null ? (assetTypeMap.get(asset.asset_type_id) || '-') : '-'}</p>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm text-gray-500">Manufacturer Serial Number</p>
                    <p>{asset.manufacturer_number}</p>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm text-gray-500">Manufacturer</p>
                    <p>{asset.manufacturer_id !== null ? (supplierMap.get(asset.manufacturer_id) || '-') : '-'}</p>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm text-gray-500">Supplier</p>
                    <p>{asset.supplier_id !== null ? (supplierMap.get(asset.supplier_id) || '-') : '-'}</p>
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
                    <p className="text-sm text-gray-500">Service Due Date</p>
                    <p>{asset.service_due_date ? new Date(asset.service_due_date).toLocaleDateString() : '-'}</p>
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
                  <th className="px-3 py-5 font-medium">Asset Bar-code</th>
                  <th className="px-3 py-5 font-medium">Asset/Model</th>
                  <th className="px-3 py-5 font-medium">Type</th>
                  <th className="px-3 py-5 font-medium">Manufacturer Serial Number</th>
                  <th className="px-3 py-5 font-medium">Manufacturer</th>
                  <th className="px-3 py-5 font-medium">Supplier</th>
                  <th className="px-3 py-5 font-medium">Purchase Date</th>
                  <th className="px-3 py-5 font-medium">Last Service Date</th>
                  <th className="px-3 py-5 font-medium">Service Due Date</th>
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
                        {asset.asset_barnumber}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {productTypeMap.get(asset.product_type_id) || 'Unknown'}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {asset.asset_type_id !== null ? (assetTypeMap.get(asset.asset_type_id) || '-') : '-'}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {asset.manufacturer_number}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {asset.manufacturer_id !== null ? (supplierMap.get(asset.manufacturer_id) || '-') : '-'}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {asset.supplier_id !== null ? (supplierMap.get(asset.supplier_id) || '-') : '-'}
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
                        {asset.service_due_date
                          ? new Date(asset.service_due_date).toLocaleDateString()
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
    </div>
  );
}
