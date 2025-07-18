'use client';

import { useState, useEffect } from 'react';
import Select from 'react-select';
import { updateSupplier } from '@/app/lib/actions';
import type { SupplierManufacturer } from '@/app/lib/definitions';

export type Option = {
  value: string;
  label: string;
};

type EditSupplierFormProps = {
  initialData: SupplierManufacturer;
  countryOptions: Option[]; // value: string, label: string
};

export function EditSupplierForm({
  initialData,
  countryOptions,
}: EditSupplierFormProps) {
  const [country, setCountry] = useState<Option | null>(null);

  useEffect(() => {
    setCountry(countryOptions.find((c) => c.value === initialData.country) ?? null);
  }, [countryOptions, initialData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await updateSupplier(initialData.id.toString(), formData);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      <input type="hidden" name="id" value={initialData.id} />

      {/* Name */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <label className="block text-sm font-medium text-gray-700">Supplier Name</label>
        <input
          name="name"
          defaultValue={initialData.name}
          required
          className="w-full p-2 border border-gray-300 rounded bg-white"
        />
      </div>

      {/* Website */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <label className="block text-sm font-medium text-gray-700">Website</label>
        <input
          name="website"
          defaultValue={initialData.website}
          required
          className="w-full p-2 border border-gray-300 rounded bg-white"
        />
      </div>

      {/* Main Number (optional) */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <label className="block text-sm font-medium text-gray-700">Main Number</label>
        <input
          name="main_number"
          defaultValue={initialData.main_number ?? ''}
          className="w-full p-2 border border-gray-300 rounded bg-white"
        />
      </div>

      {/* Country */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <label className="block text-sm font-medium text-gray-700">Country</label>
        <Select
          options={countryOptions}
          isClearable
          required
          value={country}
          onChange={(opt) => setCountry(opt)}
        />
        <input type="hidden" name="country" value={country?.value ?? ''} />
      </div>

      {/* Brief (optional) */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm md:col-span-2">
        <label className="block text-sm font-medium text-gray-700">Brief</label>
        <textarea
          name="brief"
          defaultValue={initialData.brief ?? ''}
          className="w-full p-2 border border-gray-300 rounded bg-white"
        />
      </div>

      {/* Submit */}
      <div className="md:col-span-2">
        <button
          type="submit"
          className="w-full bg-[#6acb8c] text-white py-2 px-4 rounded-md hover:bg-[#6acb8c] transition"
        >
          Update Supplier
        </button>
      </div>
    </form>
  );
}
