import { db } from "../config/db";
import { VacationCreation, validateVacationCreation, validateVacationUpdate } from "../types/validation";
import { ResourceNotExistError, ValidationError } from "../types/errors";
import { VacationReadQuery } from "../controllers/main_controller";

const vacationRequestsTable = 'vacation_requests';

export const mainModel = {
    async read({query, options}: VacationReadQuery) {
        const result = await db(vacationRequestsTable)
            .join('users', 'vacation_requests.requester_id', 'users.id')
            .join('users as validator', 'vacation_requests.validator_id', 'validator.id')
            .select('vacation_requests.*', 'users.name as requester_name')
            .select('validator.name as validator_name')
            .where(query)
            .orderBy('created_at', 'desc')
            .offset(options.offset)
            .limit(options.limit);
        return result;
    },

    async findByIdOrThrow(id: number) {
        const vacation = await db(vacationRequestsTable).select('*').where({ id }).first();
        if (vacation === null) throw new ResourceNotExistError("Vacation not found");
        return vacation;
    },

    async create(vacationData: VacationCreation) {
        validateVacationCreation(vacationData);
        const dataToSave = { ...vacationData, created_at: new Date() };
        return await db(vacationRequestsTable)
            .insert(dataToSave)
            .returning('*');
    },

    async update(id: number, vacationData: VacationCreation) {
        validateVacationUpdate(vacationData);
        const result = await db(vacationRequestsTable)
            .update(vacationData)
            .where({ id })
            .returning('*');
        return result; 
    },

    async delete(id: number) {
        return await db(vacationRequestsTable).delete().where({ id }); 
    }
};
