import bcrypt from 'bcrypt';
import postgres from 'postgres';


const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });


async function resetDatabase() {
  await sql`DROP TABLE IF EXISTS users CASCADE;`;
  // await sql`DROP TABLE IF EXISTS assets CASCADE;`;
  // await sql`DROP TABLE IF EXISTS product_types CASCADE;`;
  // await sql`DROP TABLE IF EXISTS clients CASCADE;`;
  // await sql`DROP TABLE IF EXISTS client_types CASCADE;`;
  // await sql`DROP TABLE IF EXISTS suppliers_manufacturers CASCADE;`;
}


export async function GET() {
  try {
    const result = await sql.begin((sql) => [
      resetDatabase(),
    ]);

    return Response.json({ message: 'Database reseted successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}