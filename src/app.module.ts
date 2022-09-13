import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { GroupsModule } from './groups/groups.module';
import { NestjsGrammyModule } from '@grammyjs/nestjs';

@Module({
  imports: [
    NestjsGrammyModule.forRoot({ token: process.env.BOT_TOKEN }),
    AccountsModule,
    GroupsModule,
  ],
})
export class AppModule {}
