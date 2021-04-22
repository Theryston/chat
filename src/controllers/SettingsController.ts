import { Request, Response } from 'express';
import { SettingsService } from '../services/SettingsService'


class SettingsController {
  async create(req: Request, res: Response) {
    const { chat, username } = req.body

    try {
      const settingsService = new SettingsService()

      const settings = await settingsService.create({ chat, username });

      res.json(settings)

    } catch (e) {
      res.status(400)
      res.json({ massage: e })
    }
  }
}

export { SettingsController };