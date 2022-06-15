import {IPagination} from "../../shared/interfaces/pagination.ts";

export interface IPermission {
  id: number;
  name: string;
  description: string;
  active: boolean;
}

export interface IPermissionPagination {
  data: IPermission[];
  pagination?: IPagination;
}
