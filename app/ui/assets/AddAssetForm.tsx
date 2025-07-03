// 'use client';

// import { useForm, Controller } from 'react-hook-form';
// import Select from 'react-select';
// import { useState } from 'react';

// type Option = {
//   value: number;
//   label: string;
// };

// type AddAssetFormProps = {
//   clients: Option[];
//   productTypes: Option[];
//   suppliers: Option[];
// };

// type FormValues = {
//   asset_number: string;
//   asset_barnumber: string;
//   manufacturer_number: string;
//   note: string;
//   purchase_date: string;
//   last_service_date: string;
//   client_id: Option | null;
//   product_type_id: Option | null;
//   supplier_id: Option | null;
// };

// export function AddAssetForm({
//   clients,
//   productTypes,
//   suppliers,
// }: AddAssetFormProps) {
//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm<FormValues>();

//   const [submitting, setSubmitting] = useState(false);

//   const onSubmit = async (data: FormValues) => {
//     setSubmitting(true);

//     // Convert selected options to ID values
//     const payload = {
//       ...data,
//       client_id: data.client_id?.value,
//       product_type_id: data.product_type_id?.value,
//       supplier_id: data.supplier_id?.value,
//     };

//     // TODO: Replace with real API or server action
//     console.log('Submitting asset:', payload);

//     setSubmitting(false);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
//       <div>
//         <label>Asset Number</label>
//         <input
//           {...register('asset_number', { required: true })}
//           className="input"
//         />
//         {errors.asset_number && <p className="text-red-600">Required</p>}
//       </div>

//       <div>
//         <label>Asset Barcode</label>
//         <input {...register('asset_barnumber')} className="input" />
//       </div>

//       <div>
//         <label>Manufacturer Number</label>
//         <input
//           {...register('manufacturer_number', { required: true })}
//           className="input"
//         />
//         {errors.manufacturer_number && (
//           <p className="text-red-600">Required</p>
//         )}
//       </div>

//       <div>
//         <label>Purchase Date</label>
//         <input type="date" {...register('purchase_date')} className="input" />
//       </div>

//       <div>
//         <label>Last Service Date</label>
//         <input type="date" {...register('last_service_date')} className="input" />
//       </div>

//       <div>
//         <label>Note</label>
//         <textarea {...register('note')} className="input" />
//       </div>

//       <div>
//         <label>Client</label>
//         <Controller
//           name="client_id"
//           control={control}
//           render={({ field }) => (
//             <Select {...field} options={clients} isClearable />
//           )}
//         />
//       </div>

//       <div>
//         <label>Product Type</label>
//         <Controller
//           name="product_type_id"
//           control={control}
//           render={({ field }) => (
//             <Select {...field} options={productTypes} isClearable />
//           )}
//         />
//       </div>

//       <div>
//         <label>Supplier</label>
//         <Controller
//           name="supplier_id"
//           control={control}
//           render={({ field }) => (
//             <Select {...field} options={suppliers} isClearable />
//           )}
//         />
//       </div>

//       <button
//         type="submit"
//         disabled={submitting}
//         className="bg-blue-600 text-white px-4 py-2 rounded"
//       >
//         {submitting ? 'Submitting...' : 'Add Asset'}
//       </button>
//     </form>
//   );
// }


'use client';

import { useState } from 'react';
import Select from 'react-select';
import { addNewAsset } from '@/app/lib/actions'; // Adjust path as needed

type Option = {
  value: number;
  label: string;
};

type AddAssetFormProps = {
  clients: Option[];
  productTypes: Option[];
  suppliers: Option[];
};

export function AddAssetForm({
  clients,
  productTypes,
  suppliers,
}: AddAssetFormProps) {
  const [client, setClient] = useState<Option | null>(null);
  const [productType, setProductType] = useState<Option | null>(null);
  const [supplier, setSupplier] = useState<Option | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await addNewAsset(formData);
    // Optionally handle response/errors here
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      <div>
        <label>Asset Number</label>
        <input name="asset_number" required className="input" />
      </div>

      <div>
        <label>Asset Barcode</label>
        <input name="asset_barnumber" className="input" />
      </div>

      <div>
        <label>Manufacturer Number</label>
        <input name="manufacturer_number" required className="input" />
      </div>

      <div>
        <label>Purchase Date</label>
        <input type="date" name="purchase_date" className="input" />
      </div>

      <div>
        <label>Last Service Date</label>
        <input type="date" name="last_service_date" className="input" />
      </div>

      <div>
        <label>Note</label>
        <textarea name="note" className="input" />
      </div>

      <div>
        <label>Client</label>
        <Select
          options={clients}
          isClearable
          value={client}
          onChange={(opt) => setClient(opt)}
        />
        <input type="hidden" name="client_id" value={client?.value ?? ''} />
      </div>

      <div>
        <label>Product Type</label>
        <Select
          options={productTypes}
          isClearable
          value={productType}
          onChange={(opt) => setProductType(opt)}
        />
        <input type="hidden" name="product_type_id" value={productType?.value ?? ''} />
      </div>

      <div>
        <label>Supplier</label>
        <Select
          options={suppliers}
          isClearable
          value={supplier}
          onChange={(opt) => setSupplier(opt)}
        />
        <input type="hidden" name="supplier_id" value={supplier?.value ?? ''} />
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded col-span-2">
        Add Asset
      </button>
    </form>
  );
}
