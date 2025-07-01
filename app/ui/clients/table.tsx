'use client';

import React, { useState } from 'react';
import Link from 'next/link'; 

type Asset = {
  id: number;
  asset_barnumber: string;
  asset_number: string;
  manufacturer_number: string;
  purchase_date: string;
  last_service_date: string | null;
  note: string | null;
  // add other fields as needed
};

interface AssetsTableProps {
  assets: Asset[];
}

export default function AssetsTable({ assets }: AssetsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAssets = assets.filter((asset) => {
    const term = searchTerm.toLowerCase();
    return (
      asset.asset_number.toLowerCase().includes(term) ||
      asset.manufacturer_number.toLowerCase().includes(term) ||
      asset.asset_barnumber.toLowerCase().includes(term) ||
      (asset.note?.toLowerCase().includes(term) ?? false)
    );
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search assets..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded w-full max-w-sm"
      />

      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Asset Number</th>
            <th className="border border-gray-300 px-4 py-2">Manufacturer Number</th>
            <th className="border border-gray-300 px-4 py-2">Asset Barnumber</th>
            <th className="border border-gray-300 px-4 py-2">Purchase Date</th>
            <th className="border border-gray-300 px-4 py-2">Last Service Date</th>
            <th className="border border-gray-300 px-4 py-2">Note</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th> {/* New  Edit column */}
          </tr>
        </thead>
        <tbody>
          {filteredAssets.length > 0 ? (
            filteredAssets.map((asset) => (
              <tr key={asset.id}>
                <td className="border border-gray-300 px-4 py-2">{asset.asset_number}</td>
                <td className="border border-gray-300 px-4 py-2">{asset.manufacturer_number}</td>
                <td className="border border-gray-300 px-4 py-2">{asset.asset_barnumber}</td>
                <td className="border border-gray-300 px-4 py-2">{new Date(asset.purchase_date).toLocaleDateString()}</td>
                <td className="border border-gray-300 px-4 py-2">{asset.last_service_date ? new Date(asset.last_service_date).toLocaleDateString() : '-'}</td>
                <td className="border border-gray-300 px-4 py-2">{asset.note || '-'}</td>
                <td className="border border-gray-300 px-4 py-2 text-center"> 
                  <Link href={`/assets/${asset.id}/edit`} className="text-blue-600 hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center p-4">
                No assets found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
