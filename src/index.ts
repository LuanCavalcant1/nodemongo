import express, { Request, Response } from "express";
import { config } from "dotenv";
import { GetUsersController } from "./controllers/get-users/get-users";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo/get/users";

config();

const app = express();

const port = process.env.PORT || 3333;

app.get("/users", async (request: Request, response: Response) => {
  const mongoGetUsersRepositories = new MongoGetUsersRepository();

  const getUsersController = new GetUsersController(mongoGetUsersRepositories);

  const { body, statusCode } = await getUsersController.handle();

  response.send(body).status(statusCode);
});
app.listen(port, () => console.log(`listening on port ${port}!`));
