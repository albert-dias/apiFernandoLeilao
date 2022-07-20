import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class UpdateTitleItem1658328401780 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn("items",
      new TableColumn({
        name: 'title',
        type: 'varchar',
        isNullable: true,
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("items", "title")
  }

}
