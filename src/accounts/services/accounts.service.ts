import { Injectable } from '@nestjs/common';
import { TelegramClient } from 'telegram';

@Injectable()
export class AccountsService {
  private readonly accounts: TelegramClient[] = [];

  addAccount(account: TelegramClient) {
    this.accounts.push(account);
  }

  getAccounts() {
    return this.accounts;
  }
}
