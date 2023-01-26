import { IUser } from "../../models/user";
import { badRequest, ok, serverError } from "../helpers";
import { IController, IHttpRequest, IHttpResponse } from "../protocols";
import { IUpdateUserParams, IUpdateUserRepository } from "./protocols";

export class UpdateUserController implements IController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}

  async handle(
    httpRequest: IHttpRequest<IUpdateUserParams>
  ): Promise<IHttpResponse<IUser | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!body) {
        return badRequest("Missing fields");
      }

      if (!id) {
        return badRequest("Missing user id");
      }
      const allowedFieldsToUpdate: (keyof IUpdateUserParams)[] = [
        "firstName",
        "lastName",
        "password",
      ];
      const someFieldNotAllowedToUpdate = Object.keys(body).some(
        (key) => !allowedFieldsToUpdate.includes(key as keyof IUpdateUserParams)
      );

      if (someFieldNotAllowedToUpdate) {
        return badRequest("Some received field is not allowed");
      }

      const user = await this.updateUserRepository.updateUser(id, body);
      return ok<IUser>(user);
    } catch (error) {
      return serverError();
    }
  }
}
