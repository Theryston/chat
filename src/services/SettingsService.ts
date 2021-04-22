import { SettingsRepository } from '../repositories/SettingsRepository';
import { getCustomRepository } from 'typeorm';

interface ISettingsCreate {
  chat: boolean;
  username: string
}

class SettingsService {
  async create({ chat, username }: ISettingsCreate) {
    const settingsRepository = getCustomRepository(SettingsRepository)

    const user = await settingsRepository.findOne({
      username
    })

    if (user) {
      throw new Error('User already existe!')
    }

    const settings = settingsRepository.create({
      chat,
      username
    })

    await settingsRepository.save(settings)


    return settings;
  }
}

export { SettingsService }