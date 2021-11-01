import { Controller, Get } from '@nestjs/common';

@Controller('accounts')
export class AccountsController {
  @Get()
  getAll(): string {
    return 'accounts';
  }
}
