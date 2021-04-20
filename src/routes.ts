import { Router } from 'express';
const routes = Router()
import { getCustomRepository } from 'typeorm'
import { SettingsRepository } from './repositories/SettingsRepository'

routes.post('/settings', async (req, res) => {
  const { chat, username } = req.body
  
  const settingsRepository = getCustomRepository(SettingsRepository)
  
  const settings = settingsRepository.create({
    chat,
    username
  })
  
  await settingsRepository.save(settings)
  
  res.json(settings)
  
})

export { routes }