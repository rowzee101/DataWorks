'use client';

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchProductTypesBySupplierId, fetchSupplierByID, fetchSupplierManufacturer } from '@/app/lib/data';
import ProductTypesTable from '@/app/ui/ProductTypestable';


type PageProps = {
  params: { id: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const supplier = await fetchSupplierByID(Number(params.id));
  if (!supplier) return { title: 'Supplier Not Found' };

  return {
    title: supplier.name,
  };
}

export default async function SupplierDetailPage({ params }: PageProps) {
  const supplierManufacturer = await fetchSupplierManufacturer();
    
  const supplier = await fetchSupplierByID(Number(params.id));
  const productTypes = await fetchProductTypesBySupplierId(Number(params.id));

  if (!supplier) return notFound();

  const { name, brief, website, country, main_number } = supplier;

  return (
    <div className="p-6">
      {/* Info Card */}
      <div className="rounded-2xl shadow bg-white p-6 flex flex-col gap-4 w-full">
        {/* Title and Description */}
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">{name}</h2>
          <p className="text-gray-600">{brief || 'No description available.'}</p>
        </div>

        {/* Contact & Website */}
        <div className="text-sm text-gray-700 space-y-1">
          <p><strong>Country:</strong> {country}</p>
          {main_number && <p><strong>Main Number:</strong> {main_number}</p>}
          <p>
            <strong>Website:</strong>{' '}
            <a
              href={website.startsWith('http') ? website : `https://${website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600"
            >
              {website}
            </a>
          </p>
        </div>
      </div>

      {/* Tabs (e.g., ProductTypes, Assets, etc.) */}
      <div className="rounded-2xl shadow bg-white p-6 mt-6">
        <ProductTypesTable productTypes={productTypes} suppliersManufacturers={supplierManufacturer}/> 
      </div>
    </div>
  );
}
