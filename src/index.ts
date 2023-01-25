import express, { Request, Response } from "express";
import { config } from "dotenv";
import { GetUsersController } from "./controllers/get-users/get-users";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo/get/users";
import { MongoClient } from "./database/mongo";

const main = async () => {
  config();

  const app = express();

  await MongoClient.connect();

  app.get("/users", async (request: Request, response: Response) => {
    const mongoGetUsersRepositories = new MongoGetUsersRepository();

    const getUsersController = new GetUsersController(
      mongoGetUsersRepositories
    );

    const { body, statusCode } = await getUsersController.handle();

    response.send(body).status(statusCode);
  });

  const port = process.env.PORT || 3333;

  app.listen(port, () => console.log(`listening on port ${port}!`));
};

main();
