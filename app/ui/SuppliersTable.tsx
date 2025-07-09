'use client';

import React, { useState } from 'react';
import { useManualDebounce } from '@/app/lib/manualDebounce';
import { DownloadPDFButton } from '@/app/ui/clientSided/buttons';
import { AddSupplier, EditSupplier, DeleteSupplier } from '@/app/ui/invoices/buttons';

type Supplier = {
  id: number;
  name: string;
};

interface SuppliersTableProps {
  suppliers: Supplier[];
}

export default function SuppliersTable({ suppliers }: SuppliersTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const handleSearch = useManualDebounce((value: string) => {
    setDebouncedSearch(value);
  }, 300);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  const filteredSuppliers = suppliers.filter((s) =>
    s.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div className="mt-6 flow-root">
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Search suppliers..."
          value={searchTerm}
          onChange={onSearchChange}
          className="p-2 border rounded flex-1 w-full"
        />
        <AddSupplier />
        <DownloadPDFButton clientName={'Suppliers Table'} />
      </div>

      <div className="w-full overflow-x-auto" id="pdf-content">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">

            {/* Mobile layout */}
            <div className="md:hidden">
              {filteredSuppliers.map((supplier) => (
                <div key={supplier.id} className="mb-2 w-full rounded-md bg-white p-4 shadow">
                  <div className="mb-2">
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{supplier.name}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <EditSupplier id={supplier.id.toString()} />
                    <DeleteSupplier id={supplier.id.toString()} />
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop table */}
            <table className="hidden min-w-full text-gray-900 md:table">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th className="px-4 py-5 font-medium">Name</th>
                  <th className="py-3 pl-6 pr-3 text-right">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white text-sm">
                {filteredSuppliers.length > 0 ? (
                  filteredSuppliers.map((supplier) => (
                    <tr
                      key={supplier.id}
                      className="border-b last:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                    >
                      <td className="whitespace-nowrap px-4 py-3">{supplier.name}</td>
                      <td className="whitespace-nowrap py-3 pl-6 pr-3 text-right">
                        <div className="flex justify-end gap-2">
                          <EditSupplier id={supplier.id.toString()} />
                          <DeleteSupplier id={supplier.id.toString()} />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="text-center p-4 text-sm text-gray-500">
                      No suppliers found.
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
