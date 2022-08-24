import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class CreateOthersDocsInAuction1661300774976 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("items",[
      new TableColumn({
        name: 'matricula_url',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'other_url',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'process_url',
        type: 'varchar',
        isNullable: true,
      })
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("items", ["matricula_url", "other_url", "process_url"])
  }

}
