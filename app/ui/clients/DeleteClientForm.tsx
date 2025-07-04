'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { deleteClientByID } from '@/app/lib/actions';

export default function DeleteClient({
  clientId,
  clientName,
}: {
  clientId: number;
  clientName: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      await deleteClientByID(clientId.toString());
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">Delete client</h2>
      <p className="mb-6">
        Are you sure you want to delete client <strong>{clientName}</strong>
      </p>
      <div className="flex justify-end gap-4">
        <button
          onClick={() => router.push('/dashboard/assets')}
          className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
        >
          {isPending ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
}
