import { AccessDeniedError, UnexpectedError } from "../../domain/errors";
import { EmployeeModel } from "../../domain/entitys";
import { AddEmployee } from "../../domain/usecases";
import { HttpClient, HttpStatusCode } from "../entitys/http/http-client";

export class RemoteAddEmployee implements AddEmployee {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<EmployeeModel>
  ) {}

  async add(params: EmployeeModel): Promise<EmployeeModel> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "post",
      body: params,
    });
    const remoteEmployees = httpResponse.body || undefined;
    switch (httpResponse.statusCode) {
      case 201:
        if (remoteEmployees?._id) return remoteEmployees;
        throw new UnexpectedError();
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError();
      default:
        throw new UnexpectedError();
    }
  }
}
