import { Injectable } from '@nestjs/common';
import { TelegramClient } from 'telegram';
import { LogLevel } from 'telegram/extensions/Logger';
import { StringSession } from 'telegram/sessions';
import {
  AddAccountByBotToken,
  AddAccountByStringSession,
  App,
} from '../inputs/add-account.input';
import { Account } from './accounts.service';

@Injectable()
export class TelegramClientService {
  private async setupTelegramClient(api: App, stringSession = '') {
    const client = new TelegramClient(
      new StringSession(stringSession),
      +api.apiId,
      api.apiHash,
      { connectionRetries: 5 },
    );
    client.setLogLevel(LogLevel.NONE);
    await client.connect();
    return client;
  }

  async loginByStringSession(
    account: AddAccountByStringSession,
  ): Promise<Account> {
    const client = await this.setupTelegramClient(
      {
        apiId: account.apiId,
        apiHash: account.apiHash,
      },
      account.stringSession,
    );

    const isUserAuthorized = await client.isUserAuthorized();

    if (isUserAuthorized) {
      return { client, ...account };
    }
  }

  async loginByBotToken(account: AddAccountByBotToken): Promise<Account> {
    const client = await this.setupTelegramClient({
      apiId: account.apiId,
      apiHash: account.apiHash,
    });

    await client.start({ botAuthToken: account.botToken });

    const isUserAuthorized = await client.isUserAuthorized();
    const stringSession = client.session.save() as unknown as string;

    if (isUserAuthorized) {
      return { client, stringSession, ...account };
    }
  }
}
