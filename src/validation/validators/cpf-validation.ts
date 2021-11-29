import { InvalidFieldError } from "../errors";
import { FieldValidation } from "../field-validation-model";

export class CpfValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(input: any): Error | null {
    const cpfRegex =
      /([0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})/;
    return !input[this.field] || cpfRegex.test(input[this.field])
      ? null
      : new InvalidFieldError();
  }
}
