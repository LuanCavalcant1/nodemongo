import express, { Request, Response } from "express";

import { config } from "dotenv";
import { GetUsersController } from "./controllers/get-users/get-users";

import { MongoClient } from "./database/mongo";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users";
import { MongoCreateUserRepository } from "./repositories/create-user/mongo-create-user";
import { CreateUserController } from "./controllers/create-user/create-user";
import { MongoUpdateUsersRepository } from "./repositories/update-user/mongo-update-user";
import { UpdateUserController } from "./controllers/update-user/update-user";
import { MongoDeleteUserRepository } from "./repositories/delete-user/mongo-delete-user";
import { DeleteUserController } from "./controllers/delete-user/delete-user";

const main = async () => {
  config();

  const app = express();
  app.use(express.json());

  await MongoClient.connect();

  app.get("/users", async (request: Request, response: Response) => {
    const mongoGetUsersRepositories = new MongoGetUsersRepository();

    const getUsersController = new GetUsersController(
      mongoGetUsersRepositories
    );

    const { body, statusCode } = await getUsersController.handle();

    response.status(statusCode).send(body);
  });

  app.post("/users", async (request: Request, response: Response) => {
    const mongoCreateUserRepository = new MongoCreateUserRepository();

    const createUserController = new CreateUserController(
      mongoCreateUserRepository
    );

    const { body, statusCode } = await createUserController.handle({
      body: request.body,
    });

    response.status(statusCode).send(body);
  });

  app.patch("/users/:id", async (request: Request, response: Response) => {
    const mongoUpdateUserRepository = new MongoUpdateUsersRepository();

    const updateUserController = new UpdateUserController(
      mongoUpdateUserRepository
    );

    const { body, statusCode } = await updateUserController.handle({
      body: request.body,
      params: request.params,
    });

    response.status(statusCode).send(body);
  });

  app.delete("/users/:id", async (request: Request, response: Response) => {
    const mongoDeleteUserRepository = new MongoDeleteUserRepository();

    const deleteUserController = new DeleteUserController(
      mongoDeleteUserRepository
    );

    const { body, statusCode } = await deleteUserController.handle({
      params: request.params,
    });

    response.status(statusCode).send(body);
  });

  const port = process.env.PORT || 3333;

  app.listen(port, () => console.log(`listening on port ${port}!`));
};

main();
