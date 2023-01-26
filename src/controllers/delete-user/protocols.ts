import { IUser } from "../../models/user";

export interface IDeleteuserRepository {
  deleteUser(id: string): Promise<IUser>;
}
