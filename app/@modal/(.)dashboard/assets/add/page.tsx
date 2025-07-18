import { Metadata } from 'next';

import { Modal } from '@/app/ui/components/Modal';
import { fetchClients, fetchProductType, fetchSupplierManufacturer , fetchAssetTypes } from '@/app/lib/data';
import { AddAssetForm } from '@/app/ui/assets/AddAssetForm';


export const metadata: Metadata = {
  title: 'Add Asset',
};

export const dynamic = 'force-dynamic';

export default async function AddAssetModal() {

  const clients = await fetchClients();
  const productTypes = await fetchProductType();
  const suppliers = await fetchSupplierManufacturer();
  const assetTypes = await fetchAssetTypes();

  const toOption = (items: { id: number; name: string }[]) =>
    items.map((i) => ({ value: i.id, label: i.name }));
  return (
    <Modal>
      {/* <AddAssetForm /> */}
      <h2 className="text-lg font-semibold mb-4">Add New Asset</h2>
      <AddAssetForm
        clients={toOption(clients)}
        productTypes={toOption(productTypes)}
        suppliers={toOption(suppliers)}
        assetTypes={toOption(assetTypes)}
      />
    </Modal>
  );
}
