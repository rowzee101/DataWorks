'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { deleteSupplierByID } from '@/app/lib/actions'; // Replace with actual path
import { DeleteButton } from '@/app/ui/clientSided/buttons'; // Reuse same DeleteButton

export default function DeleteSupplier({
  supplierId,
  supplierName,
}: {
  supplierId: number;
  supplierName: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      await deleteSupplierByID(supplierId.toString());
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">Delete Supplier</h2>
      <p className="mb-6">
        Are you sure you want to delete supplier <strong>{supplierName}</strong>?
      </p>
      <div className="flex justify-end gap-4">
        <button
          onClick={() => router.push('/dashboard/suppliers')}
          className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>
        <DeleteButton
          onDelete={handleDelete}
          confirmText={`Are you absolutely sure you want to delete "${supplierName}"?`}
          cancelUrl="/dashboard/suppliers"
          holdDurationMs={2000}
        />
      </div>
    </div>
  );
}
