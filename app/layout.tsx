import '@/app/ui/global.css'; 

import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: {
    template: '%s - PacificMed Asset Management',
    default: 'PacificMed Dashboard',
  },
  description: 'PacificMed Asset Management App',
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className = {'${inter.classname antialiased'}>{children} {modal}</body>
    </html>
  );
}
