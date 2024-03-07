import express from 'express'
import authController from '../controllers/auth.controller.js'

const routes = express.Router()

routes.post('/signup',authController.signup)
routes.post('/login',authController.login)
routes.post('/logout',authController.logout)

export default routes