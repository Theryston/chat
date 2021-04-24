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

  async findByUserId(id: string): Promise < any > {
    const connection = await this.connectionsRepository.findOne({ user_id: id })
    return connection;
  }

  async findAllWithoutAdmin() {
    const connections = await this.connectionsRepository.find({
      where: { admin_id: null },
      relations: ["user"]
    })

    return connections
  }

  async findBySocketID(socket_id: string): Promise < any > {
    const connection = await this.connectionsRepository.findOne({
      where: { socket_id },
      relations: ["user"]
    })

    return connection;
  }

  async updateAdminId(user_id: string, admin_id: string) {
   const connection = await this.connectionsRepository.createQueryBuilder()
      .update(Connection)
      .set({ admin_id })
      .where("user_id = :user_id", {
        user_id
      })
      .execute()
    
    return connection;
  }

}

export { ConnectionsService };