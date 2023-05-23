import { DataSource } from 'typeorm';
import { EnvironmentArranger } from './EnvironmentArranger';
import { ConfigService } from '@nestjs/config';

export class TypeOrmEnvironmentArranger implements EnvironmentArranger {
  private connection?: DataSource;

  async arrange(): Promise<void> {
    await this.createTheConnection();

    if (!this.connection) throw new Error('The connection not exists');

    await this.cleanDatabase();
  }
  async close(): Promise<void> {
    if (!this.connection) return;

    await this.connection.destroy();
  }

  private async cleanDatabase() {
    for (const entity of this.connection.entityMetadatas) {
      const respository = await this.connection.getRepository(entity.target);
      await respository.clear();
    }
  }

  private async createTheConnection() {
    const configService = new ConfigService();

    const appDataSource = new DataSource({
      type: 'postgres',
      host: configService.get('TYPEORM_HOST'),
      port: configService.get('TYPEORM_PORT'),
      username: configService.get('TYPEORM_USERNAME'),
      password: configService.get('TYPEORM_PASSWORD'),
      database: configService.get('TYPEORM_DATABASE'),
      entities: [__dirname + '/../../../src/**/**/entities/*{.js,.ts}'],
      synchronize: true,
    });

    this.connection = await appDataSource.initialize();
  }
}
