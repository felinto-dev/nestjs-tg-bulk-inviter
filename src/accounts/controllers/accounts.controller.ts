import { Body, Controller, Post } from '@nestjs/common';
import {
  AddAccountByBotToken,
  AddAccountByStringSession,
} from '../inputs/add-account.input';
import { AccountsService } from '../services/accounts.service';

@Controller({ path: 'accounts' })
export class AccountsController {
  constructor(private readonly accounts: AccountsService) {}

  @Post('string_session')
  async addAccountByStringSession(
    @Body() connectionParams: AddAccountByStringSession,
  ) {
    const account = await this.accounts.loginByStringSession(connectionParams);
    this.accounts.addAccount(account);
  }

  @Post('bot_token')
  async addAccountByBotToken(@Body() connectionParams: AddAccountByBotToken) {
    const account = await this.accounts.loginByBotToken(connectionParams);
    this.accounts.addAccount(account);
  }
}
