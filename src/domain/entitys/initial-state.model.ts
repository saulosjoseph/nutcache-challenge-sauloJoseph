import { EmployeeModel } from "./employee.model";

export interface InitialStateModel {
  employeeList: EmployeeModel[];
  isLoading: boolean;
  isError: boolean;
  mainError: string;
}
