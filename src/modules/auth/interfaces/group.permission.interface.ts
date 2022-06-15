import {IPagination} from "../../shared/interfaces/pagination.ts";

export interface IGroupPermission {
  id: number;
  actions: string;
  groupId: number;
  group?: string;
  permission?: string;
  permissionId: number;
}
export interface IGroupPermissionPagination {
  data: IGroupPermission[];
  pagination?: IPagination;
}
