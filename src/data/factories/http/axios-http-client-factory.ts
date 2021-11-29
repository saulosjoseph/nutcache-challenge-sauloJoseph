import { AxiosHttpClient } from "../../../data/infra/http/axios-http-client";

export const makeAxiosHttpClient = (): AxiosHttpClient => new AxiosHttpClient();
