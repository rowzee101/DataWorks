import { Modal } from '@/app/ui/components/Modal';
import { fetchSupplierManufacturer } from '@/app/lib/data';
import DeleteAssetType from '@/app/ui/assets/deleteAssetTypeForm';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Delete Product Type?',
};

type PageProps = {
  params: { id: string };
};

export const dynamic = 'force-dynamic';

export default async function DeleteSupplierModal(props: any) {
  const { params } = await props;
  const supplierRow = await fetchSupplierManufacturer();

  // filter the supplierRow to find the one with the matching id
    const assetTypeId = Number(params.id);
    const assetType = supplierRow.find((row: any) => row.id === assetTypeId);
    if (!assetType) return <div>Asset Type not found.</div>;

  return (
    <Modal>
      <DeleteAssetType
        assetTypeId={assetType.id}
        assetTypeName={assetType.name || 'Unknown Asset Type'}
      />
    </Modal>
  );
}