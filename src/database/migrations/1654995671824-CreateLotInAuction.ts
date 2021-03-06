import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateLotInAuction1654995671824 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'lots',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'auction_id',
            type: 'uuid',
          },
          {
            name: 'cod_lot',
            type: 'varchar'
          },
          {
            name: 'description',
            type: 'varchar'
          },
          {
            name: 'avaliation',
            type: 'varchar',
          },
          {
            name: 'first_open',
            type: 'timestamp'
          },
          {
            name: 'second_open',
            type: 'timestamp',
            isNullable: true
          },
          {
            name: 'close',
            type: 'timestamp'
          },
          {
            name: 'org_avaliation',
            type: 'varchar'
          },
          {
            name: 'initial_bid1',
            type: 'varchar'
          },
          {
            name: 'initial_bid2',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'win_bid',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'user_win_id',
            type: 'uuid',
            isNullable: true
          },
          {
            name: 'is_active',
            type: 'integer',
            default: 0,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKAuction_Lot",
            referencedTableName: "auctions",
            referencedColumnNames: ["id"],
            columnNames: ["auction_id"],
            onDelete: "CASCADE",
          },
          {
            name: "FKUser_Lot",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_win_id"],
            onDelete: "CASCADE",
          },
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('lots');
  }

}
