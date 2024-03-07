import express from 'express';
import messageController from '../controllers/message.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const routes = express.Router();

routes.get('/:id', protectRoute.protectRoute, messageController.getMessage);
routes.post('/send/:id', protectRoute.protectRoute, messageController.sendMessage);

export default routes;
