import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { AccountsService } from '../../accounts/services/accounts.service';

@Controller('groups')
export class GroupsController {
  constructor(private readonly accounts: AccountsService) {}

  @Get('members/:groupId')
  async getMembers(@Param('groupId') groupUsername: number) {
    const members = [];

    const totalNumberOfAccounts = this.accounts.countAccounts();

    if (totalNumberOfAccounts === 0) {
      throw new BadRequestException('No accounts available');
    }

    const accounts = this.accounts.getAccounts();

    for (const account of accounts) {
      const participants = account.iterParticipants(groupUsername, {
        limit: 10,
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
