import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class CreateIncrementInItem1661126917724 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn("items",
      new TableColumn({
        name: 'increment',
        type: 'varchar',
        isNullable: true,
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("items", "increment")
  }

}
