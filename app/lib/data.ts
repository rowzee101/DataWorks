import postgres from 'postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchRevenue() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue[]>`SELECT * FROM revenue`;

    console.log('Data fetch completed after 3 seconds.');

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    const data = await sql<LatestInvoiceRaw[]>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0][0].count ?? '0');
    const numberOfCustomers = Number(data[1][0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2][0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2][0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 20;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable[]>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm[]>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    const customers = await sql<CustomerField[]>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType[]>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}



//////////////////////////
import type { Asset , Client , ProductType , SupplierManufacturer , Clienttype} from './definitions';

// This function fetches client data for the dashboard, including the number of assets associated with each client.
// It returns an array of objects containing client ID, name, and asset count.
export type ClientWithAssetCount = {
  id: number;
  name: string;
  asset_count: number;
};

export async function dashboardFetchClientData(): Promise<ClientWithAssetCount[]> {
  try {
    const result = await sql`
      SELECT 
        c.id,
        c.name,
        COUNT(a.id) AS asset_count
      FROM clients c
      LEFT JOIN assets a ON c.id = a.client_id
      GROUP BY c.id, c.name
      ORDER BY c.name ASC;
    `;

    // add where id != myId

    return result.map(row => ({
      id: row.id,
      name: row.name,
      asset_count: Number(row.asset_count),
    }));
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch client data.");
  }
}


// This function retrieves a client by its ID from the database.
// It returns the client object if found, or null if not found or an error occurs.
export async function getClientById(id: number) {
  try {
    const result = await sql`
      SELECT * FROM clients WHERE id = ${id};
    `;
    return result[0] || null;
  } catch (error) {
    console.error('Error fetching client:', error);
    return null;
  }
}



export async function getAssetsByClientId(clientId: number): Promise<Asset[]> {
  try {
    const result = await sql<Asset[]>`
      SELECT * FROM assets WHERE client_id = ${clientId} ORDER BY purchase_date DESC
    `;
    return result; // If you're using @vercel/postgres or pg, this is fine
  } catch (error) {
    console.error('Error fetching assets for client:', error);
    return [];
  }
}

export async function fetchClients() {
  try {
    const Clients = await sql<Client[]>`
      SELECT
        id,
        name
      FROM clients
      ORDER BY name ASC
    `;

    return Clients;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all Clients.');
  }
}

export async function fetchSupplierManufacturer() {
  try {
    const SupplierManufacturer = await sql<SupplierManufacturer[]>`
      SELECT * 
      FROM suppliers_manufacturers
      ORDER BY name ASC
    `;

    return SupplierManufacturer;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all SupplierManufacturer.');
  }
}

export async function fetchProductType() {
  try {
    const ProductType = await sql<ProductType[]>`
      SELECT *
      FROM product_types
      ORDER BY name ASC
    `;

    return ProductType;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all ProductType.');
  }
}


export async function getAssetById(id: number) {
  try {
    const result = await sql`
      SELECT * FROM assets WHERE id = ${id};
    `;
    return result[0] || null;
  } catch (error) {
    console.error('Error fetching asset:', error);
    return null;
  }
}

export async function fetchClientTypes() {
  try {
    const ClientTypes = await sql<Clienttype[]>`
      SELECT
        id,
        name
      FROM client_types
      ORDER BY name ASC
    `;

    return ClientTypes;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all ProductType.');
  }
}

export async function fetchAssets() {
  try {
    const Assets = await sql<Asset[]>`
      SELECT *
      FROM assets
      ORDER BY purchase_date DESC
    `;

    return Assets;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all Assets.');
  }
}

export async function fetchAssetsExceptClientID(Id: number) {
  try {
    const assets = await sql<Asset[]>`
      SELECT *
      FROM assets
      WHERE client_id != ${Id}
      ORDER BY purchase_date DESC
    `;

    return assets;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch assets excluding the given client_id.');
  }
}


export async function fetchProductTypeByID(id: number) {
  try {
    const result = await sql`
      SELECT * FROM product_types WHERE id = ${id};
    `;
    return result[0] || null;
  } catch (error) {
    console.error('Error fetching ProductType:', error);
    return null;
  }
}

export async function fetchSupplierByID(id: number) {
  try {
    const result = await sql`
      SELECT * FROM suppliers_manufacturers WHERE id = ${id};
    `;
    return result[0] || null;
  } catch (error) {
    console.error('Error fetching suppliers_manufacturers:', error);
    return null;
  }
}

export async function fetchSupplierManufacturerWithCounts() {
  try{
    const result = await sql`
      SELECT 
        s.id,
        s.name,
        COUNT(DISTINCT pt.id) AS product_count,
        COUNT(DISTINCT a.id) AS asset_count
      FROM suppliers_manufacturers s
      LEFT JOIN product_types pt 
        ON s.id = pt.supplier1_id 
        OR s.id = pt.supplier2_id 
        OR s.id = pt.manufacturer_id
      LEFT JOIN assets a 
        ON s.id = a.supplier_id
      GROUP BY s.id
      ORDER BY s.name;
    `;
    

    return result;
  }
  catch (error) {
    console.error('Error fetching suppliers with counts:', error);
    throw new Error('Failed to fetch suppliers with product and asset counts.');
  }
}

export async function fetchProductTypesBySupplierId(supplierId: number) {
  try{
    const result = await sql<ProductType[]>`
      SELECT *
      FROM product_types
      WHERE supplier1_id = ${supplierId}
        OR supplier2_id = ${supplierId}
        OR manufacturer_id = ${supplierId};
    `;

    return result;
  }
  catch (error) {
    console.error('Error fetching product types by supplier ID:', error);
    throw new Error('Failed to fetch product types for the given supplier ID.');
  }
}