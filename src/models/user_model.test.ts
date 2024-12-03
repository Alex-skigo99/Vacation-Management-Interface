import { userModel } from './user_model';
import { db } from '../config/db';
import { ValidationError } from '../types/errors';
import { Role } from '../types/validation';

jest.mock('../config/db');

describe('userModel', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    describe('read', () => {
        it('should return users based on readQuery', async () => {
            const mockUsers = [{ id: 1, name: 'John Doe' }];
            (db as jest.MockedFunction<any>).mockReturnValue({
                select: jest.fn().mockReturnThis(),
                where: jest.fn().mockResolvedValue(mockUsers),
            });

            const readQuery = { role: 'requester' };
            const users = await userModel.read(readQuery);

            expect(users).toEqual(mockUsers);
            expect(db).toHaveBeenCalledWith('users');
            expect(db().select).toHaveBeenCalledWith('*');
            expect(db().where).toHaveBeenCalledWith(readQuery);
        });
    });

    describe('notExistByNameOrThrow', () => {
        it('should throw ValidationError if user exists', async () => {
            const mockUser = { id: 1, name: 'John Doe' };
            (db as jest.MockedFunction<any>).mockReturnValue({
                select: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                first: jest.fn().mockResolvedValue(mockUser),
            });

            await expect(userModel.notExistByNameOrThrow('John Doe')).rejects.toThrow(ValidationError);
            expect(db).toHaveBeenCalledWith('users');
            expect(db().select).toHaveBeenCalledWith('*');
            expect(db().where).toHaveBeenCalledWith({ name: 'John Doe' });
            expect(db().first).toHaveBeenCalled();
        });

        it('should not throw if user does not exist', async () => {
            (db as jest.MockedFunction<any>).mockReturnValue({
                select: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                first: jest.fn().mockResolvedValue(null),
            });

            await expect(userModel.notExistByNameOrThrow('John Doe')).resolves.not.toThrow();
            expect(db).toHaveBeenCalledWith('users');
            expect(db().select).toHaveBeenCalledWith('*');
            expect(db().where).toHaveBeenCalledWith({ name: 'John Doe' });
            expect(db().first).toHaveBeenCalled();
        });
    });

    describe('create', () => {
        it('should create a new user if validation passes and user does not exist', async () => {
            const mockUserData = { name: 'John Doe', role: 'requester' as Role };
            const mockNewUser = [{ id: 1, ...mockUserData }];

            (db as jest.MockedFunction<any>).mockReturnValue({
                select: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                first: jest.fn().mockResolvedValue(null),
                insert: jest.fn().mockReturnThis(),
                returning: jest.fn().mockResolvedValue(mockNewUser),
            });

            const newUser = await userModel.create(mockUserData);

            expect(newUser).toEqual(mockNewUser);
            expect(db).toHaveBeenCalledWith('users');
            expect(db().insert).toHaveBeenCalledWith(mockUserData);
            expect(db().returning).toHaveBeenCalledWith('*');
        });

        it('should throw ValidationError if user already exists', async () => {
            const mockUserData = { name: 'John Doe', role: 'requester' as Role };
            const mockExistingUser = { id: 1, ...mockUserData };

            (db as jest.MockedFunction<any>).mockReturnValue({
                select: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                first: jest.fn().mockResolvedValue(mockExistingUser),
            });

            await expect(userModel.create(mockUserData)).rejects.toThrow(ValidationError);
            expect(db).toHaveBeenCalledWith('users');
            expect(db().select).toHaveBeenCalledWith('*');
            expect(db().where).toHaveBeenCalledWith({ name: 'John Doe' });
            expect(db().first).toHaveBeenCalled();
        });
    });
});