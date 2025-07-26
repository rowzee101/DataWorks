// 'use client';

// import React, { useState } from 'react';
// import { AddAsset , EditAsset, DeleteAsset} from '@/app/ui/invoices/buttons';
// import { DownloadPDFButton } from '@/app/ui/clientSided/buttons';
// import { useManualDebounce } from '@/app/lib/manualDebounce';
// import type { Asset , ProductType , SupplierManufacturer , Assettype} from '@/app/lib/definitions'; 


// interface AssetsTableProps {
//   assets: Asset[];
//   productTypes: ProductType[];
//   supplierNmanufacturer: SupplierManufacturer[];
//   Assettype: Assettype[];
// }

// export default function AssetsTable({ assets , productTypes , supplierNmanufacturer, Assettype}: AssetsTableProps) {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [debouncedSearch, setDebouncedSearch] = useState('');

//   const productTypeMap = new Map(productTypes.map(pt => [pt.id, pt.name]));
//   const supplierMap = new Map(supplierNmanufacturer.map(s => [s.id, s.name]));
//   const assetTypeMap = new Map(Assettype.map(at => [at.id, at.name]));

//   // Debounce the search input by 300ms
//   const handleSearch = useManualDebounce((value: string) => {
//     setDebouncedSearch(value);
//   }, 300);

//   const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setSearchTerm(value);
//     handleSearch(value);
//   };

//   const filteredAssets = assets.filter((asset) => {
//     const term = debouncedSearch.toLowerCase(); // Use debounced input!

//     return (
//       (asset.asset_number || '').toLowerCase().includes(term) ||
//       (asset.manufacturer_number || '').toLowerCase().includes(term) ||
//       (asset.asset_barnumber || '').toLowerCase().includes(term) ||
//       (asset.note || '').toLowerCase().includes(term) ||
//       (new Date(asset.purchase_date).toLocaleDateString('en-GB').toLowerCase()).includes(term) ||
//       (asset.last_service_date
//         ? new Date(asset.last_service_date).toLocaleDateString('en-GB').toLowerCase()
//         : ''
//       ).includes(term) ||
//       (asset.service_due_date
//         ? new Date(asset.service_due_date).toLocaleDateString('en-GB').toLowerCase()
//         : ''
//       ).includes(term) ||
//       (asset.decommission_date
//         ? new Date(asset.decommission_date).toLocaleDateString('en-GB').toLowerCase()
//         : ''
//       ).includes(term) ||
//       (productTypeMap.get(asset.product_type_id)?.toLowerCase() || '').includes(term) ||
//       (assetTypeMap.get(asset.asset_type_id || 0)?.toLowerCase() || '').includes(term) ||
//       (supplierMap.get(asset.manufacturer_id || 0)?.toLowerCase() || '').includes(term) ||
//       (supplierMap.get(asset.supplier_id || 0)?.toLowerCase() || '').includes(term)
//     );
//   });



//   return (
//     <div className="mt-6 flow-root">
//       <div className="flex items-center gap-2 mb-4">
//         <input
//           type="text"
//           placeholder="Search assets..."
//           value={searchTerm}
//           onChange={onSearchChange}
//           className="p-2 border rounded flex-1 w-full"
//         />
//         <AddAsset />

//         {/* Download Button */}
//         <DownloadPDFButton clientName={'Assets Table'} />
//       </div>
//       <div className="w-full overflow-x-auto" id="pdf-content">
//         <div className="inline-block min-w-full align-middle">
//           <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
//             {/* Responsive (mobile) layout could be added here if needed */}
//             <div className="md:hidden">
//               {filteredAssets.map((asset) => (
//                 <div
//                   key={asset.id}
//                   className="mb-2 w-full rounded-md bg-white p-4 shadow"
//                 >
//                   <div className="mb-2">
//                     <p className="text-sm text-gray-500">Asset Number</p>
//                     <p className="font-medium">{asset.asset_number}</p>
//                   </div>
//                   {/* Displaying asset bar-code, product type, and other details 
//                   <div className="mb-2">
//                     <p className="text-sm text-gray-500">Asset Bar-code</p>
//                     <p>{asset.asset_barnumber}</p>
//                   </div>*/}
//                   <div className="mb-2">
//                     <p className="text-sm text-gray-500">Type</p>
//                     <p>{asset.asset_type_id !== null ? (assetTypeMap.get(asset.asset_type_id) || '-') : '-'}</p>
//                   </div>
//                   <div className="mb-2">
//                     <p className="text-sm text-gray-500">Model</p>
//                     <p>{productTypeMap.get(asset.product_type_id) || '-'}</p>
//                   </div>
//                   <div className="mb-2">
//                     <p className="text-sm text-gray-500">Serial Number</p>
//                     <p>{asset.manufacturer_number}</p>
//                   </div>
//                   <div className="mb-2">
//                     <p className="text-sm text-gray-500">Manufacturer</p>
//                     <p>{asset.manufacturer_id !== null ? (supplierMap.get(asset.manufacturer_id) || '-') : '-'}</p>
//                   </div>
//                   <div className="mb-2">
//                     <p className="text-sm text-gray-500">Supplier</p>
//                     <p>{asset.supplier_id !== null ? (supplierMap.get(asset.supplier_id) || '-') : '-'}</p>
//                   </div>
//                   <div className="mb-2">
//                     <p className="text-sm text-gray-500">Purchase Date</p>
//                     <p>{new Date(asset.purchase_date).toLocaleDateString('en-GB')}</p>
//                   </div>
//                   <div className="mb-2">
//                     <p className="text-sm text-gray-500">Last Service Date</p>
//                     <p>{asset.last_service_date ? new Date(asset.last_service_date).toLocaleDateString('en-GB') : '-'}</p>
//                   </div>
//                   <div className="mb-2">
//                     <p className="text-sm text-gray-500">Service Due Date</p>
//                     <p>{asset.service_due_date ? new Date(asset.service_due_date).toLocaleDateString('en-GB') : '-'}</p>
//                   </div>
//                   <div className="mb-2">
//                     <p className="text-sm text-gray-500">Decommission Date</p>
//                     <p>{asset.decommission_date ? new Date(asset.decommission_date).toLocaleDateString('en-GB') : '-'}</p>
//                   </div>
//                   <div className="mb-2">
//                     <p className="text-sm text-gray-500">Note</p>
//                     <p>{asset.note || '-'}</p>
//                   </div>
//                   <div className="flex justify-end gap-2">
//                     <EditAsset id={asset.id.toString()} />
//                     <DeleteAsset id={asset.id.toString()} />
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <table className="hidden min-w-full text-gray-900 md:table">
//               <thead className="rounded-lg text-left text-sm font-normal">
//                 <tr>
//                   <th className="px-4 py-5 font-medium sm:pl-6">Asset Number</th>
//                   {/* <th className="px-3 py-5 font-medium">Asset Bar-code</th>*/}
//                   <th className="px-3 py-5 font-medium">Type</th>
//                   <th className="px-3 py-5 font-medium">Model</th> 
//                   <th className="px-3 py-5 font-medium">Serial Number</th>
//                   <th className="px-3 py-5 font-medium">Manufacturer</th>
//                   <th className="px-3 py-5 font-medium">Supplier</th>
//                   <th className="px-3 py-5 font-medium">Purchase Date</th>
//                   <th className="px-3 py-5 font-medium">Last Service Date</th>
//                   <th className="px-3 py-5 font-medium">Service Due Date</th>
//                   <th className="px-3 py-5 font-medium">Decommission Date</th>
//                   <th className="px-3 py-5 font-medium">Note</th>
//                   <th className="py-3 pl-6 pr-3 text-right">
//                     <span className="sr-only">Edit</span>
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white text-sm">
//                 {filteredAssets.length > 0 ? (
//                   filteredAssets.map((asset, idx) => (
//                     <tr
//                       key={asset.id}
//                       className="w-full border-b py-3 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
//                     >
//                       <td className="whitespace-nowrap py-3 pl-6 pr-3">
//                         {asset.asset_number}
//                       </td>
//                       {/*<td className="whitespace-nowrap px-3 py-3">
//                         {asset.asset_barnumber}
//                       </td>*/}
//                       <td className="whitespace-nowrap px-3 py-3">
//                         {asset.asset_type_id !== null ? (assetTypeMap.get(asset.asset_type_id) || '-') : '-'}
//                       </td>
//                       <td className="whitespace-nowrap px-3 py-3">
//                         {productTypeMap.get(asset.product_type_id) || 'Unknown'}
//                       </td>
//                       <td className="whitespace-nowrap px-3 py-3">
//                         {asset.manufacturer_number}
//                       </td>
//                       <td className="whitespace-nowrap px-3 py-3">
//                         {asset.manufacturer_id !== null ? (supplierMap.get(asset.manufacturer_id) || '-') : '-'}
//                       </td>
//                       <td className="whitespace-nowrap px-3 py-3">
//                         {asset.supplier_id !== null ? (supplierMap.get(asset.supplier_id) || '-') : '-'}
//                       </td>
//                       <td className="whitespace-nowrap px-3 py-3">
//                         {new Date(asset.purchase_date).toLocaleDateString('en-GB')}
//                       </td>
//                       <td className="whitespace-nowrap px-3 py-3">
//                         {asset.last_service_date
//                           ? new Date(asset.last_service_date).toLocaleDateString('en-GB')
//                           : '-'}
//                       </td>
//                       <td className="whitespace-nowrap px-3 py-3">
//                         {asset.service_due_date
//                           ? new Date(asset.service_due_date).toLocaleDateString('en-GB')
//                           : '-'}
//                       </td>
//                       <td className="whitespace-nowrap px-3 py-3">
//                         {asset.decommission_date
//                           ? new Date(asset.decommission_date).toLocaleDateString('en-GB')
//                           : '-'}
//                       </td>
//                       <td className="whitespace-nowrap px-3 py-3">
//                         {asset.note || '-'}
//                       </td>
//                       <td className="whitespace-nowrap py-3 pl-6 pr-3">
//                         <div className="flex justify-end gap-2">
//                           <EditAsset id={asset.id.toString()} />
//                           <DeleteAsset id={asset.id.toString()} />
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td
//                       colSpan={7}
//                       className="text-center p-4 text-sm text-gray-500"
//                     >
//                       No assets found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import React, { useState } from 'react';
import { AddAsset, EditAsset, DeleteAsset } from '@/app/ui/invoices/buttons';
import { DownloadPDFButton } from '@/app/ui/clientSided/buttons';
import { useManualDebounce } from '@/app/lib/manualDebounce';
import type { Asset, ProductType, SupplierManufacturer, Assettype } from '@/app/lib/definitions';

interface AssetsTableProps {
  assets: Asset[];
  productTypes: ProductType[];
  supplierNmanufacturer: SupplierManufacturer[];
  Assettype: Assettype[];
}

export default function AssetsTable({ assets, productTypes, supplierNmanufacturer, Assettype }: AssetsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [sortKey, setSortKey] = useState<keyof Asset | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const productTypeMap = new Map(productTypes.map(pt => [pt.id, pt.name]));
  const supplierMap = new Map(supplierNmanufacturer.map(s => [s.id, s.name]));
  const assetTypeMap = new Map(Assettype.map(at => [at.id, at.name]));

  const handleSearch = useManualDebounce((value: string) => {
    setDebouncedSearch(value);
  }, 300);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  const handleSort = (key: keyof Asset) => {
    if (sortKey === key) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const filteredAssets = assets.filter(asset => {
    const term = debouncedSearch.toLowerCase();

    return (
      (asset.asset_number || '').toLowerCase().includes(term) ||
      (asset.manufacturer_number || '').toLowerCase().includes(term) ||
      (asset.asset_barnumber || '').toLowerCase().includes(term) ||
      (asset.note || '').toLowerCase().includes(term) ||
      new Date(asset.purchase_date).toLocaleDateString('en-GB').toLowerCase().includes(term) ||
      (asset.last_service_date ? new Date(asset.last_service_date).toLocaleDateString('en-GB').toLowerCase() : '').includes(term) ||
      (asset.service_due_date ? new Date(asset.service_due_date).toLocaleDateString('en-GB').toLowerCase() : '').includes(term) ||
      (asset.decommission_date ? new Date(asset.decommission_date).toLocaleDateString('en-GB').toLowerCase() : '').includes(term) ||
      (productTypeMap.get(asset.product_type_id)?.toLowerCase() || '').includes(term) ||
      (assetTypeMap.get(asset.asset_type_id || 0)?.toLowerCase() || '').includes(term) ||
      (supplierMap.get(asset.manufacturer_id || 0)?.toLowerCase() || '').includes(term) ||
      (supplierMap.get(asset.supplier_id || 0)?.toLowerCase() || '').includes(term)
    );
  });

  const sortedAssets = [...filteredAssets].sort((a, b) => {
    if (!sortKey) return 0;

    const aValue = a[sortKey];
    const bValue = b[sortKey];

    if (aValue == null) return 1;
    if (bValue == null) return -1;

    // Always convert to Date for date fields
    if (
      sortKey === 'purchase_date' ||
      sortKey === 'last_service_date' ||
      sortKey === 'service_due_date' ||
      sortKey === 'decommission_date'
    ) {
      const aDate = aValue ? new Date(aValue as string).getTime() : 0;
      const bDate = bValue ? new Date(bValue as string).getTime() : 0;
      return sortDirection === 'asc' ? aDate - bDate : bDate - aDate;
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }

    const aStr = aValue.toString().toLowerCase();
    const bStr = bValue.toString().toLowerCase();
    return sortDirection === 'asc'
      ? aStr.localeCompare(bStr)
      : bStr.localeCompare(aStr);
  });

  return (
    <div className="mt-6 flow-root">
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Search assets..."
          value={searchTerm}
          onChange={onSearchChange}
          className="p-2 border rounded flex-1 w-full"
        />
        <AddAsset />
        <DownloadPDFButton clientName={'Assets Table'} />
      </div>
      <div className="w-full overflow-x-auto" id="pdf-content">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            <table className="min-w-full text-gray-900 text-sm hidden md:table">
              <thead className="rounded-lg text-left font-normal">
                <tr>
                  <th className="px-4 py-5 font-medium cursor-pointer" onClick={() => handleSort('asset_number')}>
                    Asset Number {sortKey === 'asset_number' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
                  </th>
                  <th className="px-3 py-5 font-medium cursor-pointer" onClick={() => handleSort('asset_type_id')}>
                    Type {sortKey === 'asset_type_id' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
                  </th>
                  <th className="px-3 py-5 font-medium cursor-pointer" onClick={() => handleSort('product_type_id')}>
                    Model {sortKey === 'product_type_id' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
                  </th>
                  <th className="px-3 py-5 font-medium cursor-pointer" onClick={() => handleSort('manufacturer_number')}>
                    Serial Number {sortKey === 'manufacturer_number' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
                  </th>
                  <th className="px-3 py-5 font-medium cursor-pointer" onClick={() => handleSort('manufacturer_id')}>
                    Manufacturer {sortKey === 'manufacturer_id' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
                  </th>
                  <th className="px-3 py-5 font-medium cursor-pointer" onClick={() => handleSort('supplier_id')}>
                    Supplier {sortKey === 'supplier_id' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
                  </th>
                  <th className="px-3 py-5 font-medium cursor-pointer" onClick={() => handleSort('purchase_date')}>
                    Purchase Date {sortKey === 'purchase_date' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
                  </th>
                  <th className="px-3 py-5 font-medium cursor-pointer" onClick={() => handleSort('last_service_date')}>
                    Last Service Date {sortKey === 'last_service_date' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
                  </th>
                  <th className="px-3 py-5 font-medium cursor-pointer" onClick={() => handleSort('service_due_date')}>
                    Service Due Date {sortKey === 'service_due_date' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
                  </th>
                  <th className="px-3 py-5 font-medium cursor-pointer" onClick={() => handleSort('decommission_date')}>
                    Decommission Date {sortKey === 'decommission_date' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
                  </th>
                  <th className="px-3 py-5 font-medium">Note</th>
                  <th className="py-3 pl-6 pr-3 text-right">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {sortedAssets.length > 0 ? (
                  sortedAssets.map(asset => (
                    <tr key={asset.id} className="border-b last:border-none">
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">{asset.asset_number}</td>
                      <td className="whitespace-nowrap px-3 py-3">{asset.asset_type_id !== null ? assetTypeMap.get(asset.asset_type_id) || '-' : '-'}</td>
                      <td className="whitespace-nowrap px-3 py-3">{productTypeMap.get(asset.product_type_id) || '-'}</td>
                      <td className="whitespace-nowrap px-3 py-3">{asset.manufacturer_number}</td>
                      <td className="whitespace-nowrap px-3 py-3">{asset.manufacturer_id !== null ? supplierMap.get(asset.manufacturer_id) || '-' : '-'}</td>
                      <td className="whitespace-nowrap px-3 py-3">{asset.supplier_id !== null ? supplierMap.get(asset.supplier_id) || '-' : '-'}</td>
                      <td className="whitespace-nowrap px-3 py-3">{new Date(asset.purchase_date).toLocaleDateString('en-GB')}</td>
                      <td className="whitespace-nowrap px-3 py-3">{asset.last_service_date ? new Date(asset.last_service_date).toLocaleDateString('en-GB') : '-'}</td>
                      <td className="whitespace-nowrap px-3 py-3">{asset.service_due_date ? new Date(asset.service_due_date).toLocaleDateString('en-GB') : '-'}</td>
                      <td className="whitespace-nowrap px-3 py-3">{asset.decommission_date ? new Date(asset.decommission_date).toLocaleDateString('en-GB') : '-'}</td>
                      <td className="whitespace-nowrap px-3 py-3">{asset.note || '-'}</td>
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex justify-end gap-2">
                          <EditAsset id={asset.id.toString()} />
                          <DeleteAsset id={asset.id.toString()} />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={12} className="text-center p-4 text-sm text-gray-500">
                      No assets found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
