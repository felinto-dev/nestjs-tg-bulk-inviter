import { Body, Controller, Post } from '@nestjs/common';
import { TelegramClient } from 'telegram';
import { LogLevel } from 'telegram/extensions/Logger';
import { StringSession } from 'telegram/sessions';
import { AddAccountInput } from '../inputs/add-account.input';
import { AccountsService } from '../services/accounts.service';

@Controller({ path: 'accounts' })
export class AccountsController {
  constructor(private readonly accounts: AccountsService) {}

  @Post('string_session')
  async addAccountbyStringSession(@Body() account: AddAccountInput) {
    const client = new TelegramClient(
      new StringSession(account.stringSession),
      +account.apiId,
      account.apiHash,
      { connectionRetries: 5 },
    );
    client.setLogLevel(LogLevel.NONE);
    await client.connect();
    const isUserAuthorized = await client.isUserAuthorized();

    if (isUserAuthorized) {
      this.accounts.addAccount({
        client,
        stringSession: account.stringSession,
      });
    }
  }
}
