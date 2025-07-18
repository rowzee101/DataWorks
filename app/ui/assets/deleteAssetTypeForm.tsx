'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { deleteAssetTypeByID } from '@/app/lib/actions'; // Replace with actual path
import { DeleteButton } from '@/app/ui/clientSided/buttons'; // Reuse same DeleteButton

export default function DeleteAssetType({
  assetTypeId,
  assetTypeName,
}: {
  assetTypeId: number;
  assetTypeName: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      await deleteAssetTypeByID(assetTypeId.toString());
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">Delete Asset Type</h2>
      <p className="mb-6">
        Are you sure you want to delete asset type <strong>{assetTypeName}</strong>?
      </p>
      <div className="flex justify-end gap-4">
        <button
          onClick={() => router.back()}
          className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>
        <DeleteButton
          onDelete={handleDelete}
          confirmText={`Are you absolutely sure you want to delete "${assetTypeName}"?`}
          cancelUrl="/dashboard/assets"
          holdDurationMs={2000}
        />
      </div>
    </div>
  );
}
