import { EmployeeModel } from "./employee.model";

interface IndexSignature {
  [key: string]: boolean | string | void;
}
export interface FormModel extends EmployeeModel, IndexSignature {
  isFormInvalid: boolean;
  nameError?: string;
  birth_dateError?: string;
  genderError?: string;
  emailError?: string;
  cpfError?: string;
  start_dateError?: string;
  teamError?: string;
}
