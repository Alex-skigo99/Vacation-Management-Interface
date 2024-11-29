import { Request, Response } from "express";
import { mainModel } from "../models/main_model";
import { Status, VacationCreation } from "../types/validation";

export interface VacationReadQuery {
    query: {
        status?: Status,
        requester_id?: number,
        validator_id?: number
    },
    options: {
        offset: number,
        limit: number
    }
};

export const mainController = {
    read: async (req: Request, res: Response) => {
        const { status, requester_id, validator_id } = req.query; // status is passed as query parameter
        const page = parseInt(req.query.page as string) || 0; // page is passed as query parameter for pagination
        const limit = parseInt(req.query.limit as string) || 10; // limit is passed as query parameter for pagination
        const options: VacationReadQuery['options'] = { offset: page * limit, limit: limit };
        
        const query: VacationReadQuery['query'] =  {};
        if (status) query.status = status as Status;
        if (requester_id) query.requester_id = parseInt(requester_id as string);
        if (validator_id) query.validator_id = parseInt(validator_id as string);

        const readQuery: VacationReadQuery = { query, options };

        const vacations = await mainModel.read(readQuery);
        res.status(200).json(vacations);
    },

    create: async (req: Request, res: Response) => {
        const vacationData: VacationCreation = {
            ...req.body,
            requester_id: Number(req.body.requester_id),
            validator_id: Number(req.body.validator_id),
            start_date: Date.parse(req.body.start_date),
            end_date: Date.parse(req.body.end_date)
        };
        const newVacation = await mainModel.create(vacationData);
        res.status(200).json(newVacation);
    },

    update: async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const vacation = await mainModel.findByIdOrThrow(id);
        const vacationData = {
            ...vacation,
            ...req.body,
        };
        const updateVacation = await mainModel.update(id, vacationData);
        res.status(200).json(updateVacation);
    },

    delete: async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        await mainModel.findByIdOrThrow(id);
        const result = await mainModel.delete(id);
        res.status(200).json(result);
    }
};
