
'use client';

import { useState } from 'react';
import Select from 'react-select';
import { addNewAsset } from '@/app/lib/actions'; // Adjust path as needed

type Option = {
  value: number;
  label: string;
};

type AddAssetFormProps = {
  clients: Option[];
  productTypes: Option[];
  suppliers: Option[];
};

export function AddAssetForm({
  clients,
  productTypes,
  suppliers,
}: AddAssetFormProps) {
  const [client, setClient] = useState<Option | null>(null);
  const [productType, setProductType] = useState<Option | null>(null);
  const [supplier, setSupplier] = useState<Option | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await addNewAsset(formData);
    // Optionally handle response/errors here
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {/* Asset Number */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <label className="block mb-1 font-medium text-sm text-gray-700">Asset Number</label>
        <input
          name="asset_number"
          required
          className="w-full p-2 border border-gray-300 rounded bg-white"
        />
      </div>

      {/* Asset Barcode */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <label className="block mb-1 font-medium text-sm text-gray-700">Asset Barcode</label>
        <input
          name="asset_barnumber"
          className="w-full p-2 border border-gray-300 rounded bg-white"
        />
      </div>

      {/* Manufacturer Number */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <label className="block mb-1 font-medium text-sm text-gray-700">Manufacturer Number</label>
        <input
          name="manufacturer_number"
          required
          className="w-full p-2 border border-gray-300 rounded bg-white"
        />
      </div>

      {/* Purchase Date */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <label className="block mb-1 font-medium text-sm text-gray-700">Purchase Date</label>
        <input
          type="date"
          name="purchase_date"
          className="w-full p-2 border border-gray-300 rounded bg-white"
        />
      </div>

      {/* Last Service Date */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <label className="block mb-1 font-medium text-sm text-gray-700">Last Service Date</label>
        <input
          type="date"
          name="last_service_date"
          className="w-full p-2 border border-gray-300 rounded bg-white"
        />
      </div>

      {/* Note */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm md:col-span-2">
        <label className="block mb-1 font-medium text-sm text-gray-700">Note</label>
        <textarea
          name="note"
          className="w-full p-2 border border-gray-300 rounded bg-white"
        />
      </div>

      {/* Client */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <label className="block mb-1 font-medium text-sm text-gray-700">Client</label>
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
        <label className="block mb-1 font-medium text-sm text-gray-700">Product Type</label>
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
        <label className="block mb-1 font-medium text-sm text-gray-700">Supplier</label>
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
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Add Asset
        </button>
      </div>
    </form>
  );
}
