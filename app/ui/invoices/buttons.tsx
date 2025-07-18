import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

import { deleteInvoice } from '@/app/lib/actions';

export function CreateInvoice() {
  return (
    <Link
      href="/dashboard/invoices/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Invoice</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/invoices/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);
  return (
    <form action={deleteInvoiceWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}


/////////////////////////

export function AddAsset() {
  return (
    <Link
      href="/dashboard/assets/add"
      className="flex h-10 items-center rounded-lg bg-[#205B34] px-4 text-sm font-medium text-white transition-colors hover:bg-[#b4e4c5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Add Asset</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}


export function EditAsset({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/assets/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}


export function DeleteAsset({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/assets/${id}/delete`}
      className="rounded-md border p-2 hover:bg-[#872928] bg-[#c74543]"
    >
      <TrashIcon className="w-5" />
    </Link>
  );
}

export function UpdateClient({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/clients/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteClient({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/clients/${id}/delete`}
      className="rounded-md border p-2 hover:bg-[#872928] bg-[#c74543]"
    >
      <TrashIcon className="w-5" />
    </Link>
  );
}

export function AddProductType() {
  return (
    <Link
      href="/dashboard/assets/products/add"
      className="flex h-10 items-center rounded-lg bg-[#205B34] px-4 text-sm font-medium text-white transition-colors hover:bg-[#b4e4c5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Add New Product</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}   


export function AddAssetType() {
  return (
    <Link
      href="/dashboard/assets/types/add"
      className="flex h-10 items-center rounded-lg bg-[#205B34] px-4 text-sm font-medium text-white transition-colors hover:bg-[#b4e4c5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Add New Product Type</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}  

export function EditProductType({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/assets/products/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteProductType({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/assets/products/${id}/delete`}
      className="rounded-md border p-2 hover:bg-[#872928] bg-[#c74543]"
    >
      <TrashIcon className="w-5" />
    </Link>
  );
}


export function AddSupplier() {
  return (
    <Link
      href="/dashboard/suppliers&manufacturers/add"
      className="flex h-10 items-center rounded-lg bg-[#205B34] px-4 text-sm font-medium text-white transition-colors hover:bg-[#b4e4c5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Add New Supplier or Manufacturer</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}   

export function EditSupplier({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/suppliers&manufacturers/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteSupplier({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/suppliers&manufacturers/${id}/delete`}
      className="rounded-md border p-2 hover:bg-[#872928] bg-[#c74543]"
    >
      <TrashIcon className="w-5" />
    </Link>
  );
}