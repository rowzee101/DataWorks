'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { deleteClientByID } from '@/app/lib/actions';
import { DeleteButton } from '@/app/ui/clientSided/buttons';

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
        Hold the delete button for 2 seconds to delete <strong>{clientName}</strong>.
      </p>
      <div className="flex justify-end gap-4">
        <DeleteButton
          onDelete={() => deleteClientByID(clientId.toString())}
          confirmText={`Are you absolutely sure you want to delete "${clientName}"?`}
          cancelUrl="/dashboard/clients"
          holdDurationMs={2000} // 2 seconds hold
        />
      </div>
    </div>
  );
}
