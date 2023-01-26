import { ObjectId } from "mongodb";
import { IDeleteuserRepository } from "../../controllers/delete-user/protocols";
import { MongoClient } from "../../database/mongo";
import { IUser } from "../../models/user";

export class MongoDeleteUserRepository implements IDeleteuserRepository {
  async deleteUser(id: string): Promise<IUser> {
    const user = await MongoClient.db
      .collection<Omit<IUser, "id">>("users")
      .findOne({ _id: new Object(id) });

    if (!user) {
      throw new Error("User not found");
    }

    const { deletedCount } = await MongoClient.db
      .collection("users")
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedCount) {
      throw new Error("User not deleted");
    }
    const { _id, ...rest } = user;
    return { id: _id.toHexString(), ...rest };
  }
}
