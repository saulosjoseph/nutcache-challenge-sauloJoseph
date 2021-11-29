import { EmployeeModel } from "../models";

export interface EditEmployee {
  edit: (params: EmployeeModel) => Promise<void>;
}
