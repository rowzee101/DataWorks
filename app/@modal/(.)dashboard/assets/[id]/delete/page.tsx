// import { Modal } from '@/app/ui/components/Modal';
// import { getAssetById, fetchProductType } from '@/app/lib/data';
// import postgres from 'postgres';

// const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// export async function deleteAssetByIdInternal(id: number) {
//   try {
//     await sql`DELETE FROM assets WHERE id = ${id}`;
//   } catch (error) {
//     console.error('Failed to delete asset:', error);
//     throw new Error('Database delete failed');
//   }
// }

// type PageProps = {
//   params: { id: string };
// };

// export default async function DeleteAssetModal(props: PageProps) {
//   const { params } = props;

//   const assetRow = await getAssetById(Number(params.id));

//   if (!assetRow) {
//     return <div>Asset not found.</div>;
//   }

//   // Get the product type name from ID
//   const productTypes = await fetchProductType();
//   const productType = productTypes.find(
//     (pt) => pt.id === assetRow.product_type_id
//   );

//   const assetNumber = assetRow.asset_number;
//   const productTypeName = productType?.name || 'Unknown Type';

//   return (
//     <Modal>
//       <div className="p-6">
//         <h2 className="text-lg font-semibold mb-4">Delete Asset</h2>
//         <p className="mb-6">
//           Are you sure you want to delete asset <strong>{assetNumber}</strong>{' '}
//           ({productTypeName})?
//         </p>
//         <form method="POST" action={`/dashboard/assets/delete/${assetRow.id}`}>
//           <div className="flex justify-end gap-4">
//             <a
//               href="/dashboard/assets"
//               className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
//             >
//               Cancel
//             </a>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//             >
//                 <span className="sr-only">Delete</span>
//                 deleteAssetByIdInternal(assetRow.id);
//                 {/* This function will be called on form submission */}
//               Delete
//             </button>
//           </div>
//         </form>
//       </div>
//     </Modal>
//   );
// }


'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Modal } from '@/app/ui/components/Modal';
import { getAssetById, fetchProductType } from '@/app/lib/data';
import { deleteAssetByID } from '@/app/lib/actions';

type PageProps = {
  params: { id: string };
};

export default async function DeleteAssetModal(props: PageProps) {
  const { params } = props;

  const assetRow = await getAssetById(Number(params.id));
  const productTypes = await fetchProductType();

  if (!assetRow) return <div>Asset not found.</div>;

  const productType = productTypes.find(
    (pt) => pt.id === assetRow.product_type_id
  );

  const assetNumber = assetRow.asset_number;
  const productTypeName = productType?.name || 'Unknown Type';

  return (
    <Modal>
      <DeleteAssetClient assetId={assetRow.id} assetNumber={assetNumber} productTypeName={productTypeName} />
    </Modal>
  );
}

// 🧠 Client component for interactivity
function DeleteAssetClient({
  assetId,
  assetNumber,
  productTypeName,
}: {
  assetId: number;
  assetNumber: string;
  productTypeName: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      await deleteAssetByID(assetId.toString());
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">Delete Asset</h2>
      <p className="mb-6">
        Are you sure you want to delete asset <strong>{assetNumber}</strong> (
        {productTypeName})?
      </p>
      <div className="flex justify-end gap-4">
        <button
          onClick={() => router.push('/dashboard/assets')}
          className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
        >
          {isPending ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
}
