'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState, useTransition } from 'react';

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
