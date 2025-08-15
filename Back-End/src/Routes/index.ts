import {Router} from "express";
import usersRouter from "./user.routes.ts";

const routes = Router();

routes.use('/user', usersRouter);

export default routes;

