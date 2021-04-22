import { Request, Response } from 'express';
import { MessagesService } from '../services/MessagesService'


class MessagesController {
  async create(req: Request, res: Response) {
    const { admin_id, text, user_id } = req.body

    try {
      const messagesService = new MessagesService()

      const messages = await messagesService.create({ admin_id, text, user_id });

      res.status(200)
      res.json(messages)

    } catch (e) {
      console.log(e)
      res.status(400)
      res.json({ massage: e })
    }
  }

  async listByUser(req: Request, res: Response) {
    const { id } = req.params
    
    const messagesService = new MessagesService()

    var messages = await messagesService.listByUser(id)

    res.json(messages)
  }

}

export { MessagesController };