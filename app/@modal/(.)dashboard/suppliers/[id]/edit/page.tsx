
import { Modal } from '@/app/ui/components/Modal';
import { EditSupplierForm } from '@/app/ui/suppliers&manufacturers/EditSupplierForm';
import countries from 'i18n-iso-countries';
import en from 'i18n-iso-countries/langs/en.json';

import {
  fetchSupplierManufacturer,
  fetchSupplierByID,
} from '@/app/lib/data';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editing Asset',
};


const countryOptions = Object.entries(countries.getNames('en')).map(([code, name]) => ({
  value: name,
  label: name,
}));

type PageProps = {
  params: { id: string };
};

export default async function EditAssetModal(props: any) {
  const { params } = await props;

  const supplierRowList = await fetchSupplierByID(Number(params.id));

  if (!supplierRowList) {
    return <div>supplier or manufacturer not found.</div>;
  }

    // Manually map Row -> AssetData
    const product_converted = {
        id: supplierRowList.id,
        name: supplierRowList.name,
        website: supplierRowList.website,
        main_number: supplierRowList.main_number,
        country: supplierRowList.country,
        brief: supplierRowList.brief,
    };

  const [suppliers] = await Promise.all([
    fetchSupplierManufacturer(),
  ]);

  const toOption = (items: { id: number; name: string }[]) =>
    items.map((i) => ({ value: i.id, label: i.name }));

  return (
    <Modal>
      <EditSupplierForm
        initialData={product_converted}
        countryOptions={countryOptions} 
      />
    </Modal>
  );
}
