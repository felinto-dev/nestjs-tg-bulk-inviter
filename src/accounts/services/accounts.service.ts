import { Injectable } from '@nestjs/common';
import { TelegramClient } from 'telegram';
import { LogLevel } from 'telegram/extensions/Logger';
import { StringSession } from 'telegram/sessions';
import {
  AddAccountByBotToken,
  AddAccountByStringSession,
} from '../inputs/add-account.input';

type Account = {
  client: TelegramClient;
  stringSession: string;
};

@Injectable()
export class AccountsService {
  private readonly accounts: Account[] = [];

  async loginByStringSession(account: AddAccountByStringSession) {
    const client = new TelegramClient(
      new StringSession(account.stringSession),
      +account.apiId,
      account.apiHash,
      { connectionRetries: 5 },
    );
    client.setLogLevel(LogLevel.NONE);
    await client.connect();
    const isUserAuthorized = await client.isUserAuthorized();
    const stringSession = client.session.save() as unknown as string;
    return isUserAuthorized ? { client, stringSession } : null;
  }

  async loginByBotToken(account: AddAccountByBotToken) {
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
    return isUserAuthorized ? { client, stringSession } : null;
  }

  addAccount(account: Account) {
    this.accounts.push(account);
  }

  getAccounts() {
    return this.accounts;
  }

  countAccounts() {
    return this.accounts.length;
  }
}
