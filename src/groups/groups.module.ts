import { Module } from '@nestjs/common';
import { AccountsModule } from '../accounts/accounts.module';
import { GroupsController } from './controllers/groups.controller';

@Module({
  imports: [AccountsModule],
  controllers: [GroupsController],
})
export class GroupsModule {}
