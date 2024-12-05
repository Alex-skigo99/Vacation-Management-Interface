import type { Knex } from 'knex';


export async function up(db: Knex): Promise<void> {
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
};


export async function down(db: Knex): Promise<void> {
    await db.schema.withSchema('public').dropTable('vacation_requests');
    console.log('Table vacation_requests dropped.');
    
    await db.schema.withSchema('public').dropTable('users');
    console.log('Table users dropped.');
};
