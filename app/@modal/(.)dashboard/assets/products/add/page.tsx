import { Metadata } from 'next';

import { Modal } from '@/app/ui/components/Modal';
import { fetchSupplierManufacturer } from '@/app/lib/data';
import { AddProductTypeForm } from '@/app/ui/assets/AddProductTypeForm';


export const metadata: Metadata = {
  title: 'Add New Product',
};

export default async function AddAssetModal() {
  const suppliersManufacturers = await fetchSupplierManufacturer();
  const supplierOptions = suppliersManufacturers.map((supplier) => ({
    value: supplier.id,
    label: supplier.name,
  }));
  
  return (
    <Modal>
      <AddProductTypeForm suppliersManufacturers={supplierOptions}
      />
    </Modal>
  );
}
