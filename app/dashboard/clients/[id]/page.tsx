import { Metadata } from 'next';

import { fetchProductType, getClientById , getAssetsByClientId } from '@/app/lib/data';

import { notFound } from 'next/navigation';
import { Tabs } from '@/app/ui/clients/tab'; 

type PageProps = {
  params: { id: string };
};

export async function generateMetadata({ params }: any) {
  const client = await getClientById(Number(params.id));
  if (!client) return { title: 'Client Not Found' };

  return {
    title: client.name,
  };
}


export default async function ClientDetailPage({ params }: any) {
  
  const client = await getClientById(Number(params.id));
  const assets = await getAssetsByClientId(Number(params.id));
  const productTypes = await fetchProductType();

  if (!client) return notFound();

  const { name, brief, address, website, country, state } = client;
  const fullAddress = `${address}, ${state}, ${country}`;
  const mapQuery = encodeURIComponent(fullAddress);

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
            <h2 className="text-2xl font-semibold">{name}</h2>
            <p className="text-gray-600 mt-2">{brief || 'No description available.'}</p>
          </div>
        </div>

        {/* Address & Website */}
        <div className="pt-4 border-t text-sm text-gray-700">
          <p><strong>Address:</strong> {fullAddress}</p>
          <p><strong>Website:</strong>{' '}
            <a
              href={website.startsWith('http') ? website : `https://${website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600"
            >
              {website}
            </a>
          </p>
        </div>
        
      </div>
      <div className="rounded-2xl shadow bg-white p-6 flex flex-col gap-4 w-full">
        

        {/* Tabs => Assets, Tickets and Users */}
        <div className="pt-6 text-sm text-gray-700">
          <Tabs assets={assets} clientId={Number(params.id)} productTypes = {productTypes}/>
        </div>
      </div>
    </div>
  );
}