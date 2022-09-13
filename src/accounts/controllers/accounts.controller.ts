import { Body, Controller, Post } from '@nestjs/common';
import { TelegramClient } from 'telegram';
import { LogLevel } from 'telegram/extensions/Logger';
import { StringSession } from 'telegram/sessions';
import {
  AddAccountByBotToken,
  AddAccountByStringSession,
} from '../inputs/add-account.input';
import { AccountsService } from '../services/accounts.service';

@Controller({ path: 'accounts' })
export class AccountsController {
  constructor(private readonly accounts: AccountsService) {}

  @Post('string_session')
  async addAccountByStringSession(@Body() account: AddAccountByStringSession) {
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

  @Post('bot_token')
  async addAccountByBotToken(@Body() account: AddAccountByBotToken) {
    const client = new TelegramClient(
      new StringSession(),
      +account.apiId,
      account.apiHash,
      { connectionRetries: 5 },
    );
    client.setLogLevel(LogLevel.NONE);
    await client.connect();
    await client.start({ botAuthToken: account.botToken });
    const isUserAuthorized = await client.isUserAuthorized();
    const stringSession = client.session.save() as unknown as string;

    if (isUserAuthorized) {
      this.accounts.addAccount({
        client,
        stringSession: stringSession,
      });
    }
  }
}
