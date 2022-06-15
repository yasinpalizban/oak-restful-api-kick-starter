import {IPagination} from "../../shared/interfaces/pagination.ts";

export interface IUserGroup {
  id?: number;
  userId: number;
  groupId: number;
}

export interface IUserGroupPagination {
  data: IUserGroup[];
  pagination: IPagination;
}
