import { RemoteEditEmployee } from "../../../data/usecases";
import { EditEmployee } from "../../../domain/usecases";
import { makeApiUrl, makeAxiosHttpClient } from "../http";

export const makeRemoteEditEmployee = (): EditEmployee =>
  new RemoteEditEmployee(makeApiUrl("/employee"), makeAxiosHttpClient());
