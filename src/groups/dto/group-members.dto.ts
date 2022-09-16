import { FilterAccounts } from '../types/filter-accounts.type';

export class GroupMembersDto {
  limit: number;
  accounts: FilterAccounts;
}
