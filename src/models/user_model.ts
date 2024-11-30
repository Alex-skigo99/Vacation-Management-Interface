import { db } from '../config/db';
import { UsersReadQuery } from '../controllers/users_controller';
import { ValidationError } from '../types/errors';
import { UserCreataion } from '../types/validation';
import { validateUserCreate } from '../types/validation';

const userTable = 'users';

export const userModel = {
    read: async (readQuery: UsersReadQuery) => {
        const users = await db(userTable).select('*').where(readQuery);
        return users;
    },

    notExistByNameOrThrow: async (name: string) => {
        const user = await db(userTable).select('*').where({ name }).first();
        if (user) throw new ValidationError(`User with name ${name} already exists`);
    },

    create: async (userData: UserCreataion) => {
        validateUserCreate(userData);
        await userModel.notExistByNameOrThrow(userData.name);
        const newUser = await db(userTable)
            .insert(userData)
            .returning('*');
        return newUser;
    },
};