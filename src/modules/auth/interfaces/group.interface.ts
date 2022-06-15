import {IPagination} from "../../shared/interfaces/pagination.ts";

export interface IGroup {
  id: number;
  name: string;
  description: string;
}

export interface IGroupPagination {
  data: IGroup[];
  pagination?: IPagination;
}
