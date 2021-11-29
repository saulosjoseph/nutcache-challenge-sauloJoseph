import { RequiredFieldError } from "../errors";
import { FieldValidation } from "../models";

export class RequiredFieldValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(input: any): Error | null {
    return input[this.field] ? null : new RequiredFieldError();
  }
}
