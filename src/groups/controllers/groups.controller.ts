import {
  BadRequestException,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { AccountsService } from '../../accounts/services/accounts.service';

@Controller('groups')
export class GroupsController {
  constructor(private readonly accounts: AccountsService) {}

  @Get('members/:groupId')
  async getMembers(
    @Param('groupId') groupUsername: number,
    @Query('limit', new DefaultValuePipe(10)) limit: number,
  ) {
    const members = [];

    const totalNumberOfAccounts = this.accounts.countAccounts();

    if (totalNumberOfAccounts === 0) {
      throw new BadRequestException(
        'No accounts found. You need to create at least one account.',
      );
    }

    const accounts = this.accounts.getAccounts();

    for (const account of accounts) {
      const participants = account.client.iterParticipants(groupUsername, {
        limit,
      });
      for await (const participant of participants) {
        members.push({
          id: participant.id,
          accessHash: participant.accessHash,
          username: participant.username,
          firstName: participant.firstName,
          lastName: participant.lastName,
        });
      }
    }

    return members;
  }
}
