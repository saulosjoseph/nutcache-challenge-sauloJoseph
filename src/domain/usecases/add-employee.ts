import { EmployeeModel } from "../entitys";

export interface AddEmployee {
  add: (params: EmployeeModel) => Promise<EmployeeModel>;
}
