'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { deleteAssetByID } from '@/app/lib/actions';
import { DeleteButton } from '@/app/ui/clientSided/buttons';

export default function DeleteAssetClient({
  assetId,
  assetNumber,
  productTypeName,
}: {
  assetId: number;
  assetNumber: string;
  productTypeName: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      await deleteAssetByID(assetId.toString());
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">Delete Asset</h2>
      <p className="mb-6">
        Are you sure you want to delete asset <strong>{assetNumber}</strong> (
        {productTypeName})?
      </p>
      <div className="flex justify-end gap-4">
        <button
          onClick={() => router.push('/dashboard/assets')}
          className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>
        <DeleteButton
          onDelete={() => deleteAssetByID(assetId.toString())}
          confirmText={`Are you absolutely sure you want to delete "${productTypeName}"?`}
          cancelUrl="/dashboard/clients"
          holdDurationMs={2000} // 2 seconds hold
        />
      </div>
    </div>
  );
}
