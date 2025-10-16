import dotenv from "dotenv";
import internalPath from "../internalPath.ts";
import { EnumPath } from "../enums/path.ts";
import { AMBIENTES } from "../enums/ambientes.ts";
import { envVariables } from "../enums/envs";

/**
 * Função responsável por carregar os dados das env de acordo com o ambiente
 * @returns Retorna uma promise indicando se o carregamento foi sucesso ou falha
 */
export async function carregarEnv(): Promise<boolean> {
  let valorRetorno: boolean = false;

  try {
    dotenv.config({
      path: internalPath(EnumPath.ENV) + "/.env",
    });

    let ambienteAtual = process.env.NODE_ENV;

    if(!ambienteAtual) throw new Error("Falha na captura do ambiente atual");

    ambienteAtual = ambienteAtual.toString().toUpperCase();

    //Carrega dados do env no ambiente de desenvolvimento
    if (ambienteAtual === AMBIENTES.DEVELOPMENT) {
      dotenv.config({
        path: internalPath(EnumPath.ENV) + "/.env.development",
      });
    }
    if(ambienteAtual === AMBIENTES.TEST){
      dotenv.config({
        path: internalPath(EnumPath.ENV) + "/.env.test"
      })
    }

    valorRetorno = true;
  } catch (error) {
    console.error(error);

    valorRetorno = false;
  }

  return valorRetorno;
}

export default (variavel: envVariables) => {
  let retorno = undefined;

  switch (variavel) {
    case envVariables.DIALECT: {
      retorno = process.env.DIALECT;
      break;
    }

    case envVariables.STORAGE: {
      retorno = process.env.STORAGE;

      break;
    }

    case envVariables.NAME: {
      retorno = process.env.NAME;

      break;
    }

    case envVariables.DADOS_USUARIO_TESTE_EMAIL :{
      retorno = process.env.DADOS_USUARIO_TESTE_EMAIL

      break;
    }

    case envVariables.DADOS_USUARIO_TESTE_NOME :{
      retorno = process.env.DADOS_USUARIO_TESTE_NOME

      break;
    }

    case envVariables.DADOS_USUARIO_TESTE_PASSWORD :{
      retorno = process.env.DADOS_USUARIO_TESTE_PASSWORD

      break;
    }

    default: {
      throw new Error("Falha ao encontrar a variável informada");
    }
  }

  if(!retorno) throw new Error("Falha ao captar o valor '" + variavel + "' do usuário");

  return retorno;
};
