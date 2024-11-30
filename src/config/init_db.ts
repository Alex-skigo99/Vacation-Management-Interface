// run once after upload project to create database tables -> node build/config/init_db.js

import knex, { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;

if (!PGHOST || !PGDATABASE || !PGUSER || !PGPASSWORD || !PGPORT) {
  throw new Error('Please set the environment variables PGHOST, PGDATABASE, PGUSER, PGPASSWORD, and PGPORT');
}

const postgresConfig = {
  client: 'pg',
  connection: {
      host: PGHOST,
      port: PGPORT as unknown as number,
      user: PGUSER,
      database: 'postgres',
      password: PGPASSWORD,
  }
};

const dbConfig = {
  client: 'pg',
  connection: {
      host: PGHOST,
      port: PGPORT as unknown as number,
      user: PGUSER,
      database: PGDATABASE,
      password: PGPASSWORD,
  }
};

const createTables = async (db: Knex) => {
  try {
    await db.schema.withSchema('public').createTable('users', table => {
      table.increments('id').primary();
      table.string('name', 100).notNullable().unique();
      table.string('role', 20).notNullable();
    });
    console.log('Table users created.');

    await db.schema.withSchema('public').createTable('vacation_requests', table => {
      table.increments('id').primary();
      table.integer('requester_id').notNullable().unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.integer('validator_id').notNullable().unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.datetime('created_at').notNullable();
      table.date('start_date').notNullable();
      table.date('end_date').notNullable();
      table.string('reason', 255);
      table.string('status', 50).notNullable();
      table.text('comments');
    });
    console.log('Table vacation_requests created.');
  } catch (err) {
    console.error(err);
  } finally {
    await db.destroy();
  }
};

const createDatabase = async (dbName: string) => {
  const postgress = knex(postgresConfig);
  try {
    // Check if the database already exists
    const result = await postgress.raw(
      `SELECT 1 FROM pg_database WHERE datname = ?`,
      [dbName]
    );
    if (result.rows.length > 0) {
      console.log(`Database "${dbName}" already exists.`);
    } else {
      await postgress.raw(`CREATE DATABASE ${dbName}`);
      console.log(`Database "${dbName}" created successfully.`);

      const db = knex(dbConfig);
      await createTables(db);
      await db.destroy();
    }
  } catch (error) {
    console.error("Error creating database:", error);
  } finally {
    await postgress.destroy();
  }
};

createDatabase(PGDATABASE);
