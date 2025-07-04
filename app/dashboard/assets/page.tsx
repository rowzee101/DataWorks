import { Metadata } from 'next';
import { fetchAssetsExceptID, fetchProductType , getAssetsByClientId } from '@/app/lib/data';
import { Tabs } from '@/app/ui/assets/tab';

export const metadata: Metadata = {
  title: 'Assets',
};

export default async function Page() {
  const assets = await fetchAssetsExceptID('1');
  const productTypes = await fetchProductType();
  const myAssets = await getAssetsByClientId(1); // Assuming 1 is the client ID for "My Assets"
  return (
    <div className="p-6 block border rounded-xl bg-[#FFFFFF]">
      <div className="pt-6 text-sm text-gray-700">
        <Tabs assets={assets} clientId={0} productTypes = {productTypes} Myassets={myAssets}/>
      </div>
    </div>
  );
}