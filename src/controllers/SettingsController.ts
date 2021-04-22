import { Request, Response } from 'express';
import { SettingsService } from '../services/SettingsService'


class SettingsController {
  async create(req: Request, res: Response) {
    const { chat, username } = req.body
    
    const settingsService = new SettingsService()

    res.json(settingsService.create(chat, username))
  }
}

export { SettingsController };