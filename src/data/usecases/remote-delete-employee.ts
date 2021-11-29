import { AccessDeniedError, UnexpectedError } from "../../domain/errors";
import { EmployeeModel } from "../../domain/models";
import { DeleteEmployee } from "../../domain/usecases";
import { HttpClient, HttpStatusCode } from "../models/http/http-client";

export class RemoteDeleteEmployee implements DeleteEmployee {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<EmployeeModel>
  ) {}

  async delete(): Promise<void> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "delete",
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
