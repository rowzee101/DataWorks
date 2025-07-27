// components/AssetPrintView.tsx

import { Asset, ProductType , SupplierManufacturer , Assettype } from '@/app/lib/definitions'; // adjust path as needed
import PACBioLogo from '@/app/ui/PacificBiomedicalLightLogo';


type Props = {
  assets: Asset[];
  clientName: string;
    productTypes: ProductType[];
    supplierNmanufacturer: SupplierManufacturer[];
    Assettype: Assettype[];
};

const ITEMS_PER_PAGE = 20;

export default function AssetPrintView({ assets, productTypes , supplierNmanufacturer, Assettype, clientName }: Props) {
  const pages = Math.ceil(assets.length / ITEMS_PER_PAGE);
  const chunked = Array.from({ length: pages }, (_, i) =>
    assets.slice(i * ITEMS_PER_PAGE, (i + 1) * ITEMS_PER_PAGE)
  );

  
  const productTypeMap = new Map(productTypes.map(pt => [pt.id, pt.name]));
  const supplierMap = new Map(supplierNmanufacturer.map(s => [s.id, s.name]));
  const assetTypeMap = new Map(Assettype.map(at => [at.id, at.name]));

  return ( 
    <div className="print-view justify-center-safe p-8 m-8">
      {chunked.map((chunk, idx) => (
        <div key={idx} className="page-break-after">
          {/* Header */}
          <div className="text-center items-center border-b pb-2 mb-4">
            <PACBioLogo width={408} height={120}/>
            <h1 className="text-xl font-bold">Pacific Biomedical & Consulting Services Pty Ltd</h1>
            <h2 className="text-lg font-medium">{clientName} Asset Report</h2>
            <p className="text-sm text-gray-500">
              As of: {new Date().toLocaleDateString('en-GB')}
            </p>
          </div>
          <div className="overflow-x-auto">
            {/* Table */}
            <table className="min-w-full text-sm border-collapse">
                <thead>
                <tr className="border-t border-b bg-gray-100">
                    <th className="py-1 px-2 text-left">#</th>
                    <th className="py-1 px-2 text-left">Asset Name</th>
                    <th className="py-1 px-2 text-left">Asset Type</th>
                    <th className="py-1 px-2 text-left">Model</th>
                    <th className="py-1 px-2 text-left">Serial Number</th>
                    <th className="py-1 px-2 text-left">Supplier</th>
                    <th className="py-1 px-2 text-left">Purchase Date</th>
                    <th className="py-1 px-2 text-left">Last Service Date</th>
                    <th className="py-1 px-2 text-left">Decommission Date</th>

                </tr>
                </thead>
                <tbody>
                {chunk.map((asset, i) => (
                    <tr key={asset.id} className="border-b">
                    <td className="px-2 py-1">{idx * ITEMS_PER_PAGE + i + 1}</td>
                    <td className="px-2 py-1">{asset.asset_number}</td>
                    <td className="px-2 py-1">{asset.asset_type_id !== null ? (assetTypeMap.get(asset.asset_type_id) || '-') : '-'}</td>
                    <td className="px-2 py-1">{asset.product_type_id !== null ? (productTypeMap.get(asset.product_type_id) || '-') : '-'}</td>
                    <td className="px-2 py-1">{asset.manufacturer_number}</td>
                    <td className="px-2 py-1">{asset.supplier_id !== null ? (supplierMap.get(asset.supplier_id) || '-') : '-'}</td>
                    <td className="px-2 py-1">{new Date(asset.purchase_date).toLocaleDateString('en-GB')}</td>
                    <td className="px-2 py-1">{asset.last_service_date ? new Date(asset.last_service_date).toLocaleDateString('en-GB') : '-'}</td>
                    <td className="px-2 py-1">{asset.decommission_date ? new Date(asset.decommission_date).toLocaleDateString('en-GB') : '-'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="mt-4 text-xs text-center text-gray-400">
            Page {idx + 1} of {pages}
          </div>
        </div>
      ))}
    </div>
  );
}
