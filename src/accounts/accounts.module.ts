import { Module } from '@nestjs/common';
import { AccountsController } from './controllers/accounts.controller';
import { AccountsService } from './services/accounts.service';
import { TelegramClientService } from './services/telegram-client.service';
import { AccountsUpdate } from './update/accounts.update';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService, TelegramClientService, AccountsUpdate],
  exports: [AccountsService],
})
export class AccountsModule {}
