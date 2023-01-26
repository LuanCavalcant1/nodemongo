// import validator from "validator";
import { IUser } from "../../models/user";
import { badRequest, created, serverError } from "../helpers";
import { IController, IHttpRequest, IHttpResponse } from "../protocols";
import { ICreateUserParams, ICreateUserRepository } from "./protocols";

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    httpRequest: IHttpRequest<ICreateUserParams>
  ): Promise<IHttpResponse<IUser | string>> {
    try {
      const requiredFields = ["firstName", "lastName", "email", "password"];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof ICreateUserParams]?.length) {
          return badRequest(`Field ${field} is required`);
        }
      }
      // verificar se o e-mail é valido

      //  const emailIsValid = validator.isEmail(httpRequest.body!.email);

      // if (!emailIsValid) {
      //   return {
      //     statusCode: 400,
      //     body: "E-mail is invalid",
      //   };
      // }

      const user = await this.createUserRepository.createUser(
        httpRequest.body!
      );

      return created<IUser>(user);
    } catch (error) {
      return serverError();
    }
  }
}
