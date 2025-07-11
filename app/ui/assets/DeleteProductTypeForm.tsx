'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { deleteProductTypeByID } from '@/app/lib/actions';
import { DeleteButton } from '@/app/ui/clientSided/buttons';

export default function DeleteProductType({
  productTypeId,
  productTypeName,
}: {
  productTypeId: number;
  productTypeName: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      await deleteProductTypeByID(productTypeId.toString());
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">Delete Product Type</h2>
      <p className="mb-6">
        Are you sure you want to delete product type <strong>{productTypeName}</strong>?
      </p>
      <div className="flex justify-end gap-4">
        <button
          onClick={() => router.back()}
          className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>
        <DeleteButton
          onDelete={() => deleteProductTypeByID(productTypeId.toString())}
          confirmText={`Are you absolutely sure you want to delete "${productTypeName}"?`}
          cancelUrl="/dashboard/assets"
          holdDurationMs={2000}
        />
      </div>
    </div>
  );
}
