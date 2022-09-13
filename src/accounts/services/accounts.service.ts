import { Injectable } from '@nestjs/common';

type Account = {
  apiId: number;
  apiHash: string;
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
}
