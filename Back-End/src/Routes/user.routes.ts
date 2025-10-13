import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import userController from "../controller/user.controller.ts"

const usersRouter = Router();

usersRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    interface ObjetoRetorno {
      message: string;
      dadosUsuario?: {
        nome: string;
        email: string;
      };
    }

    const objetoRetorno = await userController.getUser(req);

    res.status(objetoRetorno.status).send({
      message: objetoRetorno.message,
      dadosUsuario: objetoRetorno.dadosUsuario
    });
  }
);

usersRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {

    const objetoRetorno = await userController.createUser(req);

    res.send(objetoRetorno);
  }
);

usersRouter.get(
  "/authenticate",
  async (req: Request, res: Response, next: NextFunction) => {
    const objetoRetorno = await userController.getAuthenticate(req);

    res.status(objetoRetorno.status).send({token: objetoRetorno.return?.token});
  }
);

export default usersRouter;
