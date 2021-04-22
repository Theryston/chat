import { SettingsRepository } from '../repositories/settingsRepository';
import { getCustomRepository } from 'typeorm';

interface ISettingsCreate {
  chat: boolean;
  username: string
}

class SettingsService {
  create({ chat, username }: ISettingsCreate) {
    const settingsRepository = getCustomRepository(SettingsRepository)

    const settings = settingsRepository.create({
      chat,
      username
    })

    await settingsRepository.save(settings)
    
    return settings
  }
}

export { SettingsService }