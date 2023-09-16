import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1597626060117 implements MigrationInterface {
    name = 'Initial1597626060117'

    public async up(_: QueryRunner): Promise<void> {
        //await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_9e91e6a24261b66f53971d3f96b" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(_: QueryRunner): Promise<void> {
    }

}