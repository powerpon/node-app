import express from 'express';
import { appController } from '../controllers/app.controller';
import { asyncHandler } from '../helpers/asyncHandler';

const mainRouter = express.Router();

mainRouter.get('/health', asyncHandler(appController.healthCheck));

export default mainRouter;
