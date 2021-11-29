import { EmployeeModel } from "../models";

export interface LoadEmployeeList {
  loadAll: () => Promise<EmployeeModel[]>;
}
