import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMessages1619107886157 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise < void > {

    await queryRunner.createTable(
      new Table({
        name: "messages",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
          },
          {
            name: "admin_id",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "user_id",
            type: "varchar",
          },
          {
            name: "text",
            type: "varchar"
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()"
          },
        ],
        foreignKeys: [
          {
            name: "FKUsers",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_id"],
            onDelete: 'CASCADE',
            onUpdate: "CASCADE"
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise < void > {
    await queryRunner.dropTable("messages");
  }
}