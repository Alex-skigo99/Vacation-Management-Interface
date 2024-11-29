import { Request, Response } from "express";
import { userModel } from "../models/user_model";

export type UsersReadQuery = {
    role?: string;
};
    
export const usersController = {
    read: async (req: Request, res: Response) => {
        const { role } = req.query; // status is passed as query parameter
        const readQuery: UsersReadQuery = role ? { role: String(role) } : {};
        const users = await userModel.read(readQuery);
        res.status(200).json(users);
    },

    create: async (req: Request, res: Response) => {
        const userData = req.body;
        const newUser = await userModel.create(userData);
        res.status(200).json(newUser);
    },
};
