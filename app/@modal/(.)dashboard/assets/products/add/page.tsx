import { Metadata } from 'next';

import { Modal } from '@/app/ui/components/Modal';
import { fetchSupplierManufacturer , fetchAssetTypes} from '@/app/lib/data';
import { AddProductTypeForm } from '@/app/ui/assets/AddProductTypeForm';


export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Add New Product',
};

export default async function AddAssetModal() {
  const suppliersManufacturers = await fetchSupplierManufacturer();
  const assetTypes = await fetchAssetTypes();
  const supplierOptions = suppliersManufacturers.map((supplier) => ({
    value: supplier.id,
    label: supplier.name,
  }));

  const toOption = (items: { id: number; name: string }[]) =>
    items.map((i) => ({ value: i.id, label: i.name }));
  
  return (
    <Modal>
      <h2 className="text-lg font-semibold mb-4">Add New Product</h2>
      <AddProductTypeForm suppliersManufacturers={supplierOptions} assetTypes={toOption(assetTypes)} />
    </Modal>
  );
}
