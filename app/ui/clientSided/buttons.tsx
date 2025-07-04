'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState, useTransition } from 'react';
import html2pdf from 'html2pdf.js';
import { DocumentArrowDownIcon} from '@heroicons/react/24/outline';

type DeleteButtonProps = {
  onDelete: () => Promise<void>;
  label?: string;
  confirmText?: string;
  cancelUrl?: string;
  holdDurationMs?: number;
  className?: string;
  isDestructive?: boolean;
  disabled?: boolean;
};

export function DeleteButton({
  onDelete,
  label = 'Hold to Delete',
  confirmText = 'Are you sure you want to delete this item?',
  cancelUrl = '/dashboard',
  holdDurationMs = 2000,
  className = '',
  isDestructive = true,
  disabled = false,
}: DeleteButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [holding, setHolding] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startHold = () => {
    if (disabled || isPending) return;
    setHolding(true);
    timerRef.current = setTimeout(() => {
      if (confirm(confirmText)) {
        startTransition(async () => {
          await onDelete();
          router.push(cancelUrl);
        });
      }
    }, holdDurationMs);
  };

  const cancelHold = () => {
    setHolding(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  return (
    <button
      onMouseDown={startHold}
      onTouchStart={startHold}
      onMouseUp={cancelHold}
      onMouseLeave={cancelHold}
      onTouchEnd={cancelHold}
      disabled={isPending || disabled}
      className={`px-4 py-2 rounded transition-all duration-200 ${
        isDestructive ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-gray-200 text-black'
      } disabled:opacity-50 ${holding ? 'scale-95' : ''} ${className}`}
    >
      {isPending ? 'Deleting...' : label}
    </button>
  );
}

///////////////////////////




export function DownloadPDFButton({ clientName }: { clientName: string }) {
  const handleDownload = () => {
    const element = document.getElementById('pdf-content');
    if (!element) return;

    const opt = {
      margin: 0.5,
      filename: `${clientName}_info.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <button
      onClick={handleDownload}
      className="flex h-10 items-center rounded-lg bg-white px-4 text-sm font-medium text-black transition-colors hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
    >
      Download PDF
      <DocumentArrowDownIcon className="h-5 md:ml-4" />
    </button>
  );
}
