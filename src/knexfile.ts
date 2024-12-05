import type { Knex } from "knex";
import dotenv from 'dotenv';

dotenv.config({ path: ['../.env', './.env'] });

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;

if (!PGHOST || !PGDATABASE || !PGUSER || !PGPASSWORD || !PGPORT) {
  throw new Error('Please set the environment variables PGHOST, PGDATABASE, PGUSER, PGPASSWORD, and PGPORT');
};

const config: { [key: string]: Knex.Config } = {
  production: {
    client: "pg",
    connection: {
      host: PGHOST,
      port: PGPORT as unknown as number,
      user: PGUSER,
      database: PGDATABASE,
      password: PGPASSWORD,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations',
      extension: 'ts'
    }
  },
  development: {
    client: "pg",
    connection: {
      host: PGHOST,
      port: PGPORT as unknown as number,
      user: PGUSER,
      password: PGPASSWORD,
      database: PGDATABASE + '_dev',
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations',
      extension: 'ts'
    },
    seeds: {
      directory: './seeds/dev',
      extension: 'ts'
    },  
  },
  test: {
    client: "pg",
    connection: {
      host: PGHOST,
      port: PGPORT as unknown as number,
      user: PGUSER,
      database: PGDATABASE + '_test',
      password: PGPASSWORD,
    },
    migrations: {
      directory: './migrations',
      extension: 'ts'
    },
    seeds: {
      directory: './seeds/test',
      extension: 'ts'
    },  
  }
};

module.exports = config;
