import { UsersRepository } from '../repositories/UsersRepository';
import { getCustomRepository } from 'typeorm';

class UsersService {
  async create(email: string) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({
      email
    })

    if (user) {
      return user;
    }

    const newUser = usersRepository.create({
      email
    })

    await usersRepository.save(newUser)

    return newUser;
  }
}

export { UsersService }