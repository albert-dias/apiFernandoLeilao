import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateItemInLot1654995685929 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'items',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'lot_id',
            type: 'uuid',
          },
          {
            name: 'subcategory_id',
            type: 'uuid',
          },
          {
            name: 'cod_item',
            type: 'varchar'
          },
          {
            name: 'avaliation',
            type: 'varchar',
          },
          {
            name: 'destaq',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar'
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
            isNullable: true
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
            name: 'zipcode',
            type: 'varchar',
          },
          {
            name: 'street',
            type: 'varchar',
          },
          {
            name: 'number',
            type: 'varchar',
          },
          {
            name: 'complement',
            type: 'varchar',
          },
          {
            name: 'region',
            type: 'varchar',
          },
          {
            name: 'state',
            type: 'varchar',
          },
          {
            name: 'city',
            type: 'varchar',
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
            name: "FKLot_Item",
            referencedTableName: "lots",
            referencedColumnNames: ["id"],
            columnNames: ["lot_id"],
            onDelete: "CASCADE",
          },
          {
            name: "FKUser_Item",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_win_id"],
            onDelete: "CASCADE",
          },
          {
            name: "FKSubcategory_Item",
            referencedTableName: "subcategories",
            referencedColumnNames: ["id"],
            columnNames: ["subcategory_id"],
            onDelete: "CASCADE",
          },
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('items')
  }

}
