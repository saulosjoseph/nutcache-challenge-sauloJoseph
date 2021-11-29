import { RemoteDeleteEmployee } from "../../../data/usecases";
import { DeleteEmployee } from "../../../domain/usecases";
import { makeApiUrl, makeAxiosHttpClient } from "../http";

export const makeRemoteDeleteEmployee = (id: string): DeleteEmployee =>
  new RemoteDeleteEmployee(
    makeApiUrl(`/employee/${id}`),
    makeAxiosHttpClient()
  );
