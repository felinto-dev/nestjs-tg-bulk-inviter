import { Module } from '@nestjs/common';
import { AccountsController } from './controllers/accounts.controller';
import { AccountsService } from './services/accounts.service';
import { TelegramClientService } from './services/telegram-client.service';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService, TelegramClientService],
  exports: [AccountsService],
})
export class AccountsModule {}
