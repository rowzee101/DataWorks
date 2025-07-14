import { Modal } from '@/app/ui/components/Modal';
import { fetchSupplierManufacturer } from '@/app/lib/data';
import DeleteSupplier from '@/app/ui/suppliers&manufacturers/DeleteSupplierForm';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Delete Supplier or Manufacturer?',
};

type PageProps = {
  params: { id: string };
};

export const dynamic = 'force-dynamic';

export default async function DeleteSupplierModal(props: any) {
  const { params } = await props;
  const supplierRow = await fetchSupplierManufacturer();

  // filter the supplierRow to find the one with the matching id
    const supplierId = Number(params.id);
    const supplier = supplierRow.find((row: any) => row.id === supplierId);
    if (!supplier) return <div>Supplier or Manufacturer not found.</div>;

  return (
    <Modal>
      <DeleteSupplier
        supplierId={supplier.id}
        supplierName={supplier.name || 'Unknown Supplier or Manufacturer'}
      />
    </Modal>
  );
}