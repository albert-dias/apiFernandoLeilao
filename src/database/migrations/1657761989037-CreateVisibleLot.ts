import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateVisibleLot1657761989037 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'visibles_lot',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'lot_id',
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
            name: "FKLot_BidsLots",
            referencedTableName: "lots",
            referencedColumnNames: ["id"],
            columnNames: ["lot_id"],
            onDelete: "CASCADE",
          },
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('visibles_lot')
  }

}
