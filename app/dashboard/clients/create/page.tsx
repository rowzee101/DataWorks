import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add New Client',
};

import { AddClientForm } from '@/app/ui/clients/AddClientForm';

// You may need to import or define fetchClientTypes and Option type
import { fetchClientTypes } from '@/app/lib/data'; // adjust path as needed
import type { Option } from '@/app/ui/clients/AddClientForm';

export default async function Page() {
  const rawClientTypes = await fetchClientTypes();
  const clientTypes: Option[] = rawClientTypes.map((type: any) => ({
    value: type.id,
    label: type.name,
  }));

  return (
    <main>
      <AddClientForm clientTypes={clientTypes} />
    </main>
  );
}