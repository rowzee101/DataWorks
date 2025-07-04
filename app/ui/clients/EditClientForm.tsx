'use client';

import { useState, useEffect } from 'react';
import Select from 'react-select';
import { updateClient } from '@/app/lib/actions'; // You'll need to define this action

export type Option = {
  value: string;
  label: string;
};

type ClientData = {
  id: number;
  name: string;
  website: string;
  main_number: string;
  address: string;
  state: string;
  country: string;
  client_type: number;
  brief?: string;
};

type EditClientFormProps = {
  initialData: ClientData;
  clientTypes: Option[];       // value: number, label: string
  stateOptions: Option[];      // value: string, label: string
  countryOptions: Option[];    // value: string, label: string
};

export function EditClientForm({
  initialData,
  clientTypes,
  stateOptions,
  countryOptions,
}: EditClientFormProps) {
  const [clientType, setClientType] = useState<Option | null>(null);
  const [state, setState] = useState<Option | null>(null);
  const [country, setCountry] = useState<Option | null>(null);

  useEffect(() => {
    setClientType(clientTypes.find((c) => Number(c.value) === initialData.client_type) ?? null);
    setState(stateOptions.find((s) => s.value === initialData.state) ?? null);
    setCountry(countryOptions.find((c) => c.value === initialData.country) ?? null);
  }, [clientTypes, stateOptions, countryOptions, initialData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await updateClient(initialData.id.toString(), formData);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {/* Hidden ID */}
      <input type="hidden" name="id" value={initialData.id} />

      {/* Name */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <label className="block text-sm font-medium text-gray-700">Client Name</label>
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

      {/* Main Number */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <label className="block text-sm font-medium text-gray-700">Main Number</label>
        <input
          name="main_number"
          defaultValue={initialData.main_number}
          required
          className="w-full p-2 border border-gray-300 rounded bg-white"
        />
      </div>

      {/* Address */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm md:col-span-2">
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <input
          name="address"
          defaultValue={initialData.address}
          required
          className="w-full p-2 border border-gray-300 rounded bg-white"
        />
      </div>

      {/* State */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <label className="block text-sm font-medium text-gray-700">State</label>
        <Select
          options={stateOptions}
          isClearable
          value={state}
          onChange={(opt) => setState(opt)}
        />
        <input type="hidden" name="state" value={state?.value ?? ''} />
      </div>

      {/* Country */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <label className="block text-sm font-medium text-gray-700">Country</label>
        <Select
          options={countryOptions}
          isClearable
          value={country}
          onChange={(opt) => setCountry(opt)}
        />
        <input type="hidden" name="country" value={country?.value ?? ''} />
      </div>

      {/* Client Type */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <label className="block text-sm font-medium text-gray-700">Client Type</label>
        <Select
          options={clientTypes}
          isClearable
          value={clientType}
          onChange={(opt) => setClientType(opt)}
        />
        <input type="hidden" name="client_type" value={clientType?.value ?? ''} />
      </div>

      {/* Brief */}
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
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Update Client
        </button>
      </div>
    </form>
  );
}
