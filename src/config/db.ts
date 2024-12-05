import knex from 'knex';
// import config from '../knexfile';
const config = require('../knexfile');


const environment = process.env.NODE_ENV || 'development';
export const db = knex(config[environment]);

console.log('Connected to database', db.client.config.connection.database);

// import dotenv from 'dotenv';

// dotenv.config();

// const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;

// export const db = knex({
//     client: 'pg',
//     connection: async () => ({
//         host: PGHOST,
//         port: PGPORT as unknown as number,
//         user: PGUSER,
//         database: PGDATABASE,
//         password: PGPASSWORD,
//     })
// });

const cleanup = async () => {
    console.log("Closing database connection...");
    await db.destroy();
    console.log("Connection closed. Exiting program.");
    process.exit(0);
  };
  
process.on("SIGINT", cleanup); // Triggered on Ctrl+C
process.on("SIGTERM", cleanup); // Triggered by termination signals
process.on("exit", cleanup); // Triggered on program exit