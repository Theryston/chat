import { Router, Request, Response } from 'express';
const routes = Router()
import { SettingsController } from './controllers/SettingsController'
const settingsController = new SettingsController()

routes.post('/settings', settingsController.create)

export { routes }