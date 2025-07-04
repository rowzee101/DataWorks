'use client';

// This file is a wrapper for the Tabs component to ensure it is treated as a client component in Next.js.
// It imports the Tabs component from the specified path and exports it as a default export.

import  {Tabs}  from '@/app/ui/assets/tab';
export default function TabsWrapper(props : any) {
  return <Tabs {...props} />;
}