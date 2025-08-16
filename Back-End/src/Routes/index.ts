import {Router} from "express";
import usersRouter from "./user.routes.ts";
import todoRouter from "./todo.routes.ts";

const routes = Router();

routes.use('/user', usersRouter);
routes.use('/task', todoRouter);

export default routes;

