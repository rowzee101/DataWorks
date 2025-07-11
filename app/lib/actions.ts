'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';  // update the cashe i.e. the invoices currently displayed
import { redirect } from 'next/navigation'; // redirect to the invoices page after creating an invoice
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
 
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than $0.' }),

  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});
 
const CreateInvoice = FormSchema.omit({ id: true, date: true });
export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
    
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    // We'll log the error to the console for now
    console.error(error);
  }

  revalidatePath('/dashboard/invoices'); // revalidate the path to update the invoices displayed
  redirect('/dashboard/invoices'); // redirect to the invoices page after creating an invoice
}



const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoice(id: string, prevState: State,  formData: FormData) {

    const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
    
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;
 
  const amountInCents = amount * 100;
 
  try {
    await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `;
  } catch (error) {
    // We'll log the error to the console for now
    console.error(error);
  }
 
  // Revalidate the path to update the invoices displayed
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath('/dashboard/invoices');
}


// Login and auentication actions
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}


 
const AssetFormSchema = z.object({
  asset_number: z.string({
    required_error: 'Asset number is required.',
  }),
  asset_barnumber: z.string().optional(),
  product_type_id: z.string({
    required_error: 'Please select a product type.',
  }),
  client_id: z.string({
    required_error: 'Please select a client.',
  }),
  manufacturer_number: z.string({
    required_error: 'Manufacturer number is required.',
  }),
  supplier_id: z.string().optional(), // optional because DB allows null
  purchase_date: z.string().optional(), // optional if you let DB default
  last_service_date: z.string().optional(), // optional since it's nullable
  note: z.string().optional(),
});

const AddNewAsset = AssetFormSchema;

export async function addNewAsset(formData: FormData) {
  const validatedFields = AddNewAsset.safeParse({
    asset_number: formData.get('asset_number')?.toString(),
    product_type_id: formData.get('product_type_id')?.toString(),
    manufacturer_number: formData.get('manufacturer_number')?.toString(),
    asset_barnumber: formData.get('asset_barnumber')?.toString(),
    purchase_date: formData.get('purchase_date')?.toString(),
    last_service_date: formData.get('last_service_date')?.toString(),
    note: formData.get('note')?.toString(),
    client_id: formData.get('client_id')?.toString(),
    supplier_id: formData.get('supplier_id')?.toString(),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Add Asset.',
    };
  }

  const {
    asset_number,
    product_type_id,
    manufacturer_number,
    asset_barnumber,
    purchase_date,
    last_service_date,
    note,
    client_id,
    supplier_id,
  } = validatedFields.data;

  try {
    await sql`
      INSERT INTO assets 
        (product_type_id, client_id, manufacturer_number, asset_number, supplier_id, purchase_date, last_service_date, note, asset_barnumber)
      VALUES
        (${Number(product_type_id)}, ${Number(client_id)}, ${manufacturer_number}, ${asset_number}, 
         ${supplier_id ? Number(supplier_id) : null}, 
         ${purchase_date ?? null}, ${last_service_date ?? null}, ${note ?? null}, ${asset_barnumber ?? null})
         ON CONFLICT (asset_number) DO NOTHING;
    `;
  } catch (error) {
    console.error(error);
    return { message: 'Failed to add asset due to database error.' };
  }

  revalidatePath('/dashboard/assets');
  revalidatePath('/dashboard/clients');
}

export async function updateAsset(id: string, formData: FormData) {
  const validatedFields = AddNewAsset.safeParse({
    asset_number: formData.get('asset_number')?.toString(),
    product_type_id: formData.get('product_type_id')?.toString(),
    manufacturer_number: formData.get('manufacturer_number')?.toString(),
    asset_barnumber: formData.get('asset_barnumber')?.toString(),
    purchase_date: formData.get('purchase_date')?.toString(),
    last_service_date: formData.get('last_service_date')?.toString(),
    note: formData.get('note')?.toString(),
    client_id: formData.get('client_id')?.toString(),
    supplier_id: formData.get('supplier_id')?.toString(),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Asset.',
    };
  }

  const {
    asset_number,
    product_type_id,
    manufacturer_number,
    asset_barnumber,
    purchase_date,
    last_service_date,
    note,
    client_id,
    supplier_id,
  } = validatedFields.data;

  try {
    await sql`
      UPDATE assets SET
        product_type_id = ${Number(product_type_id)},
        client_id = ${Number(client_id)},
        manufacturer_number = ${manufacturer_number},
        asset_number = ${asset_number},
        supplier_id = ${supplier_id ? Number(supplier_id) : null},
        purchase_date = ${purchase_date ?? null},
        last_service_date = ${last_service_date ?? null},
        note = ${note ?? null},
        asset_barnumber = ${asset_barnumber ?? null}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error(error);
    return { message: 'Failed to update asset due to database error.' };
  }

  revalidatePath('/dashboard/assets');
  revalidatePath('/dashboard/clients');
}

export async function deleteAssetByID(id: string) {
  await sql`DELETE FROM assets WHERE id = ${id}`;
  revalidatePath('/dashboard/assets');
  revalidatePath('/dashboard/clients');
}




const ClientFormSchema = z.object({
  name: z.string({ required_error: 'Client name is required.' }),
  website: z.string({ required_error: 'Website is required.' }),
  main_number: z.string({ required_error: 'Main number is required.' }),
  state: z.string({ required_error: 'State is required.' }),
  address: z.string({ required_error: 'Address is required.' }),
  country: z.string({ required_error: 'Country is required.' }),
  client_type: z.string({ required_error: 'Client type is required.' }),
  brief: z.string().optional(),
});

const AddNewClient = ClientFormSchema;

export async function addNewClient(formData: FormData) {
  const validatedFields = AddNewClient.safeParse({
    name: formData.get('name')?.toString(),
    website: formData.get('website')?.toString(),
    main_number: formData.get('main_number')?.toString(),
    state: formData.get('state')?.toString(),
    address: formData.get('address')?.toString(),
    country: formData.get('country')?.toString(),
    client_type: formData.get('client_type')?.toString(),
    brief: formData.get('brief')?.toString(),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to add client.',
    };
  }

  const {
    name,
    website,
    main_number,
    state,
    address,
    country,
    client_type,
    brief,
  } = validatedFields.data;

  try {
    await sql`
      INSERT INTO clients (name, website, main_number, state, address, country, client_type, created_at, brief)
      VALUES (
        ${name},
        ${website},
        ${main_number},
        ${state},
        ${address},
        ${country},
        ${Number(client_type)},
        NOW(),
        ${brief ?? null}
      )
        ON CONFLICT (name) DO NOTHING;
    `;
  } catch (error) {
    console.error(error);
    return { message: 'Failed to add client due to database error.' };
  }

  revalidatePath('/dashboard/clients');
  redirect('/dashboard/clients');
}


export async function updateClient(id: string, formData: FormData) {
  const validatedFields = AddNewClient.safeParse({
    name: formData.get('name')?.toString(),
    website: formData.get('website')?.toString(),
    main_number: formData.get('main_number')?.toString(),
    state: formData.get('state')?.toString(),
    address: formData.get('address')?.toString(),
    country: formData.get('country')?.toString(),
    client_type: formData.get('client_type')?.toString(),
    brief: formData.get('brief')?.toString(),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Asset.',
    };
  }


  const {
    name,
    website,
    main_number,
    state,
    address,
    country,
    client_type,
    brief,
  } = validatedFields.data;

  try {
  await sql`
    UPDATE clients SET
      name = ${name},
      website = ${website},
      main_number = ${main_number},
      state = ${state},
      address = ${address},
      country = ${country},
      client_type = ${Number(client_type)},
      brief = ${brief ?? null}
    WHERE id = ${id}
  `;
  } catch (error) {
    console.error(error);
    return { message: 'Failed to update asset due to database error.' };
  }

  revalidatePath('/dashboard/clients');
  redirect('/dashboard/clients');
}

export async function deleteClientByID(id: string) {
  await sql`DELETE FROM clients WHERE id = ${id}`;
  revalidatePath('/dashboard/clients');
}



///////////// Product Type Actions //////////////
const ProductTypeFormSchema = z.object({
  name: z.string({
    required_error: 'Product type name is required.',
  }),
  supplier1_id: z.string({
    required_error: 'Supplier 1 is required.',
  }),
  supplier2_id: z.string().optional(), // optional due to DB
  manufacturer_id: z.string({
    required_error: 'Manufacturer is required.',
  }),
  price: z.string().optional(), // optional, will parse to int or null
});

const AddNewProductType = ProductTypeFormSchema;

export async function addNewProductType(formData: FormData) {
  const validatedFields = AddNewProductType.safeParse({
    name: formData.get('name')?.toString(),
    supplier1_id: formData.get('supplier1_id')?.toString(),
    supplier2_id: formData.get('supplier2_id')?.toString(),
    manufacturer_id: formData.get('manufacturer_id')?.toString(),
    price: formData.get('price')?.toString(),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Add Product Type.',
    };
  }

  const {
    name,
    supplier1_id,
    supplier2_id,
    manufacturer_id,
    price,
  } = validatedFields.data;

  try {
    await sql`
      INSERT INTO product_types
        (name, supplier1_id, supplier2_id, manufacturer_id, price)
      VALUES
        (
          ${name},
          ${Number(supplier1_id)},
          ${supplier2_id ? Number(supplier2_id) : null},
          ${Number(manufacturer_id)},
          ${price ? Number(price) : null}
        )
          ON CONFLICT (name) DO NOTHING;
    `;
  } catch (error) {
    console.error(error);
    return { message: 'Failed to add product type due to database error.' };
  }

  revalidatePath('/dashboard/assets');
  revalidatePath('/dashboard/suppliers&manufacturers');
}

export async function updateProductType(id: string, formData: FormData) {
  const validatedFields = AddNewProductType.safeParse({
    name: formData.get('name')?.toString(),
    supplier1_id: formData.get('supplier1_id')?.toString(),
    supplier2_id: formData.get('supplier2_id')?.toString(),
    manufacturer_id: formData.get('manufacturer_id')?.toString(),
    price: formData.get('price')?.toString(),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Product Type.',
    };
  }

  const {
    name,
    supplier1_id,
    supplier2_id,
    manufacturer_id,
    price,
  } = validatedFields.data;

  try {
    await sql`
      UPDATE product_types SET
        name = ${name},
        supplier1_id = ${Number(supplier1_id)},
        supplier2_id = ${supplier2_id ? Number(supplier2_id) : null},
        manufacturer_id = ${Number(manufacturer_id)},
        price = ${price ? Number(price) : null}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error(error);
    return { message: 'Failed to update product type due to database error.' };
  }

  revalidatePath('/dashboard/assets');
  revalidatePath('/dashboard/suppliers&manufacturers');
}

export async function deleteProductTypeByID(id: string) {
  await sql`DELETE FROM product_types WHERE id = ${id}`;
  revalidatePath('/dashboard/assets');
  revalidatePath('/dashboard/suppliers&manufacturers');
}


// Schema for validating Supplier form data
const SupplierFormSchema = z.object({
  name: z.string({ required_error: 'Supplier name is required.' }),
  website: z.string({ required_error: 'Website is required.' }).url('Must be a valid URL'),
  main_number: z.string().optional(), // Optional field
  country: z.string({ required_error: 'Country is required.' }),
  brief: z.string().optional(), // Optional text area
});

const AddNewSupplier = SupplierFormSchema;

// Create Supplier
export async function addNewSupplier(formData: FormData) {
  const validatedFields = AddNewSupplier.safeParse({
    name: formData.get('name')?.toString(),
    website: formData.get('website')?.toString(),
    main_number: formData.get('main_number')?.toString(),
    country: formData.get('country')?.toString(),
    brief: formData.get('brief')?.toString(),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to add supplier.',
    };
  }

  const { name, website, main_number, country, brief } = validatedFields.data;

  try {
    await sql`
      INSERT INTO suppliers_manufacturers (name, website, main_number, country, brief)
      VALUES (${name}, ${website}, ${main_number ?? null}, ${country}, ${brief ?? null})
      ON CONFLICT (name) DO NOTHING;
    `;
  } catch (error) {
    console.error(error);
    return { message: 'Failed to add supplier due to database error.' };
  }

  revalidatePath('/dashboard/suppliers&manufacturers');
}

// Update Supplier
export async function updateSupplier(id: string, formData: FormData) {
  const validatedFields = AddNewSupplier.safeParse({
    name: formData.get('name')?.toString(),
    website: formData.get('website')?.toString(),
    main_number: formData.get('main_number')?.toString(),
    country: formData.get('country')?.toString(),
    brief: formData.get('brief')?.toString(),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to update supplier.',
    };
  }

  const { name, website, main_number, country, brief } = validatedFields.data;

  try {
    await sql`
      UPDATE suppliers_manufacturers SET
        name = ${name},
        website = ${website},
        main_number = ${main_number ?? null},
        country = ${country},
        brief = ${brief ?? null}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error(error);
    return { message: 'Failed to update supplier due to database error.' };
  }

  revalidatePath('/dashboard/suppliers&manufacturers');
}

// Delete Supplier
export async function deleteSupplierByID(id: string) {
  try {
    await sql`DELETE FROM suppliers_manufacturers WHERE id = ${id}`;
    revalidatePath('/dashboard/suppliers&manufacturers');
  } catch (error) {
    console.error(error);
    return { message: 'Failed to delete supplier.' };
  }
}