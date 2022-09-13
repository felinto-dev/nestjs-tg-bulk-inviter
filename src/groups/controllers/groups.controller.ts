import { Controller, Get, Param } from '@nestjs/common';

@Controller('groups')
export class GroupsController {
  @Get('members/:groupId')
  async getMembers(@Param('groupId') groupId: number) {
    return groupId;
  }
}
