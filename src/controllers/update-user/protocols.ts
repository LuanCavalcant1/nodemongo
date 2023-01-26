import { IUser } from "../../models/user";
import { IHttpResponse } from "../protocols";

export interface IUpdateUserParams {
  firstName?: string;
  lastName?: string;
  password?: string;
}

export interface IUpdateUserController {
  handle(httpRequest: IHttpResponse<any>): Promise<IHttpResponse<IUser>>;
}

export interface IUpdateUserRepository {
  updateUser(id: string, params: IUpdateUserParams): Promise<IUser>;
}
