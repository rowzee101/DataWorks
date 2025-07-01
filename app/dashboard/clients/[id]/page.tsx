// import { getClientById , getAssetsByClientId } from '@/app/lib/data';
// import { notFound } from 'next/navigation';
// import { Tabs } from '@/app/ui/clients/tab'; 

// type PageProps = {
//   params: { id: string };
// };

// export default async function ClientDetailPage({ params }: any) {
  
//   const client = await getClientById(Number(params.id));
//   const assets = await getAssetsByClientId(Number(params.id));

//   if (!client) return notFound();

//   const { name, brief, address, website, country, state } = client;
//   const fullAddress = `${address}, ${state}, ${country}`;
//   const mapQuery = encodeURIComponent(fullAddress);

//   return (
//     <div className="p-6">
//       <div className="rounded-2xl shadow bg-white p-6 flex flex-col gap-4 w-full">
//         <div className="flex flex-col md:flex-row gap-4">
//           {/* Mini Map */}
//           <div className="w-full md:w-1/2 h-64 md:h-48 rounded-xl overflow-hidden">
//             <iframe
//               className="w-full h-full"
//               loading="lazy"
//               allowFullScreen
//               src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
//             />
//           </div>

//           {/* Title and Description */}
//           <div className="w-full md:w-1/2 flex flex-col justify-center">
//             <h2 className="text-2xl font-semibold">{name}</h2>
//             <p className="text-gray-600 mt-2">{brief || 'No description available.'}</p>
//           </div>
//         </div>

//         {/* Address & Website */}
//         <div className="pt-4 border-t text-sm text-gray-700">
//           <p><strong>Address:</strong> {fullAddress}</p>
//           <p><strong>Website:</strong>{' '}
//             <a
//               href={website.startsWith('http') ? website : `https://${website}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="underline text-blue-600"
//             >
//               {website}
//             </a>
//           </p>
//         </div>
//       </div>
//       <div className="rounded-2xl shadow bg-white p-6 flex flex-col gap-4 w-full">
        

//         {/* Tabs => Assets, Tickets and Users */}
//         <div className="pt-4 border-t text-sm text-gray-700 mt-8 mb-6">
//           <h3 className="text-lg font-semibold mb-4">Search field be here</h3>
//           <Tabs assets={assets} clientId={Number(params.id)}/>
//         </div>
//       </div>
//     </div>
//   );
// }





import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useState, useEffect } from 'react';

import { getClientById, getAssetsByClientId } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Tabs } from '@/app/ui/clients/tab';

type PageProps = {
  params: { id: string };
};

export default async function ClientDetailPage({ params }: PageProps) {
  const client = await getClientById(Number(params.id));
  const assets = await getAssetsByClientId(Number(params.id));

  if (!client) return notFound();

  const { name, brief, address, website, country, state } = client;
  const fullAddress = `${address}, ${state}, ${country}`;
  const mapQuery = encodeURIComponent(fullAddress);

  return (
    <ClientDetailPageClientSide
      client={client}
      assets={assets}
      clientId={Number(params.id)}
      fullAddress={fullAddress}
      mapQuery={mapQuery}
    />
  );
}

// Client-side wrapper component for search + URL syncing
function ClientDetailPageClientSide({
  client,
  assets,
  clientId,
  fullAddress,
  mapQuery,
}: {
  client: any;
  assets: any[];
  clientId: number;
  fullAddress: string;
  mapQuery: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const queryFromUrl = searchParams.get('query') || '';
  const [searchTerm, setSearchTerm] = useState(queryFromUrl);

  // Debounced update of URL query param
  const updateUrlQuery = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  // Sync local state with URL changes
  useEffect(() => {
    setSearchTerm(queryFromUrl);
  }, [queryFromUrl]);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const term = e.target.value;
    setSearchTerm(term);
    updateUrlQuery(term);
  }

  return (
    <div className="p-6">
      <div className="rounded-2xl shadow bg-white p-6 flex flex-col gap-4 w-full">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Mini Map */}
          <div className="w-full md:w-1/2 h-64 md:h-48 rounded-xl overflow-hidden">
            <iframe
              className="w-full h-full"
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            />
          </div>

          {/* Title and Description */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <h2 className="text-2xl font-semibold">{client.name}</h2>
            <p className="text-gray-600 mt-2">{client.brief || 'No description available.'}</p>
          </div>
        </div>

        {/* Address & Website */}
        <div className="pt-4 border-t text-sm text-gray-700">
          <p>
            <strong>Address:</strong> {fullAddress}
          </p>
          <p>
            <strong>Website:</strong>{' '}
            <a
              href={client.website.startsWith('http') ? client.website : `https://${client.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600"
            >
              {client.website}
            </a>
          </p>
        </div>
      </div>

      <div className="rounded-2xl shadow bg-white p-6 flex flex-col gap-4 w-full mt-8">
        {/* Search Input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search assets, tickets, users..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full max-w-sm p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Tabs (pass search term down) */}
        <Tabs assets={assets} clientId={clientId} searchQuery={searchTerm} />
      </div>
    </div>
  );
}
