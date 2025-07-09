'use client';

import { Metadata } from 'next';
import Link from 'next/link';
import PlusIcon from '@heroicons/react/24/outline/PlusIcon';

export const metadata: Metadata = {
  title: 'Suppliers & Manufacturers',
};

import { fetchSupplierManufacturerWithCounts } from '@/app/lib/data';
import { SupplierCell } from '@/app/ui/suppliers&manufacturers/supplierCell';

export default async function DashboardPage() {
  const suppliers = await fetchSupplierManufacturerWithCounts();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {suppliers.map(supplier => (
        <SupplierCell
          key={supplier.id}
          supplierId={supplier.id}
          supplierName={supplier.name}
          productCount={supplier.product_count}
          assetCount={supplier.asset_count}
        />
      ))}

      <Link
        href="/dashboard/suppliers/add"
        className="block border rounded-xl p-4 hover:bg-gray-50 transition"
      >
        <div className="flex flex-col items-center justify-center text-gray-600">
          <PlusIcon className="h-8 w-8 mb-2" />
          <span className="text-lg font-semibold">Add New Supplier</span>
        </div>
      </Link>
    </div>
  );
}
