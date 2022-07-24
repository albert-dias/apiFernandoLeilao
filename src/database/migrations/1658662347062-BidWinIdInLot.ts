import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm"

export class BidWinIdInLot1658662347062 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('lots', 'win_bid')
      await queryRunner.addColumn('lots', new TableColumn(
        {
          name: 'win_bid_id',
          type: 'uuid',
          isNullable: true,
        }
      ))

      await queryRunner.createForeignKey(
        "lots",
        new TableForeignKey({
          columnNames: ["win_bid_id"],
          referencedColumnNames: ["id"],
          referencedTableName: "bids_lot",
          onDelete: "SET NULL",
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      const table = await queryRunner.getTable("lots");
      const foreignKey = table.foreignKeys.find(
        (fk) => fk.columnNames.indexOf("win_bid_id") !== -1
      );
      await queryRunner.dropForeignKey("lots", foreignKey);
      await queryRunner.dropColumn("lots", "win_bid_id");
      await queryRunner.addColumn("lots", 
        new TableColumn({
          name: 'win_bid',
          type: 'varchar',
          isNullable: true,
        })
      )
    }

}
