import { Knex } from "knex";

const user_table = 'users';
const vacation_table = 'vacation_requests';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex(user_table).del();

    // Inserts seed entries
    await knex(user_table).insert({ name: "John Dow", role: "requester" });
    await knex(user_table).insert({ name: "Mike Holms", role: "requester" });
    await knex(user_table).insert({ name: "Sandy Hooks", role: "validator" });
    await knex(user_table).insert({ name: "Ariel Levi", role: "requester" });
    await knex(user_table).insert({ name: "Mark Rishon", role: "validator" });
    await knex(user_table).insert({ name: "Pam Levinsky", role: "requester" });
    await knex(user_table).insert({ name: "Nir Clain", role: "requester" });
    await knex(user_table).insert({ name: "Alex Bol", role: "requester" });
    await knex(vacation_table).insert({ requester_id: 1, validator_id: 3, created_at: "2024-11-29 23:35:46.549+02", start_date: "2024-11-29", end_date: "2024-11-29", reason: "ok", status: "approved", comments: "" });
    await knex(vacation_table).insert({ requester_id: 2, validator_id: 3, created_at: "2024-11-29 23:40:56.806+02", start_date: "2024-12-01", end_date: "2024-12-23", reason: "", status: "rejected", comments: "" });
    await knex(vacation_table).insert({ requester_id: 4, validator_id: 5, created_at: "2024-11-30 22:24:15.898+02", start_date: "2024-12-01", end_date: "2024-12-08", reason: "wife's birthday", status: "rejected", comments: "" });
    await knex(vacation_table).insert({ requester_id: 8, validator_id: 5, created_at: "2024-12-01 09:36:45.624+02", start_date: "2024-12-02", end_date: "2024-12-07", reason: "test", status: "approved", comments: "ok" });
    await knex(vacation_table).insert({ requester_id: 1, validator_id: 5, created_at: "2024-12-01 12:26:17.75+02", start_date: "2024-12-15", end_date: "2024-12-22", reason: "annual", status: "approved", comments: "no" });
    await knex(vacation_table).insert({ requester_id: 7, validator_id: 3, created_at: "2024-12-01 13:08:09.24+02", start_date: "2024-12-19", end_date: "2024-12-21", reason: "party", status: "pending", comments: null });
    await knex(vacation_table).insert({ requester_id: 1, validator_id: 5, created_at: "2024-12-01 13:17:20.537+02", start_date: "2024-12-15", end_date: "2024-12-22", reason: "some", status: "approved", comments: "no" });
};
