// 'use client';

// import {
//   UserGroupIcon,
//   HomeIcon,
//   DocumentDuplicateIcon,
// } from '@heroicons/react/24/outline';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import clsx from 'clsx';

// // Map of links to display in the side navigation.
// // Depending on the size of the application, this would be stored in a database.
// const links = [
//   { name: 'Home', href: '/dashboard', icon: HomeIcon },
//   {
//     name: 'Invoices',
//     href: '/dashboard/invoices',
//     icon: DocumentDuplicateIcon,
//   },
//   { name: 'Customers', 
//     href: '/dashboard/customers', 
//     icon: UserGroupIcon },
//     {
//     name: 'Trials',
//     href: '/dashboard/trials',
//     icon: DocumentDuplicateIcon,
//   },
// ];

// export default function NavLinks() {
//   const pathname = usePathname();
//   return (
//     <>
//       {links.map((link) => {
//         const LinkIcon = link.icon;
//         return (
//           <Link
//             key={link.name}
//             href={link.href}
//             className={clsx(
//               'flex h-[48px] grow items-center justify-center gap-2 rounded-sm bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
//               {
//                 'bg-sky-100 text-blue-600': pathname === link.href,
//               },
//             )}
//             >
//             <LinkIcon className="w-6" />
//             <p className="hidden md:block">{link.name}</p>
//           </Link>
//         );
//       })}
//     </>
//   );
// }


'use client';

import {
  CubeIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  BuildingOffice2Icon,
  InboxStackIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'Clients', href: '/dashboard/clients', icon: BuildingOffice2Icon },
  { name: 'Invoices', href: '/dashboard/invoices',icon: DocumentDuplicateIcon, },
  { name: 'Assets', href: '/dashboard/assets', icon: InboxStackIcon },
  { name: 'Suppliers & Manufacturers', href: '/dashboard/suppliers&manufacturers', icon: CubeIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-[#161612] p-3 text-sm font-medium hover:bg-[#20201d] hover:text-[#F5F5F5] md:flex-none md:justify-start md:p-2 md:px-3 text-[#F5F5F5]',
              {
                'bg-[#6acb8c] text-[#0b0b09]': pathname === link.href,
              },
            )}
            >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}