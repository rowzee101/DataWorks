'use client';

import Link from 'next/link';
import { EditSupplier, DeleteSupplier } from '@/app/ui/invoices/buttons'; // Adjust the path if needed

type Props = {
  supplierId: number;
  supplierName: string;
  productCount: number;
  assetCount: number;
};

export function SupplierCell({ supplierId, supplierName, productCount, assetCount }: Props) {
  return (
    <div className="relative">
      <Link
        href={`/dashboard/suppliers/${supplierId}`}
        className="block border rounded-xl p-4 hover:bg-gray-50 transition bg-[#FFFFFF]"
      >
        <div className="text-lg font-semibold">{supplierName}</div>
        <div className="text-sm text-gray-600">
          {productCount} {productCount === 1 ? 'product type' : 'product types'}
        </div>
        <div className="text-sm text-gray-600">
          {assetCount} {assetCount === 1 ? 'asset' : 'assets'} supplied
        </div>
      </Link>

      <div className="absolute top-2 right-2 z-10 flex flex-row gap-2">
        <EditSupplier id={String(supplierId)} />
        <DeleteSupplier id={String(supplierId)} />
      </div>
    </div>
  );
}
