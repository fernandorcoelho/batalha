import { RoleEnum } from 'src/utils/role.enum';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class PopulateRoles1700151285061 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const roles = Object.values(RoleEnum);
    const query =
      "INSERT INTO roles(name) VALUES ('" + roles.join("'), ('") + "');";

    await queryRunner.query(query);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const roles = Object.values(RoleEnum);
    const query =
      "DELETE FROM roles WHERE name IN ('" + roles.join("', '") + "');";

    await queryRunner.query(query);
  }
}
