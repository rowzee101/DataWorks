// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};


export type Asset = {
  id: number;
  asset_barnumber: string;
  asset_type_id: number | null;
  product_type_id: number;
  client_id: number;
  manufacturer_number: string;
  asset_number: string;
  supplier_id: number | null;
  manufacturer_id: number | null;
  purchase_date: string;         // ISO timestamp
  last_service_date: string | null;
  service_due_date: string | null;
  note: string | null;
};


export type ClientType = {
  id: number;
  name: string;
};

export type Client = {
  id: number;
  name: string;
  website: string;
  main_number: string;
  state: string;
  address: string;
  country: string;
  client_type: number; // foreign key to ClientType
  created_at: string;  // ISO timestamp
  brief?: string;

};

export type SupplierManufacturer = {
  id: number;
  name: string;
  website: string;
  main_number: string | null;
  country: string;
  brief: string | null;
};

export type ProductType = {
  id: number;
  name: string;
  supplier1_id: number;
  supplier2_id: number | null;
  manufacturer_id: number;
  price: number | null;
};

export type AssetData = {
  asset_id: number;
  asset_number: string;
  asset_barnumber?: string;
  manufacturer_number: string;
  purchase_date?: string;
  last_service_date?: string;
  note?: string;
  client_id?: number;
  supplier_id?: number;
  product_type_id?: number;
};

export type Clienttype = {
  id: number;
  name: string;
}

export type Assettype = {
  id: number;
  name: string;
}