'use client';

import { useState, useEffect } from 'react';
import Select from 'react-select';
import { updateAsset } from '@/app/lib/actions'; // You may rename this to updateAsset
import { DeleteAsset } from '@/app/ui/invoices/buttons'; // Adjust the import path as needed

type Option = {
  value: number;
  label: string;
};

type AssetData = {
  asset_id: number;
  asset_number: string;
  asset_barnumber?: string;
  manufacturer_number: string;
  purchase_date?: string;
  last_service_date?: string;
  note?: string;
  client_id?: number;
  supplier_id?: number;
  product_type_id?: number;
};

type EditAssetFormProps = {
  initialData: AssetData;
  clients: Option[];
  productTypes: Option[];
  suppliers: Option[];
};

export function EditAssetForm({
  initialData,
  clients,
  productTypes,
  suppliers,
}: EditAssetFormProps) {
  const [client, setClient] = useState<Option | null>(null);
  const [productType, setProductType] = useState<Option | null>(null);
  const [supplier, setSupplier] = useState<Option | null>(null);
  const assetId = initialData.asset_id;

  useEffect(() => {
    setClient(clients.find((c) => c.value === initialData.client_id) || null);
    setProductType(productTypes.find((p) => p.value === initialData.product_type_id) || null);
    setSupplier(suppliers.find((s) => s.value === initialData.supplier_id) || null);
  }, [clients, productTypes, suppliers, initialData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await updateAsset(assetId.toString(), formData); // Convert assetId to string
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {/* Hidden Asset ID */}
      <input type="hidden" name="asset_id" value={initialData.asset_id} />

      {/* Asset Number */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <label className="block mb-1 text-sm font-medium text-gray-700">Asset Number</label>
        <input
          name="asset_number"
          defaultValue={initialData.asset_number}
          required
          className="w-full p-2 border border-gray-300 rounded bg-white"
        />
      </div>

      {/* Asset Barcode */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <label className="block mb-1 text-sm font-medium text-gray-700">Asset Barcode</label>
        <input
          name="asset_barnumber"
          defaultValue={initialData.asset_barnumber || ''}
          className="w-full p-2 border border-gray-300 rounded bg-white"
        />
      </div>

      {/* Manufacturer Number */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <label className="block mb-1 text-sm font-medium text-gray-700">Manufacturer Number</label>
        <input
          name="manufacturer_number"
          defaultValue={initialData.manufacturer_number}
          required
          className="w-full p-2 border border-gray-300 rounded bg-white"
        />
      </div>

      {/* Purchase Date */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <label className="block mb-1 text-sm font-medium text-gray-700">Purchase Date</label>
        <input
          type="date"
          name="purchase_date"
          defaultValue={initialData.purchase_date ?? ''}
          className="w-full p-2 border border-gray-300 rounded bg-white"
        />
      </div>

      {/* Last Service Date */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <label className="block mb-1 text-sm font-medium text-gray-700">Last Service Date</label>
        <input
          type="date"
          name="last_service_date"
          defaultValue={initialData.last_service_date ?? ''}
          className="w-full p-2 border border-gray-300 rounded bg-white"
        />
      </div>

      {/* Note */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm md:col-span-2">
        <label className="block mb-1 text-sm font-medium text-gray-700">Note</label>
        <textarea
          name="note"
          defaultValue={initialData.note ?? ''}
          className="w-full p-2 border border-gray-300 rounded bg-white"
        />
      </div>

      {/* Client */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <label className="block mb-1 text-sm font-medium text-gray-700">Client</label>
        <Select
          options={clients}
          isClearable
          value={client}
          onChange={(opt) => setClient(opt)}
        />
        <input type="hidden" name="client_id" value={client?.value ?? ''} />
      </div>

      {/* Product Type */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <label className="block mb-1 text-sm font-medium text-gray-700">Product Type</label>
        <Select
          options={productTypes}
          isClearable
          value={productType}
          onChange={(opt) => setProductType(opt)}
        />
        <input type="hidden" name="product_type_id" value={productType?.value ?? ''} />
      </div>

      {/* Supplier */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <label className="block mb-1 text-sm font-medium text-gray-700">Supplier</label>
        <Select
          options={suppliers}
          isClearable
          value={supplier}
          onChange={(opt) => setSupplier(opt)}
        />
        <input type="hidden" name="supplier_id" value={supplier?.value ?? ''} />
      </div>

      {/* Submit */}
      <div className="md:col-span-2">
        <button
          type="submit"
          className="w-full bg-[#6acb8c] text-white py-2 px-4 rounded-md hover:bg-[#6acb8c] transition"
        >
          Update Asset
        </button>
      </div>
    </form>
  );
}
