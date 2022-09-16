import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { AccountsService } from '../../accounts/services/accounts.service';
import { GroupMembersDto } from '../dto/group-members.dto';

@Controller('groups')
export class GroupsController {
  constructor(private readonly accounts: AccountsService) {}

  @Get('members/:groupId')
  async getMembers(
    @Param('groupId') groupUsername: number,
    @Body() filter: GroupMembersDto,
  ) {
    const totalNumberOfAccounts = this.accounts.countAccounts();

    if (totalNumberOfAccounts === 0) {
      throw new BadRequestException(
        'No accounts found. You need to create at least one account.',
      );
    }

    const accounts = this.accounts.getAccounts();

    const members = [];

    for (const account of accounts) {
      const participants = account.client.iterParticipants(groupUsername, {
        limit: filter.limit,
      });

      for await (const participant of participants) {
        if (participant.bot !== filter.accounts.bots) {
          continue;
        }

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
