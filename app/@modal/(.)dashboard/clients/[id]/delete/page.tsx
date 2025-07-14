import { Modal } from '@/app/ui/components/Modal';
import { getClientById } from '@/app/lib/data';
import DeleteClient from '@/app/ui/clients/DeleteClientForm';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Delete Client?',
};

type PageProps = {
  params: { id: string };
};

export const dynamic = 'force-dynamic';

export default async function DeleteAssetModal(props: any) {
  const { params } = await props;
  const clientRow = await getClientById(Number(params.id));

  if (!clientRow) return <div>Client not found.</div>;


  return (
    <Modal>
      <DeleteClient
        clientId={clientRow.id}
        clientName={clientRow.name || 'Unknown Client'}
      />
    </Modal>
  );
}
