'use client';

import React, { useState } from 'react';
import { useManualDebounce } from '@/app/lib/manualDebounce';
import { DownloadPDFButton } from '@/app/ui/clientSided/buttons';
import { AddProductType, EditProductType, DeleteProductType } from '@/app/ui/invoices/buttons';
import { Assettype, ProductType } from '@/app/lib/definitions';

type SupplierManufacturer = {
  id: number;
  name: string;
};

interface ProductTypesTableProps {
  productTypes: ProductType[];
  suppliersManufacturers: SupplierManufacturer[];
  Assettype: Assettype[];
}

export default function ProductTypesTable({ productTypes, suppliersManufacturers, Assettype, }: ProductTypesTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const assetTypeMap = new Map(Assettype.map(at => [at.id, at.name]));
  const supplierMap = new Map(suppliersManufacturers.map((s) => [s.id, s.name]));

  const getNameById = (id: number | null) => {
    if (id === null) return '-';
    return supplierMap.get(id) || 'Unknown';
  };

  const handleSearch = useManualDebounce((value: string) => {
    setDebouncedSearch(value);
  }, 300);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  const filteredTypes = productTypes.filter((pt) => {
    const term = debouncedSearch.toLowerCase();
    return (
      pt.name.toLowerCase().includes(term) ||
      getNameById(pt.supplier1_id).toLowerCase().includes(term) ||
      getNameById(pt.supplier2_id).toLowerCase().includes(term) ||
      getNameById(pt.manufacturer_id).toLowerCase().includes(term) ||
      (pt.price?.toString() || '').includes(term)
    );
  });


  return (
    <div className="mt-6 flow-root">
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Search product types..."
          value={searchTerm}
          onChange={onSearchChange}
          className="p-2 border rounded flex-1 w-full"
        />
        <AddProductType />
        <DownloadPDFButton clientName={'Product Types Table'} />
      </div>

      <div className="w-full overflow-x-auto" id="pdf-content">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">

            {/* Mobile layout */}
            <div className="md:hidden">
              {filteredTypes.map((pt) => (
                <div key={pt.id} className="mb-2 w-full rounded-md bg-white p-4 shadow">
                  <div className="mb-2">
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{pt.name}</p>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm text-gray-500">Type</p>
                    <p>{pt.asset_type_id !== null ? (assetTypeMap.get(pt.asset_type_id) || '-') : '-'}</p>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm text-gray-500">Supplier 1</p>
                    <p>{getNameById(pt.supplier1_id)}</p>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm text-gray-500">Supplier 2</p>
                    <p>{getNameById(pt.supplier2_id)}</p>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm text-gray-500">Manufacturer</p>
                    <p>{getNameById(pt.manufacturer_id)}</p>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm text-gray-500">Price</p>
                    <p>{pt.price ?? '-'}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <EditProductType id={pt.id.toString()} />
                    <DeleteProductType id={pt.id.toString()} />
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop table */}
            <table className="hidden min-w-full text-gray-900 md:table">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th className="px-4 py-5 font-medium">Name</th>
                  <th className="px-3 py-5 font-medium">Type</th>
                  <th className="px-3 py-5 font-medium">Supplier 1</th>
                  <th className="px-3 py-5 font-medium">Supplier 2</th>
                  <th className="px-3 py-5 font-medium">Manufacturer</th>
                  <th className="px-3 py-5 font-medium">Price</th>
                  <th className="py-3 pl-6 pr-3 text-right">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white text-sm">
                {filteredTypes.length > 0 ? (
                  filteredTypes.map((pt) => (
                    <tr
                      key={pt.id}
                      className="border-b last:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                    >
                      <td className="whitespace-nowrap px-4 py-3">{pt.name}</td>
                      <td className="whitespace-nowrap px-3 py-3">{pt.asset_type_id !== null ? (assetTypeMap.get(pt.asset_type_id) || '-') : '-'}</td>
                      <td className="whitespace-nowrap px-3 py-3">{getNameById(pt.supplier1_id)}</td>
                      <td className="whitespace-nowrap px-3 py-3">{getNameById(pt.supplier2_id)}</td>
                      <td className="whitespace-nowrap px-3 py-3">{getNameById(pt.manufacturer_id)}</td>
                      <td className="whitespace-nowrap px-3 py-3">{pt.price ?? '-'}</td>
                      <td className="whitespace-nowrap py-3 pl-6 pr-3 text-right">
                        <div className="flex justify-end gap-2">
                          <EditProductType id={pt.id.toString()} />
                          <DeleteProductType id={pt.id.toString()} />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center p-4 text-sm text-gray-500">
                      No product types found.
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
