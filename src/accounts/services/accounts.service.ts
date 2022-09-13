import { Injectable } from '@nestjs/common';
import { TelegramClient } from 'telegram';

export type Account = {
  client: TelegramClient;
  stringSession: string;
};

@Injectable()
export class AccountsService {
  private readonly accounts: Account[] = [];

  addAccount(account: Account) {
    this.accounts.push(account);
  }

  getAccounts() {
    return this.accounts;
  }

  countAccounts() {
    return this.accounts.length;
  }

  async exportSessions() {
    return this.accounts.map((account) => account.stringSession);
  }
}
