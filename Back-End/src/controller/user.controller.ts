import userService from "../service/user.service.ts";

import type {
  ObjetoRetornoCreateUser,
  ObjetoRetornoGetUser,
  ObjetoRetornoAuthenticate,
} from "../types/controller.interface.ts";

import { Request } from "express";

async function createUser(req: Request): Promise<ObjetoRetornoCreateUser> {
  const objetoRetorno: ObjetoRetornoCreateUser = {
    mensagem: "Falha na criação do usuário!",
  };

  try {
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

    const user = await userService.createUserService({
      email: email,
      nome: nome,
      password: password,
    });

    if (!user) throw new Error();

    objetoRetorno.mensagem = "Usuário criado com sucesso!";

    const token = await userService.createToken({ email, password });

    if (token) {
      objetoRetorno.mensagem = "Usuário criado com sucesso!";
      objetoRetorno.token = token;
    }
  } catch (error) {
    const mensagemErro = "Falha na criação do usuário";

    throw new Error(mensagemErro, { cause: error });
  } finally {
    return objetoRetorno;
  }
}

async function getUser(req: Request): Promise<ObjetoRetornoGetUser> {  

  //Inicia o objeto com erro de token inválido
  let objetoRetornoGetUser: ObjetoRetornoGetUser = {
    message: "Token inválido",
    status: 401,
  };

  try {
    const headers = req.headers;

    if (!headers) throw new Error("Falha ao localizar o headers");

    const token =
      headers.token && typeof headers.token === "string" ? headers.token : "";

    const verificacaoToken = await userService.verificToken(token);

    if (verificacaoToken) {
      const idUsuario = await userService.getIdByToken(token);

      //Passa valor para caso falhe na captura do usuário
      objetoRetornoGetUser.status = 500;
      objetoRetornoGetUser.message = "Falha na captura do usuário";

      if (idUsuario) {
        const dadosUsuario: any = await userService.getDataUser(idUsuario);

        if (dadosUsuario !== undefined) {
          objetoRetornoGetUser.message = "Usuário encontrado";

          objetoRetornoGetUser.status = 200

          objetoRetornoGetUser.dadosUsuario = {
            nome: dadosUsuario.nome,
            email: dadosUsuario.email,
          };
        }
      }
    }

  } catch (error) {
    console.error(error);
  } 
  
  return objetoRetornoGetUser;
}

async function getAuthenticate(
  req: Request
): Promise<ObjetoRetornoAuthenticate> {
  let objetoRetorno: ObjetoRetornoAuthenticate = {
    message: "Usuário não encontrado",
    status: 401,
  };

  const headers = req.headers;

  if (!headers) throw new Error("Falha ao localizar o headers");

  const email =
    headers.email && typeof headers.email === "string" ? headers.email : "";
  const password =
    headers.password && typeof headers.password === "string"
      ? headers.password
      : "";

  //Verifica se o e-mail e senha do usuário já está cadastrado no sistema
  const resultadoBusca = await userService.checkUser(email, password);

  //Usuário encontrado
  if (resultadoBusca) {
    const token = await userService.createToken({ email, password });

    if (!token) throw new Error("Falha na criação do token");

    objetoRetorno.message = "Usuário Encontrado";

    objetoRetorno.status = 200;

    objetoRetorno.return = {
      token: token,
    };
  }

  return objetoRetorno;
}

/**
 * APAGAR
 * usersRouter.get(
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
 * APAGAR
 */

export default {
  createUser,
  getUser,
  getAuthenticate,
};
