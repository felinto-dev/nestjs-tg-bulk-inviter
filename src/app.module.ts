import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { GroupsModule } from './groups/groups.module';

@Module({
  imports: [AccountsModule, GroupsModule],
})
export class AppModule {}
