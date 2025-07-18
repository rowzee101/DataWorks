'use client';

import { useState, useEffect } from 'react';
import Select from 'react-select';
import { updateProductType } from '@/app/lib/actions'; // Your new update action
import { set } from 'zod';
import { ProductType } from '@/app/lib/definitions'; // Adjust the import path as needed


type Option = {
  value: number;
  label: string;
};


type EditProductTypeFormProps = {
  initialData: ProductType;
  suppliers: Option[];
  assetTypes: Option[];
};

export function EditProductTypeForm({
  initialData,
  suppliers,
  assetTypes,
}: EditProductTypeFormProps) {
  const [supplier1, setSupplier1] = useState<Option | null>(null);
  const [supplier2, setSupplier2] = useState<Option | null>(null);
  const [manufacturer, setManufacturer] = useState<Option | null>(null);
  const [assetType, setAssetType] = useState<Option | null>(null);

  useEffect(() => {
    setSupplier1(suppliers.find((s) => s.value === initialData.supplier1_id) || null);
    setSupplier2(suppliers.find((s) => s.value === initialData.supplier2_id) || null);
    setManufacturer(suppliers.find((s) => s.value === initialData.manufacturer_id) || null);
    setAssetType(assetTypes.find((a) => a.value === initialData.asset_type_id) || null);
  }, [suppliers, assetTypes, initialData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await updateProductType(initialData.id.toString(), formData);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {/* Product Type Name */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm md:col-span-2">
        <label className="block mb-1 text-sm font-medium text-gray-700">Product Type Name</label>
        <input
          name="name"
          defaultValue={initialData.name}
          required
          className="w-full p-2 border border-gray-300 rounded bg-white"
        />
      </div>

      {/* Asset Type */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <label className="block mb-1 font-medium text-sm text-gray-700">Type of Product</label>
        <Select
          options={assetTypes}
          isClearable
          value={assetType}
          onChange={(opt) => setAssetType(opt)}
        />
        <input type="hidden" name="asset_type_id" value={assetType?.value ?? ''} />
      </div>

      {/* Supplier 1 */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <label className="block mb-1 text-sm font-medium text-gray-700">Primary Supplier</label>
        <Select
          options={suppliers}
          isClearable
          required
          value={supplier1}
          onChange={(opt) => setSupplier1(opt)}
        />
        <input type="hidden" name="supplier1_id" value={supplier1?.value ?? ''} />
      </div>

      {/* Supplier 2 */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <label className="block mb-1 text-sm font-medium text-gray-700">Secondary Supplier (Optional)</label>
        <Select
          options={suppliers}
          isClearable
          value={supplier2}
          onChange={(opt) => setSupplier2(opt)}
        />
        <input type="hidden" name="supplier2_id" value={supplier2?.value ?? ''} />
      </div>

      {/* Manufacturer */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <label className="block mb-1 text-sm font-medium text-gray-700">Manufacturer</label>
        <Select
          options={suppliers}
          isClearable
          required
          value={manufacturer}
          onChange={(opt) => setManufacturer(opt)}
        />
        <input type="hidden" name="manufacturer_id" value={manufacturer?.value ?? ''} />
      </div>

      {/* Price */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <label className="block mb-1 text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          name="price"
          defaultValue={initialData.price ?? ''}
          className="w-full p-2 border border-gray-300 rounded bg-white"
        />
      </div>

      {/* Submit + Delete */}
      <div className="md:col-span-2">
        <button
          type="submit"
          className="w-full bg-[#6acb8c] text-white py-2 px-4 rounded-md hover:bg-[#6acb8c] transition"
        >
          Update Product Type
        </button>
      </div>
    </form>
  );
}
