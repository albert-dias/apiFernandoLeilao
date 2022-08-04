import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class CreateCloseInItem1659650203644 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn("items",
      new TableColumn({
        name: 'close',
        type: 'timestamp',
        isNullable: true,
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("items", "close")
  }

}
