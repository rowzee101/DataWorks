import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add New Client',
};

import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
 
export default async function Page() {
  const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Clients', href: '/dashboard/clients' },
          {
            label: 'Add New Client',
            href: '/dashboard/clients/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}