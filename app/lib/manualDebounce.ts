import { useRef } from 'react';

export function useManualDebounce(callback: (...args: any[]) => void, delay: number) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  function debouncedFunction(...args: any[]) {
    if (typeof window === 'undefined') return; // 👈 ensure only runs client-side

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }

  return debouncedFunction;
}
