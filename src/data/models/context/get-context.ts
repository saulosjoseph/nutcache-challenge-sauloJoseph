import { InitialStateModel } from "../../../domain/models";

export interface GetContext {
  get: () => InitialStateModel;
}
