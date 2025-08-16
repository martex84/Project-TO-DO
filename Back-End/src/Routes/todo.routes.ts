import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import todo from "../dataBase/todo";
import user from "../dataBase/user";
import { SimpleTodo } from "../types/dataBase";

const todoRouter = Router();

todoRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  interface ObjetoRetorno {
    message: string;
    tasks?: SimpleTodo[];
  }

  const headers = req.headers;
  const objetoRetorno: ObjetoRetorno = {
    message: "",
  };
  let status = 200;

  if (!headers) throw new Error("Falha ao localizar o headers");

  const token =
    headers.token && typeof headers.token === "string" ? headers.token : "";

  const verificacaoToken = await user.verificToken(token);

  if (verificacaoToken) {
    const idUsuario = await user.getIdByToken(token);

    status = 500;
    objetoRetorno.message = "Falha na busca da task";

    if (idUsuario) {
      const dadosTask: SimpleTodo[] | undefined = await todo.getTask(idUsuario);

      if (dadosTask && Array.isArray(dadosTask)) {
        status = 200;
        objetoRetorno.message = "Task encontrada";

        objetoRetorno.tasks = [...dadosTask];
      }
    }
  } else {
    objetoRetorno.message = "Token inválido";
    status = 401;
  }

  res.status(status).send(objetoRetorno);
});

todoRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    interface ObjetoRetorno {
      message: string;
    }

    const headers = req.headers;
    const objetoRetorno: ObjetoRetorno = {
      message: "",
    };
    let status = 200;

    if (!headers) throw new Error("Falha ao localizar o headers");

    const token =
      headers.token && typeof headers.token === "string" ? headers.token : "";
    const descricao =
      headers.descricao && typeof headers.descricao === "string"
        ? headers.descricao
        : "";
    const statusTask =
      headers.status && typeof headers.status === "string"
        ? headers.status
        : "";

    const verificacaoToken = await user.verificToken(token);

    if (verificacaoToken) {
      const idUsuario = await user.getIdByToken(token);

      status = 500;
      objetoRetorno.message = "Falha na criação da task";

      if (idUsuario) {
        const criacaoTask = await todo.createTaskTodo(
          idUsuario,
          descricao,
          statusTask
        );

        if (criacaoTask) {
          status = 200;
          objetoRetorno.message = "Task criada com sucesso";
        }
      }
    } else {
      objetoRetorno.message = "Token inválido";
      status = 401;
    }

    res.status(status).send(objetoRetorno);
  }
);

export default todoRouter;
