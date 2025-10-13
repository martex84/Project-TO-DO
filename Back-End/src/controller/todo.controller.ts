import { Request } from "express";
import {
  ObjetoRetornoCreateTodo,
  ObjetoRetornoGetTodo,
} from "../types/controller.interface";
import userService from "../service/user.service";
import todoService from "../service/todo.service";
import { SimpleTodo } from "../types/dataBase";

async function createTaskTodo(req: Request): Promise<ObjetoRetornoCreateTodo> {
  //Cria o objeto de retorno com os dados de token inválido
  const objetoRetorno: ObjetoRetornoCreateTodo = {
    message: "Token inválido",
    status: 401,
  };

  const headers = req.headers;

  if (!headers) throw new Error("Falha ao localizar o headers");

  const token =
    headers.token && typeof headers.token === "string" ? headers.token : "";
  const descricao =
    headers.descricao && typeof headers.descricao === "string"
      ? headers.descricao
      : "";
  const statusTask =
    headers.status && typeof headers.status === "string" ? headers.status : "";

  const verificacaoToken = await userService.verificToken(token);

  if (verificacaoToken) {
    const idPessoa = await userService.getIdByToken(token);

    if (idPessoa) {
      objetoRetorno.status = 500;
      objetoRetorno.message = "Falha na criação da task";

      const criacaoTask = await todoService.createTaskTodo({
        idPessoa: idPessoa,
        descricao: descricao,
        status: statusTask,
      });

      if (criacaoTask) {
        objetoRetorno.status = 200;
        objetoRetorno.message = "Task criada com sucesso";
      }
    }
  }

  return objetoRetorno;
}

async function getTaskTodo(req: Request): Promise<ObjetoRetornoGetTodo> {
  //Inicia o objeto de retorno com a mensagem e status para token inválido
  const objetoRetorno: ObjetoRetornoGetTodo = {
    message: "Token inválido",
    status: 401,
  };

  const headers = req.headers;

  if (!headers) throw new Error("Falha ao localizar o headers");

  const token =
    headers.token && typeof headers.token === "string" ? headers.token : "";

  const verificacaoToken = await userService.verificToken(token);

  if (verificacaoToken) {
    const idUsuario = await userService.getIdByToken(token);

    if (idUsuario) {
      objetoRetorno.status = 500;
      objetoRetorno.message = "Falha na busca da task";

      const dadosTask: SimpleTodo[] | undefined = await todoService.getTask(idUsuario);

      if (dadosTask && Array.isArray(dadosTask)) {
        objetoRetorno.status = 200;
        objetoRetorno.message = "Task encontrada";

        objetoRetorno.task = [...dadosTask];
      }
    }
  }

  return objetoRetorno;
}

/**
 * APAGAR

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
  }

  res.status(status).send(objetoRetorno);
 * 
 * APAGAR
 */

export default {
  createTaskTodo,
  getTaskTodo
};
