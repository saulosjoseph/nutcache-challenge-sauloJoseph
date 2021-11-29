import { EmployeeModel } from "../entitys";

export interface LoadEmployeeList {
  loadAll: () => Promise<EmployeeModel[]>;
}
