import { RemoteAddEmployee } from "../../../data/usecases";
import { AddEmployee } from "../../../domain/usecases";
import { makeApiUrl, makeAxiosHttpClient } from "../http";

export const makeRemoteAddEmployee = (): AddEmployee =>
  new RemoteAddEmployee(makeApiUrl("/employee"), makeAxiosHttpClient());
