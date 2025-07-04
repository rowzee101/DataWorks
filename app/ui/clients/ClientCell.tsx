'use client';

import Link from 'next/link';
import { UpdateClient , DeleteClient } from '@/app/ui/invoices/buttons'; // Adjust the import path as needed

type Props = {
  clientId: number;
  clientName: string;
  assetCount: number;
};

export function ClientCell({ clientId, clientName, assetCount }: Props) {
  return (
    <div className="relative">
      {/* Link covers full card */}
      <Link
        href={`/dashboard/clients/${clientId}`}
        className="block border rounded-xl p-4 hover:bg-gray-50 transition bg-sky-600"
      >
        <div className="text-lg font-semibold">{clientName}</div>
        <div className="text-sm text-gray-600">
          {assetCount} {assetCount === 1 ? 'asset' : 'assets'}
        </div>
      </Link>

      {/* Overlay button absolutely positioned */}
      <div className="absolute top-2 right-2 z-10 flex flex-row gap-2">
        <UpdateClient id={String(clientId)} />
        <DeleteClient id={String(clientId)} />
      </div>
    </div>
  );
}