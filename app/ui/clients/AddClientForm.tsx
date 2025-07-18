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
import { addNewClient } from '@/app/lib/actions'; // Adjust the path if needed
import { AU_STATES_plus_Other } from '@/app/lib/general';

export type Option = {
  value: string;
  label: string;
};

type AddClientFormProps = {
  clientTypes: Option[];
};

export function AddClientForm({ clientTypes }: AddClientFormProps) {
  const [clientType, setClientType] = useState<Option | null>(null);
  const [state, setState] = useState<Option | null>(null);
  const [country, setCountry] = useState<Option | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await addNewClient(formData);
    // Optionally handle response/errors here
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {/* Name */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <label className="block mb-1 font-medium text-sm text-gray-700">Client Name</label>
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

      {/* Main Number */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <label className="block mb-1 font-medium text-sm text-gray-700">Main Number</label>
        <input
          name="main_number"
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
            required
            value={state}
            onChange={(opt) => setState(opt)}
            />
        <input type="hidden" name="state" value={state?.value ?? ''} 
        />
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
            required
            value={country}
            onChange={(opt) => setCountry(opt)}
        />
        <input type="hidden" name="country" value={country?.value ?? ''} />
      </div>

      {/* Client Type (Dropdown) */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <label className="block mb-1 font-medium text-sm text-gray-700">Client Type</label>
        <Select
          options={clientTypes}
          isClearable
          required
          value={clientType}
          onChange={(opt) => setClientType(opt)}
        />
        <input type="hidden" name="client_type" value={clientType?.value ?? ''} />
      </div>

      {/* Brief */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm md:col-span-2">
        <label className="block mb-1 font-medium text-sm text-gray-700">Brief</label>
        <textarea
          name="brief"
          className="w-full p-2 border border-gray-300 rounded bg-white"
        />
      </div>

      {/* Submit */}
      <div className="md:col-span-2">
        <button
          type="submit"
          className="w-full bg-[#6acb8c] text-white py-2 px-4 rounded-md hover:bg-[#6acb8c] transition"
        >
          Add Client
        </button>
      </div>
    </form>
  );
}
