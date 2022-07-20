import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export default class UpdateItem1658279440016 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("items", [
      new TableColumn({
        name: 'lat',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'lng',
        type: 'varchar',
        isNullable: true,
      })
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("items", ["lat", "lng"])
  }

}
