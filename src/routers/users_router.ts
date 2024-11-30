import express from 'express';
import { asyncHandler } from '../middlewares/asyncHandler';
import { usersController } from '../controllers/users_controller';

export const usersRouter = express.Router();

usersRouter.get('/users', asyncHandler(usersController.read)); 
usersRouter.post('/users', asyncHandler(usersController.create)); 

