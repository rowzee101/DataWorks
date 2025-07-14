
import { Modal } from '@/app/ui/components/Modal';
import {fetchProductTypeByID} from '@/app/lib/data';
import DeleteProductType from '@/app/ui/assets/DeleteProductTypeForm'; 

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Delete Product?',
};

type PageProps = {
  params: { id: string };
};

export const dynamic = 'force-dynamic';

export default async function DeleteProductTypeModal(props: any) {
  const { params } = await props;
  const productTypeRowList = await fetchProductTypeByID(Number(params.id));

  if (!productTypeRowList) return <div>Product not found.</div>;

  return (
    <Modal>
      <DeleteProductType
        productTypeId={productTypeRowList?.id}
        productTypeName={productTypeRowList?.name || 'Unknown Type'}
      />
    </Modal>
  );
}
