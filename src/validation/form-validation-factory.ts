import { ValidationComposite } from "./validation-composite";
import { ValidationBuilder as Builder } from "./validation-builder";

export const makeFormValidation = (): ValidationComposite =>
  ValidationComposite.build([
    ...Builder.field("name").required().build(),
    ...Builder.field("email").required().email().build(),
    ...Builder.field("birth_date").required().build(),
    ...Builder.field("gender").required().build(),
    ...Builder.field("team").build(),
    ...Builder.field("cpf").required().cpf().build(),
    ...Builder.field("start_date").required().build(),
  ]);
