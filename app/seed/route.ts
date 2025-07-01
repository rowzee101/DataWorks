import bcrypt from 'bcrypt';
import postgres from 'postgres';
import { invoices, customers, revenue, users } from '../lib/placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

async function seedInvoices() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS invoices (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      customer_id UUID NOT NULL,
      amount INT NOT NULL,
      status VARCHAR(255) NOT NULL,
      date DATE NOT NULL
    );
  `;

  const insertedInvoices = await Promise.all(
    invoices.map(
      (invoice) => sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedInvoices;
}

async function seedCustomers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS customers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL
    );
  `;

  const insertedCustomers = await Promise.all(
    customers.map(
      (customer) => sql`
        INSERT INTO customers (id, name, email, image_url)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedCustomers;
}

async function seedRevenue() {
  await sql`
    CREATE TABLE IF NOT EXISTS revenue (
      month VARCHAR(4) NOT NULL UNIQUE,
      revenue INT NOT NULL
    );
  `;

  const insertedRevenue = await Promise.all(
    revenue.map(
      (rev) => sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO NOTHING;
      `,
    ),
  );

  return insertedRevenue;
}





///////////////////////////////////
import { clients , product_types , assets , suppliers_manufacturers , client_types} from '../lib/placeholder-data';

async function seedClientTypes() {
  await sql`
    CREATE TABLE IF NOT EXISTS client_types (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    );
  `;
  const insertedClientTypes = await Promise.all(
    client_types.map(
      (clientType) => sql`
        INSERT INTO client_types (  name)
        VALUES (${clientType.name})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );
  return insertedClientTypes;
}

async function seedClients() {

  await sql`
    CREATE TABLE IF NOT EXISTS clients (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      website VARCHAR(255) NOT NULL,
      main_number VARCHAR(50) NOT NULL,

      state VARCHAR(100) NOT NULL,
      address VARCHAR(255) NOT NULL,
      country VARCHAR(100) NOT NULL,
      client_type INT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      brief TEXT,

      FOREIGN KEY (client_type) REFERENCES client_types(id)
    );
  `;

  const insertedClients = await Promise.all(
    clients.map(
      (client) => sql`
        INSERT INTO clients (  name, website, main_number, state, address, country, client_type, created_at, brief)
        VALUES (${client.name}, ${client.website}, ${client.main_number}, ${client.state}, ${client.address}, ${client.country}, ${client.client_type}, NOW(), ${client.brief})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedClients;
}

async function seedSuppliers_manufacturers() {
  await sql`
    CREATE TABLE IF NOT EXISTS suppliers_manufacturers (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      website VARCHAR(255) NOT NULL,
      main_number VARCHAR(255),
      country VARCHAR(255) NOT NULL,
      brief TEXT
    );
  `;
  
  const insertedSuppliers_manufacturers = await Promise.all(
    suppliers_manufacturers.map(
      (supplier_manufacturer) => sql`
        INSERT INTO suppliers_manufacturers (  name, website, main_number, country, brief)
        VALUES (${supplier_manufacturer.name}, ${supplier_manufacturer.website}, ${supplier_manufacturer.main_number}, ${supplier_manufacturer.country}, ${supplier_manufacturer.brief})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedSuppliers_manufacturers;
}

async function seedProduct_types() {
  await sql`
    CREATE TABLE IF NOT EXISTS product_types (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      supplier1_id INT NOT NULL,
      supplier2_id INT,
      manufacturer_id INT NOT NULL,
      price INT,
      FOREIGN KEY (supplier1_id) REFERENCES suppliers_manufacturers(id),
      FOREIGN KEY (supplier2_id) REFERENCES suppliers_manufacturers(id),
      FOREIGN KEY (manufacturer_id) REFERENCES suppliers_manufacturers(id)
    );
  `;

  const insertedProduct_types = await Promise.all(
    product_types.map(
      (product_type) => sql`
        INSERT INTO product_types (  name, supplier1_id, supplier2_id, manufacturer_id, price)
        VALUES (${product_type.name}, ${product_type.supplier1_id}, ${product_type.supplier2_id}, ${product_type.manufacturer_id}, ${product_type.price})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedProduct_types;
}

async function seedAssets() {
  await sql`
    CREATE TABLE IF NOT EXISTS assets (
      id SERIAL PRIMARY KEY,
      asset_barnumber VARCHAR(255) UNIQUE
      product_type_id INT NOT NULL,
      client_id INT NOT NULL,
      manufacturer_number VARCHAR(255) NOT NULL,
      supplier_id INT,
      purchase_date TIMESTAMP DEFAULT NOW(),
      last_service_date DATE,
      note TEXT,

      FOREIGN KEY (product_type_id) REFERENCES product_types(id),
      FOREIGN KEY (client_id) REFERENCES clients(id),
      FOREIGN KEY (supplier_id) REFERENCES suppliers_manufacturers(id)
    );
  `;

  const insertedAssets = await Promise.all(
    assets.map(
      (asset) => sql`
        INSERT INTO assets (client_id, manufacturer_number, supplier_id, purchase_date, last_service_date, note)
        VALUES (${asset.client_id}, ${asset.manufacturer_number}, ${asset.supplier_id}, ${asset.purchase_date}, ${asset.last_service_date}, ${asset.note})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );
  return insertedAssets;
}

async function resetDatabase() {
  await sql`DROP TABLE IF EXISTS assets CASCADE;`;
  await sql`DROP TABLE IF EXISTS product_types CASCADE;`;
  await sql`DROP TABLE IF EXISTS clients CASCADE;`;
  await sql`DROP TABLE IF EXISTS client_types CASCADE;`;
  await sql`DROP TABLE IF EXISTS suppliers_manufacturers CASCADE;`;
}


export async function GET() {
  try {
    await sql`DROP TABLE IF EXISTS suppliers_manufacturers CASCADE;`;
    const result = await sql.begin((sql) => [
      seedUsers(),
      seedCustomers(),
      seedInvoices(),
      seedRevenue(),

      resetDatabase(),

      seedClientTypes(),
      seedClients(),
      seedSuppliers_manufacturers(),
      seedProduct_types(),
      seedAssets(),
    ]);

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}