
import { EditClientForm } from '@/app/ui/clients/EditClientForm';

// You may need to import or define fetchClientTypes and Option type
import { fetchClientTypes , getClientById } from '@/app/lib/data'; 
import type { Option } from '@/app/ui/clients/AddClientForm';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { Client } from '@/app/lib/definitions'; 
import countries from 'i18n-iso-countries';
import en from 'i18n-iso-countries/langs/en.json';
import { AU_STATES_plus_Other } from '@/app/lib/general';

countries.registerLocale(en);

const countryOptions = Object.entries(countries.getNames('en')).map(([code, name]) => ({
  value: name,
  label: name,
}));


import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editing Asset',
};

type PageProps = {
  params: { id: string };
};
export default async function page(props: any) {
  

  const { params } = await props;
  
  const clientRow = await getClientById(Number(params.id));
  
  if (!clientRow) {
    return <div>Asset not found.</div>;
  }
    const client_converted: Client = {
    id: clientRow.id,
    name: clientRow.name,
    website: clientRow.website,
    main_number: clientRow.main_number,
    state: clientRow.state,
    address: clientRow.address,
    country: clientRow.country,
    client_type: clientRow.client_type,
    brief: clientRow.brief ?? '',
    created_at: clientRow.created_at,
    };

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
      <EditClientForm
        clientTypes={clientTypes}
        initialData={client_converted} 
        stateOptions={AU_STATES_plus_Other} 
        countryOptions={countryOptions} 
      />
    </main>
  );
}