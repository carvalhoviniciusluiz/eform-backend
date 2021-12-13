import { MigrationInterface, QueryRunner } from 'typeorm';
import { ReadFile } from './utils';

const DATABASE = `${__dirname}/scripts/database.sql`;

export class database1639398441396 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const sql = ReadFile(DATABASE);
    await queryRunner.query(sql);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(``);
  }
}
