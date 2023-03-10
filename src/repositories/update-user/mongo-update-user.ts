import { ObjectId } from "mongodb";
import {
  IUpdateUserParams,
  IUpdateUserRepository,
} from "../../controllers/update-user/protocols";
import { MongoClient } from "../../database/mongo";
import { IUser } from "../../models/user";

export class MongoUpdateUsersRepository implements IUpdateUserRepository {
  async updateUser(id: string, params: IUpdateUserParams): Promise<IUser> {
    await MongoClient.db.collection("users").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...params,
        },
      }
    );
    const user = await MongoClient.db
      .collection<Omit<IUser, "id">>("users")
      .findOne({ _id: new ObjectId(id) });

    if (!user) {
      throw new Error("user not updated");
    }
    const { _id, ...rest } = user;
    return { id: _id.toHexString(), ...rest };
  }
}
