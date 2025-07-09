import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function createSchema() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  // USERS
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  // CUSTOMERS
  await sql`
    CREATE TABLE IF NOT EXISTS customers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL
    );
  `;

  // INVOICES
  await sql`
    CREATE TABLE IF NOT EXISTS invoices (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      customer_id UUID NOT NULL,
      amount INT NOT NULL,
      status VARCHAR(255) NOT NULL,
      date DATE NOT NULL
    );
  `;

  // REVENUE
  await sql`
    CREATE TABLE IF NOT EXISTS revenue (
      month VARCHAR(4) NOT NULL UNIQUE,
      revenue INT NOT NULL
    );
  `;

  // CLIENT TYPES
  await sql`
    CREATE TABLE IF NOT EXISTS client_types (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE
    );
  `;

  // CLIENTS
  await sql`
    CREATE TABLE IF NOT EXISTS clients (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
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

  // SUPPLIERS / MANUFACTURERS
  await sql`
    CREATE TABLE IF NOT EXISTS suppliers_manufacturers (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      website VARCHAR(255) NOT NULL,
      main_number VARCHAR(255),
      country VARCHAR(255) NOT NULL,
      brief TEXT
    );
  `;

  // PRODUCT TYPES
  await sql`
    CREATE TABLE IF NOT EXISTS product_types (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      supplier1_id INT NOT NULL,
      supplier2_id INT,
      manufacturer_id INT NOT NULL,
      price INT,
      FOREIGN KEY (supplier1_id) REFERENCES suppliers_manufacturers(id),
      FOREIGN KEY (supplier2_id) REFERENCES suppliers_manufacturers(id),
      FOREIGN KEY (manufacturer_id) REFERENCES suppliers_manufacturers(id)
    );
  `;

  // ASSETS
  await sql`
    CREATE TABLE IF NOT EXISTS assets (
      id SERIAL PRIMARY KEY,
      asset_barnumber VARCHAR(255) UNIQUE,
      product_type_id INT NOT NULL,
      client_id INT NOT NULL,
      manufacturer_number VARCHAR(255) NOT NULL,
      asset_number VARCHAR(255) NOT NULL UNIQUE,
      supplier_id INT,
      purchase_date TIMESTAMP DEFAULT NOW() NOT NULL,
      last_service_date DATE,
      note TEXT,
      FOREIGN KEY (product_type_id) REFERENCES product_types(id),
      FOREIGN KEY (client_id) REFERENCES clients(id),
      FOREIGN KEY (supplier_id) REFERENCES suppliers_manufacturers(id)
    );
  `;

  console.log('✅ All tables created successfully.');
}
