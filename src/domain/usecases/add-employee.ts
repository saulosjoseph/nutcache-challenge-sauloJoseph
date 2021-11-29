import { EmployeeModel } from "../models";

export interface AddEmployee {
  add: (params: EmployeeModel) => Promise<EmployeeModel>;
}
