'use client';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const onClose = () => {
    router.back(); // Navigate back to close the modal
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto">
      <div className="bg-white p-4 rounded">
        <button onClick={onClose} className="mb-2">
          <XMarkIcon className="w-5" />
          </button>
        {children}
      </div>
    </div>
  );
}
