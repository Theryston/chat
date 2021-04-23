import { UsersRepository } from '../repositories/UsersRepository';
import { getCustomRepository, Repository } from 'typeorm';
import { User } from '../entities/User'

class UsersService {
  private usersRepository: Repository < User >

    constructor() {
      this.usersRepository = getCustomRepository(UsersRepository);
    }

  async create(email: string) {
    const user = await this.usersRepository.findOne({
      email
    })

    if (user) {
      return user;
    }

    const newUser = this.usersRepository.create({
      email
    })

    await this.usersRepository.save(newUser)

    return newUser;
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      email
    })

    if (user) {
      return user;
    } else {
      return undefined
    }
  }

}

export { UsersService }