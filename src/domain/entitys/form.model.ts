import { EmployeeModel } from "./employee.model";

export interface FormModel extends EmployeeModel {
  isFormInvalid: boolean;
  nameError?: string;
  birth_dateError?: string;
  genderError?: string;
  emailError?: string;
  cpfError?: string;
  start_dateError?: string;
  teamError?: string;
}
