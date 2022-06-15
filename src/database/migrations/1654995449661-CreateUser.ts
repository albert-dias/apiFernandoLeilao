import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUser1654995449661 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'is_active',
                        type:  'integer',
                        default: 0
                    },
                    {
                        name: 'is_adm',
                        type:  'integer',
                        default: 0
                    },
                    {
                        name: 'document',
                        type: 'varchar',
                    },
                    {
                        name: 'identity',
                        type: 'varchar',
                    },
                    {
                        name: 'mail',
                        type: 'varchar',
                    },
                    {
                        name: 'phone',
                        type: 'varchar',
                    },
                    {
                        name: 'whatsapp',
                        type: 'varchar',
                    },
                    {
                        name: 'birth',
                        type: 'varchar',
                    },
                    {
                        name: 'profission',
                        type: 'varchar',
                    },
                    {
                        name: 'marital',
                        type: 'varchar',
                    },
                    {
                        name: 'naturalness',
                        type: 'varchar',
                    },
                    {
                        name: 'nationality',
                        type: 'varchar',
                    },
                    {
                        name: 'father_name',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'mother_name',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'marital_name',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'marital_document',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'marital_identity',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'username',
                        type: 'varchar',
                    },
                    {
                        name: 'password',
                        type: 'varchar',
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
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
