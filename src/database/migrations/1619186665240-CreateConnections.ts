import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateConnections1619186665240 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise < void > {
    await queryRunner.createTable(
      new Table({
        name: 'connections',
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true
            },
          {
            name: "admin_id",
            type: "varchar",
            isNullable: true,
            },
          {
            name: "user_id",
            type: "varchar"
            },
          {
            name: "socket_id",
            type: "varchar"
            },
          {
            name: "created_at",
            type: 'timestamp',
            default: 'now()'
            },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()"
            }
          ]
      })
    )

    await queryRunner.createForeignKey(
      "connections",
      new TableForeignKey({
        name: "FKConnection",
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        columnNames: ["user_id"],
        onDelete: 'CASCADE',
        onUpdate: "CASCADE"
      })
    )

  }

  public async down(queryRunner: QueryRunner): Promise < void > {
    await queryRunner.dropForeignKey("connections", "FKConnection")
    await queryRunner.dropTable('connections')
  }

}