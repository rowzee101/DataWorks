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

export default async function DeleteAssetModal(props: any) {
  const { params } = await props;
  const assetRow = await getClientById(Number(params.id));

  if (!assetRow) return <div>Client not found.</div>;


  return (
    <Modal>
      <DeleteClient
        clientId={assetRow.id}
        clientName={assetRow.asset_number || 'Unknown Client'}
      />
    </Modal>
  );
}
