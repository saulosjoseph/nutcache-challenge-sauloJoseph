import { AccessDeniedError, UnexpectedError } from "../../domain/errors";
import { EmployeeModel } from "../../domain/entitys";
import { LoadEmployeeList } from "../../domain/usecases";
import { HttpClient, HttpStatusCode } from "../entitys/http/http-client";

export class RemoteLoadEmployeeList implements LoadEmployeeList {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<EmployeeModel[]>
  ) {}

  async loadAll(): Promise<EmployeeModel[]> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "get",
    });
    const remoteEmployees = httpResponse.body || [];
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok2:
        return remoteEmployees.map((remoteEmployee) => ({
          ...remoteEmployee,
        }));
      case HttpStatusCode.noContent:
        return [];
      case 400:
        throw new AccessDeniedError();
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError();
      default:
        throw new UnexpectedError();
    }
  }
}
