

import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchInvoicesPages } from '@/app/lib/data';
import { Metadata } from 'next';
import Link from 'next/link';
import PlusIcon from '@heroicons/react/24/outline/PlusIcon';

export const metadata: Metadata = {
  title: 'Clients',
};

import { dashboardFetchClientData } from '@/app/lib/data';
import { ClientCell } from '@/app/ui/clients/ClientCell';

export default async function DashboardPage() {
  const clients = await dashboardFetchClientData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {clients.map(client => (
        <ClientCell
          key={client.id}
          clientId={client.id}
          clientName={client.name}
          assetCount={client.asset_count}
        />
      ))}
      <Link
        href="/dashboard/clients/create"
        className="block border rounded-xl p-4 hover:bg-gray-50 transition"
      >
        <div className="flex flex-col items-center justify-center text-gray-600">
          <PlusIcon className="h-8 w-8 mb-2" />
          <span className="text-lg font-semibold">Add New Client</span>
        </div>
      </Link>

    </div>
  );
}
