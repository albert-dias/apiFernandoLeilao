import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateAuction1654995631400 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'auctions',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'cod_leilao',
                        type: 'varchar'
                    },
                    {
                        name: 'type_auction',
                        type: 'varchar'
                    },
                    {
                        name: 'url_edital',
                        type: 'varchar'
                    },
                    {
                        name: 'data_realizacao',
                        type: 'timestamp'
                    },
                    {
                        name: 'description',
                        type: 'varchar'
                    },
                    {
                        name: 'is_active',
                        type: 'integer'
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
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('auctions')
    }

}
