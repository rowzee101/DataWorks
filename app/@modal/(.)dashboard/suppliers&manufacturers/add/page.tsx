import { Metadata } from 'next';

import { Modal } from '@/app/ui/components/Modal';
import { AddSupplierForm } from '@/app/ui/suppliers&manufacturers/AddSupplierForm';


export const metadata: Metadata = {
  title: 'Add New Supplier or Manufacturer',
};

export default async function AddSupplierModal() {
  
  return (
    <Modal>
      <AddSupplierForm
      />
    </Modal>
  );
}