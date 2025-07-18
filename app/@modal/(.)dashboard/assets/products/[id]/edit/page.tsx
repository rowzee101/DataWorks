
import { Modal } from '@/app/ui/components/Modal';
import { EditProductTypeForm } from '@/app/ui/assets/EditProductTypeForm';

import {
  fetchSupplierManufacturer,
  fetchProductTypeByID,
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

  const productTypeRowList = await fetchProductTypeByID(Number(params.id));

  if (!productTypeRowList) {
    return <div>Product not found.</div>;
  }

    // Manually map Row -> AssetData
    const product_converted = {
    id: productTypeRowList.id,
    name: productTypeRowList.name,
    supplier1_id: productTypeRowList.supplier1_id,
    supplier2_id: productTypeRowList.supplier2_id ?? undefined,
    manufacturer_id: productTypeRowList.manufacturer_id,
    price: productTypeRowList.price,
    asset_type_id: productTypeRowList.asset_type_id, // Add this line
    };

  const [suppliers] = await Promise.all([
    fetchSupplierManufacturer(),
  ]);

  const toOption = (items: { id: number; name: string }[]) =>
    items.map((i) => ({ value: i.id, label: i.name }));

  return (
    <Modal>
      {/* Editing product type title */}
      <h2 className="text-lg font-semibold mb-4">Editing Product</h2>
      <EditProductTypeForm
        initialData={product_converted}
        suppliers={toOption(suppliers)}
        assetTypes={toOption(productTypeRowList.asset_types)}
      />
    </Modal>
  );
}
