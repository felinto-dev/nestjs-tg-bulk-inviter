import { Injectable } from '@nestjs/common';

type Account = {
  phone: string;
  appId: number;
  apiHash: string;
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
}
