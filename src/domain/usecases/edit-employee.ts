import { EmployeeModel } from "../entitys";

export interface EditEmployee {
  edit: (params: EmployeeModel) => Promise<void>;
}
