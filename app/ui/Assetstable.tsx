'use client';

import React, { useState } from 'react';
import { AddAsset , EditAsset, DeleteAsset} from '@/app/ui/invoices/buttons';
import { DownloadPDFButton } from '@/app/ui/clientSided/buttons';
import { useManualDebounce } from '@/app/lib/manualDebounce';
import type { Asset , ProductType , SupplierManufacturer , Assettype} from '@/app/lib/definitions'; 
import PACBioLogo from '@/app/ui/PacificBiomedicalLightLogo';

import AssetPrintView from '@/app/ui/assets/AssetPrintView';
import html2pdf from 'html2pdf.js';

interface AssetsTableProps {
  assets: Asset[];
  productTypes: ProductType[];
  supplierNmanufacturer: SupplierManufacturer[];
  Assettype: Assettype[];
  clientName?: string;
}

export default function AssetsTable({ assets , productTypes , supplierNmanufacturer, Assettype, clientName}: AssetsTableProps) {

  const name = clientName ?? 'Assets Table';
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [sortKey, setSortKey] = useState<keyof Asset | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

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

  const handleSort = (key: keyof Asset) => {
    if (sortKey === key) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  function generatePDF() {

    // Choose the element that our invoice is rendered in.
    const element = document.getElementById("pdf-content");
    if (!element) {
      console.error('Element with id "pdf-content" not found.');
      return;
    }

    // clone the element
    var clonedElement = element.cloneNode(true) as HTMLElement;

    // change display of cloned element 
    (clonedElement as HTMLElement).style.display = "block";

    // Choose the clonedElement and save the PDF for our user.
    html2pdf(clonedElement);

    // remove cloned element
    clonedElement.remove();
  }

  const filteredAssets = assets.filter((asset) => {
    const term = debouncedSearch.toLowerCase(); // Use debounced input!

    return (
      (asset.asset_number || '').toLowerCase().includes(term) ||
      (asset.manufacturer_number || '').toLowerCase().includes(term) ||
      (asset.asset_barnumber || '').toLowerCase().includes(term) ||
      (asset.note || '').toLowerCase().includes(term) ||
      (new Date(asset.purchase_date).toLocaleDateString('en-GB').toLowerCase()).includes(term) ||
      (asset.last_service_date
        ? new Date(asset.last_service_date).toLocaleDateString('en-GB').toLowerCase()
        : ''
      ).includes(term) ||
      (asset.service_due_date
        ? new Date(asset.service_due_date).toLocaleDateString('en-GB').toLowerCase()
        : ''
      ).includes(term) ||
      (asset.decommission_date
        ? new Date(asset.decommission_date).toLocaleDateString('en-GB').toLowerCase()
        : ''
      ).includes(term) ||
      (productTypeMap.get(asset.product_type_id)?.toLowerCase() || '').includes(term) ||
      (assetTypeMap.get(asset.asset_type_id || 0)?.toLowerCase() || '').includes(term) ||
      (supplierMap.get(asset.manufacturer_id || 0)?.toLowerCase() || '').includes(term) ||
      (supplierMap.get(asset.supplier_id || 0)?.toLowerCase() || '').includes(term)
    );
  });

  const sortedAssets = [...filteredAssets].sort((a, b) => {
    if (!sortKey) return 0;

    const aValue = a[sortKey];
    const bValue = b[sortKey];

    if (aValue == null) return 1;
    if (bValue == null) return -1;

    if (
      Object.prototype.toString.call(aValue) === '[object Date]' ||
      Object.prototype.toString.call(bValue) === '[object Date]'
    ) {
      const aDate = new Date(aValue as any).getTime();
      const bDate = new Date(bValue as any).getTime();
      return sortDirection === 'asc' ? aDate - bDate : bDate - aDate;
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }

    const aStr = aValue.toString().toLowerCase();
    const bStr = bValue.toString().toLowerCase();
    return sortDirection === 'asc'
      ? aStr.localeCompare(bStr)
      : bStr.localeCompare(aStr);
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
        <DownloadPDFButton clientName={name} />

        {/* Print Button */}
        <button
          onClick={generatePDF}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Print
        </button>
      </div>
      <div className="w-full overflow-x-auto hidden" id="pdf-content">
        <AssetPrintView
          assets={sortedAssets}
          clientName={name}
          productTypes={productTypes}
          supplierNmanufacturer={supplierNmanufacturer}
          Assettype={Assettype}
        />
      </div>        
      <div className="w-full overflow-x-auto">
        <div className="hidden print:block text-center mb-4">
          <PACBioLogo/>
          <h1 className="text-2xl font-bold">Pacific Med</h1>
          <h2 className="text-lg font-medium">{name} Asset Report</h2>
          <p className="text-sm text-gray-600">
            Generated on {new Date().toLocaleDateString('en-GB')}
          </p>
        </div>

        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            {/* Responsive (mobile) layout could be added here if needed */}
            <div className="md:hidden">
              {sortedAssets.map((asset , idx) => (
                <div
                  key={asset.id}
                  className="mb-2 w-full rounded-md bg-white p-4 shadow"
                >

                  <td className="whitespace-nowrap px-3 py-3">
                    {idx + 1}
                  </td>

                  <div className="mb-2">
                    <p className="text-sm text-gray-500" onClick={() => handleSort('asset_number')}>Asset Number {sortKey === 'asset_number' ? (sortDirection === 'asc' ? '▲' : '▼') : ''} </p>
                    <p className="font-medium">{asset.asset_number}</p>
                  </div>
                  {/* Displaying asset bar-code, product type, and other details 
                  <div className="mb-2">
                    <p className="text-sm text-gray-500">Asset Bar-code</p>
                    <p>{asset.asset_barnumber}</p>
                  </div>*/}
                  <div className="mb-2">
                    <p className="text-sm text-gray-500" onClick={() => handleSort('asset_type_id')}>Type {sortKey === 'asset_type_id' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</p>
                    <p>{asset.asset_type_id !== null ? (assetTypeMap.get(asset.asset_type_id) || '-') : '-'}</p>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm text-gray-500" onClick={() => handleSort('product_type_id')}>Model {sortKey === 'product_type_id' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</p>
                    <p>{productTypeMap.get(asset.product_type_id) || '-'}</p>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm text-gray-500" onClick={() => handleSort('manufacturer_number')}>Serial Number {sortKey === 'manufacturer_number' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</p>
                    <p>{asset.manufacturer_number}</p>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm text-gray-500" onClick={() => handleSort('manufacturer_id')}>Manufacturer {sortKey === 'manufacturer_id' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</p>
                    <p>{asset.manufacturer_id !== null ? (supplierMap.get(asset.manufacturer_id) || '-') : '-'}</p>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm text-gray-500" onClick={() => handleSort('supplier_id')}>Supplier {sortKey === 'supplier_id' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</p>
                    <p>{asset.supplier_id !== null ? (supplierMap.get(asset.supplier_id) || '-') : '-'}</p>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm text-gray-500" onClick={() => handleSort('purchase_date')}>Purchase Date {sortKey === 'purchase_date' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</p>
                    <p>{new Date(asset.purchase_date).toLocaleDateString('en-GB')}</p>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm text-gray-500" onClick={() => handleSort('last_service_date')}>Last Service Date {sortKey === 'last_service_date' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</p>
                    <p>{asset.last_service_date ? new Date(asset.last_service_date).toLocaleDateString('en-GB') : '-'}</p>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm text-gray-500" onClick={() => handleSort('service_due_date')}>Service Due Date {sortKey === 'service_due_date' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</p>
                    <p>{asset.service_due_date ? new Date(asset.service_due_date).toLocaleDateString('en-GB') : '-'}</p>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm text-gray-500" onClick={() => handleSort('decommission_date')}>Decommission Date {sortKey === 'decommission_date' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</p>
                    <p>{asset.decommission_date ? new Date(asset.decommission_date).toLocaleDateString('en-GB') : '-'}</p>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm text-gray-500 print:hidden">Note</p>
                    <p>{asset.note || '-'}</p>
                  </div>
                  <div className="flex justify-end gap-2 print:hidden">
                    <EditAsset id={asset.id.toString()} />
                    <DeleteAsset id={asset.id.toString()} />
                  </div>
                </div>
              ))}
            </div>
            <table className="hidden min-w-full text-gray-900 md:table">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th className="px-3 py-5 font-medium">#</th>
                  <th className="px-4 py-5 font-medium sm:pl-6" onClick={() => handleSort('asset_number')}>Asset Number {sortKey === 'asset_number' ? (sortDirection === 'asc' ? '▲' : '▼') : ''} </th>
                  {/* <th className="px-3 py-5 font-medium">Asset Bar-code</th>*/}
                  <th className="px-3 py-5 font-medium" onClick={() => handleSort('asset_type_id')}>Type {sortKey === 'asset_type_id' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</th>
                  <th className="px-3 py-5 font-medium" onClick={() => handleSort('product_type_id')}>Model {sortKey === 'product_type_id' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</th>
                  <th className="px-3 py-5 font-medium" onClick={() => handleSort('manufacturer_number')}>Serial Number {sortKey === 'manufacturer_number' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</th>
                  <th className="px-3 py-5 font-medium" onClick={() => handleSort('manufacturer_id')}>Manufacturer {sortKey === 'manufacturer_id' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</th>
                  <th className="px-3 py-5 font-medium" onClick={() => handleSort('supplier_id')}>Supplier {sortKey === 'supplier_id' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</th>
                  <th className="px-3 py-5 font-medium" onClick={() => handleSort('purchase_date')}>Purchase Date {sortKey === 'purchase_date' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</th>
                  <th className="px-3 py-5 font-medium" onClick={() => handleSort('last_service_date')}>Last Service Date {sortKey === 'last_service_date' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</th>
                  <th className="px-3 py-5 font-medium" onClick={() => handleSort('service_due_date')}>Service Due Date {sortKey === 'service_due_date' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</th>
                  <th className="px-3 py-5 font-medium" onClick={() => handleSort('decommission_date')}>Decommission Date {sortKey === 'decommission_date' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</th>
                  <th className="px-3 py-5 font-medium">Note</th>
                  <th className="py-3 pl-6 pr-3 text-right">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white text-sm">
                {filteredAssets.length > 0 ? (
                  sortedAssets.map((asset, idx) => (
                    <tr
                      key={asset.id}
                      className="w-full border-b py-3 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                    >
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        {asset.asset_number}
                      </td>
                      {/*<td className="whitespace-nowrap px-3 py-3">
                        {asset.asset_barnumber}
                      </td>*/}
                      <td className="whitespace-nowrap px-3 py-3">
                        {asset.asset_type_id !== null ? (assetTypeMap.get(asset.asset_type_id) || '-') : '-'}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {productTypeMap.get(asset.product_type_id) || 'Unknown'}
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
                        {new Date(asset.purchase_date).toLocaleDateString('en-GB')}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {asset.last_service_date
                          ? new Date(asset.last_service_date).toLocaleDateString('en-GB')
                          : '-'}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {asset.service_due_date
                          ? new Date(asset.service_due_date).toLocaleDateString('en-GB')
                          : '-'}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {asset.decommission_date
                          ? new Date(asset.decommission_date).toLocaleDateString('en-GB')
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
