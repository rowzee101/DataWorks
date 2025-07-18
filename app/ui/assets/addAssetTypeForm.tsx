'use client';

import countries from 'i18n-iso-countries';
import en from 'i18n-iso-countries/langs/en.json';
countries.registerLocale(en);

const countryOptions = Object.entries(countries.getNames('en')).map(([code, name]) => ({
  value: name,
  label: name,
}));

import { useState } from 'react';
import Select from 'react-select';
import { addNewAssetType } from '@/app/lib/actions';

export type Option = {
  value: string;
  label: string;
};

export function AddAssetTypeForm() {
  const [country, setCountry] = useState<Option | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await addNewAssetType(formData);
  };


  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {/* Asset Type Name */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <label className="block mb-1 font-medium text-sm text-gray-700">Asset Type Name</label>
        <input
          name="name"
          required
          className="w-full p-2 border border-gray-300 rounded bg-white"
        />
      </div>

      {/* Submit Button */}
      <div className="md:col-span-2">
        <button
          type="submit"
          className="w-full bg-[#6acb8c] text-white py-2 px-4 rounded-md hover:bg-[#6acb8c] transition"
        >
          Add New Asset Type
        </button>
      </div>
    </form>
  );
}
