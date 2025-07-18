import { Metadata } from 'next';
import { fetchAssetsExceptClientID, fetchProductType , getAssetsByClientId , fetchSupplierManufacturer , fetchProductTypeByID, fetchAssetTypes} from '@/app/lib/data';
import  {Tabs}  from '@/app/ui/assets/tab';

// export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Assets',
};

export default async function AssetsPage( params: any) {
  const assets = await fetchAssetsExceptClientID(1);
  const productTypes = await fetchProductType();
  const myAssets = await getAssetsByClientId(1);
  const supplierManufacturer = await fetchSupplierManufacturer();
  const assetTypes = await fetchAssetTypes();
  return (
    <div className="p-6 block border rounded-xl bg-[#FFFFFF]">
      <div className="pt-6 text-sm text-gray-700">
        {/* <TabsWrapper assets={assets} productTypes={productTypes} Myassets={myAssets} clientId={0} /> */}
        <Tabs assets={assets} productTypes={productTypes} Myassets={myAssets} SupplierManufacturer={supplierManufacturer} Assettype={assetTypes} />
      </div>
    </div>
  );
}