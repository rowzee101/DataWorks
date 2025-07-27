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

const ITEMS_PER_PAGE = 10;

export default function AssetPrintView({ assets, productTypes , supplierNmanufacturer, Assettype, clientName }: Props) {
  const pages = Math.ceil(assets.length / ITEMS_PER_PAGE);
  const chunked = Array.from({ length: pages }, (_, i) =>
    assets.slice(i * ITEMS_PER_PAGE, (i + 1) * ITEMS_PER_PAGE)
  );

  
  const productTypeMap = new Map(productTypes.map(pt => [pt.id, pt.name]));
  const supplierMap = new Map(supplierNmanufacturer.map(s => [s.id, s.name]));
  const assetTypeMap = new Map(Assettype.map(at => [at.id, at.name]));

  return (
    <div className="print-view">
      {chunked.map((chunk, idx) => (
        <div key={idx} className="page-break-after">
          {/* Header */}
          <div className="text-center border-b pb-2 mb-4">
            <PACBioLogo />
            <h1 className="text-xl font-bold">Pacific Med</h1>
            <h2 className="text-lg font-medium">{clientName} Asset Report</h2>
            <p className="text-sm text-gray-500">
              Generated on {new Date().toLocaleDateString('en-GB')}
            </p>
          </div>

          {/* Table */}
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-t border-b bg-gray-100">
                <th className="py-1 px-2 text-left">#</th>
                <th className="py-1 px-2 text-left">Asset Name</th>
                <th className="py-1 px-2 text-left">Asset Type</th>
                <th className="py-1 px-2 text-left">Purchase Date</th>
                <th className="py-1 px-2 text-left">Status</th>
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

          {/* Footer */}
          <div className="mt-4 text-xs text-center text-gray-400">
            Page {idx + 1} of {pages}
          </div>
        </div>
      ))}
    </div>
  );
}
