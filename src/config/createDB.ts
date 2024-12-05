import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;

if (!PGHOST || !PGDATABASE || !PGUSER || !PGPASSWORD || !PGPORT) {
  throw new Error('Please set the environment variables PGHOST, PGDATABASE, PGUSER, PGPASSWORD, and PGPORT');
};

const client = new Client({
    host: PGHOST,
    port: PGPORT as unknown as number,
    user: PGUSER,
    password: PGPASSWORD,
    database: 'postgres', // Connect to the default postgres database
});

const databases = [PGDATABASE + '_dev', PGDATABASE + '_test'];

(async () => {
  try {
    await client.connect();
    for (const db of databases) {
      const result = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${db}'`);
      if (result.rowCount === 0) {
        await client.query(`CREATE DATABASE ${db}`);
        console.log(`Database ${db} created.`);
      } else {
        console.log(`Database ${db} already exists.`);
      }
    }
  } catch (err) {
    console.error('Error creating databases:', err);
  } finally {
    await client.end();
  }
})();