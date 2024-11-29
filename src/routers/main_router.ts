import express from 'express';
import { asyncHandler } from '../middlewares/asyncHandler';
import { mainController } from '../controllers/main_controller';

export const mainRouter = express.Router();

mainRouter.get('/vacations', asyncHandler(mainController.read)); //Retrieving vacation requests (by requester or all for the validator)
mainRouter.post('/vacations', asyncHandler(mainController.create)); ///Submitting a vacation request
mainRouter.patch('/vacations/:id', asyncHandler(mainController.update)); //Approving/rejecting a request with optional comments.
mainRouter.delete('/vacations/:id', asyncHandler(mainController.delete));

