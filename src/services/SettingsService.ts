import { SettingsRepository } from '../repositories/SettingsRepository';
import { getCustomRepository, Repository } from 'typeorm';
import { Setting } from '../entities/Setting'

interface ISettingsCreate {
  chat: number | string;
  username: string
}

class SettingsService {
  private settingsRepository: Repository < Setting >

    constructor() {
      this.settingsRepository = getCustomRepository(SettingsRepository)
    }


  async create({ chat, username }: ISettingsCreate) {

    if (chat == "true") {
      chat = 1
    } else {
      chat = 0
    }

    const user = await this.settingsRepository.findOne({
      username
    })

    if (user) {
      throw new Error('User already existe!')
    }

    const settings = this.settingsRepository.create({
      chat,
      username
    })

    await this.settingsRepository.save(settings)


    return settings;
  }

  async findByUsername(username: string) {
    const settings = await this.settingsRepository.findOne({
      username
    })
    return settings;
  }

  async update(username: string, chat: number | string) {

    if (chat == "true") {
      chat = 1
    } else {
      chat = 0
    }

    const settings = await this.settingsRepository.createQueryBuilder()
      .update(Setting)
      .set({ chat })
      .where("username = :username", {
        username
      })
      .execute()
      
      return settings;
  }

}

export { SettingsService }