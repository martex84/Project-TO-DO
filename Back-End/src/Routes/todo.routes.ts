import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import controlerTodo from "../controller/todo.controller";

const todoRouter = Router();

todoRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const objetoRetorno = await controlerTodo.getTaskTodo(req);

  res
    .status(objetoRetorno.status)
    .send({ message: objetoRetorno.message, task: objetoRetorno.task });
});

todoRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const objetoRetorno = await controlerTodo.createTaskTodo(req);

    res.status(objetoRetorno.status).send({ message: objetoRetorno.message });
  }
);

export default todoRouter;
