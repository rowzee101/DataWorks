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
import { addNewSupplier } from '@/app/lib/actions'; 
import { AU_STATES_plus_Other } from '@/app/lib/general';

export type Option = {
  value: string;
  label: string;
};

export function AddSupplierForm() {
  const [state, setState] = useState<Option | null>(null);
  const [country, setCountry] = useState<Option | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await addNewSupplier(formData);
    // Optionally handle response/errors here
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {/* Supplier Name */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <label className="block mb-1 font-medium text-sm text-gray-700">Supplier Name</label>
        <input
          name="name"
          required
          className="w-full p-2 border border-gray-300 rounded bg-white"
        />
      </div>

      {/* Website */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <label className="block mb-1 font-medium text-sm text-gray-700">Website</label>
        <input
          name="website"
          required
          className="w-full p-2 border border-gray-300 rounded bg-white"
        />
      </div>

      {/* Phone Number */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <label className="block mb-1 font-medium text-sm text-gray-700">Phone Number</label>
        <input
          name="phone"
          required
          className="w-full p-2 border border-gray-300 rounded bg-white"
        />
      </div>

      {/* State */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <label className="block mb-1 font-medium text-sm text-gray-700">State</label>
        <Select
          options={AU_STATES_plus_Other}
          isClearable
          value={state}
          onChange={(opt) => setState(opt)}
        />
        <input type="hidden" name="state" value={state?.value ?? ''} />
      </div>

      {/* Address */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <label className="block mb-1 font-medium text-sm text-gray-700">Address</label>
        <input
          name="address"
          required
          className="w-full p-2 border border-gray-300 rounded bg-white"
        />
      </div>

      {/* Country */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <label className="block mb-1 font-medium text-sm text-gray-700">Country</label>
        <Select
          options={countryOptions}
          isClearable
          value={country}
          onChange={(opt) => setCountry(opt)}
        />
        <input type="hidden" name="country" value={country?.value ?? ''} />
      </div>

      {/* Notes */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm md:col-span-2">
        <label className="block mb-1 font-medium text-sm text-gray-700">Notes</label>
        <textarea
          name="notes"
          className="w-full p-2 border border-gray-300 rounded bg-white"
        />
      </div>

      {/* Submit Button */}
      <div className="md:col-span-2">
        <button
          type="submit"
          className="w-full bg-[#6acb8c] text-white py-2 px-4 rounded-md hover:bg-[#6acb8c] transition"
        >
          Add Supplier
        </button>
      </div>
    </form>
  );
}
