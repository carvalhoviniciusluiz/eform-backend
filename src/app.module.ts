import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './ormconfig';
import { RootModule } from './root/root.module';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), RootModule, AccountsModule],
  exports: [TypeOrmModule]
})
export class AppModule {}
