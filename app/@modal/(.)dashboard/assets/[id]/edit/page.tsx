// import { Modal } from '@/app/ui/components/Modal';
// import { getAssetById, fetchClients, fetchProductType, fetchSupplierManufacturer } from '@/app/lib/data';
// import { EditAssetForm } from '@/app/ui/assets/EditAssetForm';

// export default async function AddAssetModal() {

//   const clients = await fetchClients();
//   const productTypes = await fetchProductType();
//   const suppliers = await fetchSupplierManufacturer();

//   const toOption = (items: { id: number; name: string }[]) =>
//     items.map((i) => ({ value: i.id, label: i.name }));
//   return (
//     <Modal>
//       {/* <AddAssetForm /> */}
//       <EditAssetForm
//         clients={toOption(clients)}
//         productTypes={toOption(productTypes)}
//         suppliers={toOption(suppliers)}
//       />
//     </Modal>
//   );
// }


// app/dashboard/assets/[id]/edit/@modal/page.tsx

import { Modal } from '@/app/ui/components/Modal';
import { EditAssetForm } from '@/app/ui/assets/EditAssetForm';
import { Asset } from '@/app/lib/definitions';

import {
  getAssetById,
  fetchClients,
  fetchProductType,
  fetchSupplierManufacturer,
} from '@/app/lib/data';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editing Asset',
};

type PageProps = {
  params: { id: string };
};

export const dynamic = 'force-dynamic';

export default async function EditAssetModal(props: any) {
  const { params } = await props;

  const assetRow = await getAssetById(Number(params.id));

  if (!assetRow) {
    return <div>Asset not found.</div>;
  }

  // Manually map Row -> Asset
  const asset: Asset = {
    id: assetRow.id,
    asset_number: assetRow.asset_number,
    asset_barnumber: assetRow.asset_barnumber ?? '',
    manufacturer_number: assetRow.manufacturer_number,
    purchase_date: assetRow.purchase_date?.toISOString().split('T')[0],
    last_service_date: assetRow.last_service_date?.toISOString().split('T')[0],
    note: assetRow.note ?? '',
    client_id: assetRow.client_id,
    supplier_id: assetRow.supplier_id,
    product_type_id: assetRow.product_type_id,
    asset_type_id: assetRow.asset_type_id ?? null,
    manufacturer_id: assetRow.manufacturer_id ?? null,
    service_due_date: assetRow.service_due_date?.toISOString().split('T')[0] ?? null,
  };

  const [clients, productTypes, suppliers] = await Promise.all([
    fetchClients(),
    fetchProductType(),
    fetchSupplierManufacturer(),
  ]);

  const toOption = (items: { id: number; name: string }[]) =>
    items.map((i) => ({ value: i.id, label: i.name }));

  return (
    <Modal>
      <EditAssetForm
        initialData={[asset]}
        clients={toOption(clients)}
        productTypes={toOption(productTypes)}
        suppliers={toOption(suppliers)}
        assetTypes={toOption([])}
      />
    </Modal>
  );
}

