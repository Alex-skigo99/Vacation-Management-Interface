import { Status, Role, validateUserCreate, validateVacationCreation, validateVacationUpdate } from './validation';
import { z } from 'zod';

describe('Validation Tests', () => {
    describe('User Validation', () => {
        it('should validate a correct user', () => {
            const userData = {
                name: 'John Doe',
                role: 'requester' as Role
            };
            expect(() => validateUserCreate(userData)).not.toThrow();
        });

        it('should throw an error for invalid role', () => {
            const userData = {
                name: 'John Doe',
                role: 'invalid_role' as Role
            };
            expect(() => validateUserCreate(userData)).toThrow(z.ZodError);
        });

        it('should throw an error for name exceeding max length', () => {
            const userData = {
                name: 'a'.repeat(101),
                role: 'requester' as Role
            };
            expect(() => validateUserCreate(userData)).toThrow(z.ZodError);
        });
    });

    describe('Vacation Validation', () => {
        it('should validate a correct vacation request', () => {
            const vacationData = {
                requester_id: 1,
                validator_id: 2,
                start_date: '2023-01-01',
                end_date: '2023-01-10',
                reason: 'Vacation',
                status: 'pending' as Status,
                comments: 'Looking forward to it'
            };
            expect(() => validateVacationCreation(vacationData)).not.toThrow();
        });

        it('should throw an error for invalid status', () => {
            const vacationData = {
                requester_id: 1,
                validator_id: 2,
                start_date: '2023-01-01',
                end_date: '2023-01-10',
                reason: 'Vacation',
                status: 'invalid_status' as Status,
                comments: 'Looking forward to it'
            };
            expect(() => validateVacationCreation(vacationData)).toThrow(z.ZodError);
        });

        it('should throw an error for invalid date format', () => {
            const vacationData = {
                requester_id: 1,
                validator_id: 2,
                start_date: 'invalid_date',
                end_date: '2023-01-10',
                reason: 'Vacation',
                status: 'pending' as Status,
                comments: 'Looking forward to it'
            };
            expect(() => validateVacationCreation(vacationData)).toThrow(z.ZodError);
        });

        it('should validate a correct vacation update', () => {
            const vacationData = {
                requester_id: 1,
                validator_id: 2,
                start_date: '2023-01-01',
                end_date: '2023-01-10',
                reason: 'Vacation',
                status: 'approved' as Status,
                comments: 'Enjoy your vacation'
            };
            expect(() => validateVacationUpdate(vacationData)).not.toThrow();
        });
    });
});