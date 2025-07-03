
import { Modal } from '@/app/ui/components/Modal';
import { getAssetById, fetchProductType } from '@/app/lib/data';
import DeleteAssetClient from '@/app/ui/assets/DeleteAssetForm'; // 👇 we'll define this next

type PageProps = {
  params: { id: string };
};

export default async function DeleteAssetModal(props: any) {
  const { params } = await props;
  const assetRow = await getAssetById(Number(params.id));
  const productTypes = await fetchProductType();

  if (!assetRow) return <div>Asset not found.</div>;

  const productType = productTypes.find(
    (pt) => pt.id === assetRow.product_type_id
  );

  return (
    <Modal>
      <DeleteAssetClient
        assetId={assetRow.id}
        assetNumber={assetRow.asset_number}
        productTypeName={productType?.name || 'Unknown Type'}
      />
    </Modal>
  );
}
