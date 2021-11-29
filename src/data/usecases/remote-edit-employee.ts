import { AccessDeniedError, UnexpectedError } from "../../domain/errors";
import { EmployeeModel } from "../../domain/models";
import { EditEmployee } from "../../domain/usecases";
import { HttpClient, HttpStatusCode } from "../models/http/http-client";

export class RemoteEditEmployee implements EditEmployee {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<EmployeeModel>
  ) {}

  async edit(params: EmployeeModel): Promise<void> {
    const id = params._id;
    delete params._id;
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${id}`,
      method: "put",
      body: params,
    });
    switch (httpResponse.statusCode) {
      case 200:
        return;
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError();
      default:
        throw new UnexpectedError();
    }
  }
}
