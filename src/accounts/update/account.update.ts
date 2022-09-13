import { Command, Update } from '@grammyjs/nestjs';
import { Context, InputFile } from 'grammy';
import { AccountsService } from '../services/accounts.service';

@Update()
export class AccountsUpdate {
  constructor(private readonly accounts: AccountsService) {}

  @Command('export')
  async export(ctx: Context) {
    const stringSessions = await this.accounts.exportSessions();

    if (!stringSessions.length) {
      return ctx.reply('No accounts found');
    }

    const buffer = Buffer.from(JSON.stringify(stringSessions));
    const file = new InputFile(buffer, 'sessions.json');
    return ctx.replyWithDocument(file);
  }
}
