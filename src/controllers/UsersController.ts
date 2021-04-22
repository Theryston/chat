import { Request, Response } from 'express';
import { UsersService } from '../services/UsersService'


class UsersController {
  async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body

    try {
      const usersService = new UsersService()

      const user = await usersService.create(email);

      return res.json(user)

    } catch (e) {
      return res.sendStatus(500)
    }
  }
}

export { UsersController };