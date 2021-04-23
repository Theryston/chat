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

  async findByUsername(req: Request, res: Response) {
    const { username } = req.params

    const settingsService = new SettingsService()

    const settings = await settingsService.findByUsername(username);

    return res.json(settings)
  }
  
  async update(req: Request, res: Response) {
    const { username } = req.params
    const { chat } = req.body
    
    const settingsService = new SettingsService()

    const settings = await settingsService.update(username, chat)
    
    res.json({settings})
  }
  
}

export { SettingsController };