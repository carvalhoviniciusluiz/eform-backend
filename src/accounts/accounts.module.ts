import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AccountsController } from './presentation/accounts.controller';

@Module({
  imports: [CqrsModule],
  controllers: [AccountsController],
  providers: [Logger]
})
export class AccountsModule {}
