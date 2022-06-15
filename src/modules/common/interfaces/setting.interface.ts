import {IPagination} from "../../shared/interfaces/pagination.ts";

export interface ISetting {
  id?: number;
  key: string;
  value: string;
  description: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface ISettingPagination {
  data: ISetting[];
  pagination?: IPagination;
}

