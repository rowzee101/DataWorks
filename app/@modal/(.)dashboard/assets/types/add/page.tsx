import { Metadata } from 'next';

import { Modal } from '@/app/ui/components/Modal';
import { AddAssetTypeForm } from '@/app/ui/assets/addAssetTypeForm';


export const metadata: Metadata = {
  title: 'Add New Product Type',
};

export default async function AddAssetTypeModal() {

  return (
    <Modal>
      <AddAssetTypeForm
      />
    </Modal>
  );
}