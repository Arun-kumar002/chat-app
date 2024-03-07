import express from 'express'
import protectRoute from '../middleware/protectRoute.js'
import userController from "../controllers/user.controller.js"

const routes = express.Router()

routes.get("/", protectRoute.protectRoute, userController.getUserForSidebar)

export default routes