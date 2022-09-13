import { Body, Controller, Post } from '@nestjs/common';
import {
  AddAccountByBotToken,
  AddAccountByStringSession,
} from '../inputs/add-account.input';
import { AccountsService } from '../services/accounts.service';
import { TelegramClientService } from '../services/telegram-client.service';

@Controller({ path: 'accounts' })
export class AccountsController {
  constructor(
    private readonly accounts: AccountsService,
    private readonly telegramClient: TelegramClientService,
  ) {}

  @Post('string_session')
  async addAccountByStringSession(
    @Body() connectionParams: AddAccountByStringSession,
  ) {
    const account = await this.telegramClient.loginByStringSession(
      connectionParams,
    );
    this.accounts.addAccount(account);
  }

  @Post('bot_token')
  async addAccountByBotToken(@Body() connectionParams: AddAccountByBotToken) {
    const account = await this.telegramClient.loginByBotToken(connectionParams);
    this.accounts.addAccount(account);
  }
}
