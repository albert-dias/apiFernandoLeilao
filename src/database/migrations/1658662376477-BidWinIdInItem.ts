import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm"

export class BidWinIdInItem1658662376477 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('items', 'win_bid')
    await queryRunner.addColumn('items', new TableColumn(
      {
        name: 'win_bid_id',
        type: 'uuid',
        isNullable: true,
      }
    ))

    await queryRunner.createForeignKey(
      "items",
      new TableForeignKey({
        columnNames: ["win_bid_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "bids_item",
        onDelete: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("items");
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("win_bid_id") !== -1
    );
    await queryRunner.dropForeignKey("items", foreignKey);
    await queryRunner.dropColumn("items", "win_bid_id");
    await queryRunner.addColumn("items", 
      new TableColumn({
        name: 'win_bid',
        type: 'varchar',
        isNullable: true,
      })
    )
  }

}
