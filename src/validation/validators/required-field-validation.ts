import { RequiredFieldError } from "../errors";
import { FieldValidation } from "../field-validation-model";

export class RequiredFieldValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(input: any): Error | null {
    return input[this.field] ? null : new RequiredFieldError();
  }
}
