import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import user from "../dataBase/user";

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

      if (idUsuario) {
        const dadosUsuario: any = await user.getDataUser(idUsuario);

        if (dadosUsuario !== undefined) {
          objetoRetorno.message = "Usuário encontrado"

          objetoRetorno.dadosUsuario = {
            nome: dadosUsuario.NOME,
            email: dadosUsuario.EMAIL,
          };
        } else {
          status = 500;
          objetoRetorno.message = "Falha na captura do usuário";
        }
      } else {
        status = 500;
        objetoRetorno.message = "Falha na captura do usuário";
      }
    } else {
      status = 401;
      objetoRetorno.message = "Token inválido";
    }

    res.status(status).send(objetoRetorno);
  }
);

usersRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const headers = req.headers;

    if (!headers) throw new Error("Falha ao localizar o headers");

    const nome =
      headers.nome && typeof headers.nome === "string" ? headers.nome : "";
    const email =
      headers.email && typeof headers.email === "string" ? headers.email : "";
    const password =
      headers.password && typeof headers.password === "string"
        ? headers.password
        : "";

    Object.keys(headers).forEach((key) => {
      if (!headers[key]) throw new Error("O campo '" + key + "' está vazio!");
    });

    const criacaoUsuario = await user.createUser(nome, email, password);

    let mensagem;

    if (criacaoUsuario) mensagem = "Usuário criado com sucesso!";
    else mensagem = "Falha na criação do usuário!";

    res.send({ mensagem });
  }
);

usersRouter.get(
  "/authenticate",
  async (req: Request, res: Response, next: NextFunction) => {
    const headers = req.headers;

    if (!headers) throw new Error("Falha ao localizar o headers");

    const email =
      headers.email && typeof headers.email === "string" ? headers.email : "";
    const password =
      headers.password && typeof headers.password === "string"
        ? headers.password
        : "";

    //Verifica se o e-mail e senha do usuário já está cadastrado no sistema
    const resultadoBusca = await user.checkUser(email, password);

    let objetoRetorno = {
      message: "",
      token: "",
    };
    let status;

    //Usuário encontrado
    if (resultadoBusca) {
      const token = await user.createToken(email, password);

      if (!token) throw new Error("Falha na criação do token");

      objetoRetorno.message = "Usuário Encontrado";
      objetoRetorno.token = token;
      status = 200;
    }

    //Usuário não encontrado
    else {
      objetoRetorno.message = "Usuário não encontrado";
      status = 401;
    }

    res.status(status).send(objetoRetorno);
  }
);

export default usersRouter;
