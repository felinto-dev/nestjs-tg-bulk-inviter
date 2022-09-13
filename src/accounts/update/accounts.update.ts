import { Command, Update } from '@grammyjs/nestjs';
import { Context, InputFile } from 'grammy';
import { AccountsService } from '../services/accounts.service';

@Update()
export class AccountsUpdate {
  constructor(private readonly accounts: AccountsService) {}

  @Command('export')
  async export(ctx: Context) {
    const sessions = this.accounts.exportSessions();
    const json = JSON.stringify(sessions);

    if (!sessions.length) {
      return ctx.reply('No accounts found');
    }

    const previewFileLink =
      'https://jsonformatter.curiousconcept.com/?data=' +
      encodeURIComponent(json) +
      '&process=true';

    const buffer = Buffer.from(json);
    const file = new InputFile(buffer, 'sessions.json');
    return ctx.replyWithDocument(file, {
      caption:
        'Here are your sessions. You can import them by sending the file later to me. You can also preview them here: <a href="' +
        previewFileLink +
        '">Preview</a>',
      parse_mode: 'HTML',
    });
  }
}
