import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateVisibleItem1657762036013 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'visibles_item',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'item_id',
            type: 'uuid'
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },

        ],
        foreignKeys: [
          {
            name: "FKLot_BidsItems",
            referencedTableName: "items",
            referencedColumnNames: ["id"],
            columnNames: ["item_id"],
            onDelete: "CASCADE",
          },
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('visibles_item')
  }
}
