import { Metadata } from 'next';
import { fetchAssetsExceptID, fetchProductType , getAssetsByClientId } from '@/app/lib/data';
import dynamic from 'next/dynamic';
const Tabs = dynamic(() => import('@/app/ui/assets/tab'), { ssr: false });

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
        <Tabs assets={assets} productTypes = {productTypes} Myassets={myAssets}/>
      </div>
    </div>
  );
}