import { ConnectionsRepository } from '../repositories/ConnectionsRepository';
import { getCustomRepository, Repository } from 'typeorm';
import { Connection } from '../entities/Connection'

interface IConnectionCreate {
  admin_id ? : string;
  socket_id: string;
  user_id: string;
  id ? : string;
}

class ConnectionsService {
  private connectionsRepository: Repository < Connection >

    constructor() {
      this.connectionsRepository = getCustomRepository(ConnectionsRepository)
    }

  async create({ admin_id, socket_id, user_id, id }: IConnectionCreate) {
    const connection = await this.connectionsRepository.create({
      admin_id,
      socket_id,
      user_id,
      id
    })

    await this.connectionsRepository.save(connection)
    return connection;

  }

  async findByUserId(id: string) {
    const connection = await this.connectionsRepository.findOne({ user_id: id })

    if (connection) {
      return connection;
    } else {
      return undefined
    }
  }

  async findAllWithoutAdmin() {
    const connections = await this.connectionsRepository.find({
      where: { admin_id: null },
      relations: ["user"]
    })
    
    return connections
  }

}

export { ConnectionsService };