import { RemoteLoadEmployeeList } from "../../../data/usecases";
import { LoadEmployeeList } from "../../../domain/usecases";
import { makeApiUrl, makeAxiosHttpClient } from "../http";

export const makeRemoteLoadEmployeeList = (): LoadEmployeeList =>
  new RemoteLoadEmployeeList(makeApiUrl("/employee"), makeAxiosHttpClient());
