import { Modal } from '@/app/ui/components/Modal';
import { fetchClients, fetchProductType, fetchSupplierManufacturer } from '@/app/lib/data';
import { AddAssetForm } from '@/app/ui/assets/AddAssetForm';

export default async function AddAssetModal() {

  const clients = await fetchClients();
  const productTypes = await fetchProductType();
  const suppliers = await fetchSupplierManufacturer();

  const toOption = (items: { id: number; name: string }[]) =>
    items.map((i) => ({ value: i.id, label: i.name }));
  return (
    <Modal>
      {/* <AddAssetForm /> */}
      <AddAssetForm
        clients={toOption(clients)}
        productTypes={toOption(productTypes)}
        suppliers={toOption(suppliers)}
      />
    </Modal>
  );
}
