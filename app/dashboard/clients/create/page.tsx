import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add New Client',
};

import { AddClientForm } from '@/app/ui/clients/AddClientForm';

// You may need to import or define fetchClientTypes and Option type
import { fetchClientTypes } from '@/app/lib/data'; // adjust path as needed
import type { Option } from '@/app/ui/clients/AddClientForm';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';

export default async function Page() {
  const rawClientTypes = await fetchClientTypes();
  const clientTypes: Option[] = rawClientTypes.map((type: any) => ({
    value: type.id,
    label: type.name,
  }));

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Clients', href: '/dashboard/clients' },
          {
            label: 'Add new client',
            href: '/dashboard/clients/create',
            active: true,
          },
        ]}
      />
      <AddClientForm clientTypes={clientTypes} />
    </main>
  );
}