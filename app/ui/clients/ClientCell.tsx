'use client';

import Link from 'next/link';

type Props = {
  clientId: number;
  clientName: string;
  assetCount: number;
};

export function ClientCell({ clientId, clientName, assetCount }: Props) {
  return (
    <Link
      href={`/clients/${clientId}`}
      className="block border rounded-xl p-4 hover:bg-gray-50 transition"
    >
      <div className="text-lg font-semibold">{clientName}</div>
      <div className="text-sm text-gray-600">
        {assetCount} {assetCount === 1 ? 'asset' : 'assets'}
      </div>
    </Link>
  );
}
