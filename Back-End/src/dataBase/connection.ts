import { DataTypes, Sequelize } from "sequelize";
import config from "./config.ts";

import { UserFunctions } from "../model/user.ts";
import User from "../model/user.ts";

import { TodoFunctions } from "../model/todo.ts";
import Todo from "../model/todo.ts";

import { dialects } from "../enums/dataBase.ts";
import env from "../env/index.ts";
import { envVariables } from "../enums/envs.ts";

let sequelize : Sequelize | null = null;

export function getSequelize() : Sequelize {
  if(sequelize) {
    console.log("Passando valor encontrado")

    return sequelize;
  }

  try {
    const novaConexao = new Sequelize(config.getConfig());

    console.info("Criando conexão")

    return novaConexao;
  } catch (error) {
    throw new Error("Falha na captura do dos dados do sequelize", {
      cause: error,
    });
  }
}

export async function initDb(sequelizeAtual? : Sequelize): Promise<boolean> {
  let objetoRetorno = false;

  try {
    const dadosSequelize = sequelizeAtual ?? getSequelize();

    if (!dadosSequelize) throw new Error("Falha no sequelize");

    await dadosSequelize.authenticate();

    console.log("Banco de dados Inicializado/Acessado!");

    UserFunctions.inicializar(dadosSequelize);

    TodoFunctions.inicializar(dadosSequelize);

    await dadosSequelize.sync();

    console.log("Tabelas sincronizadas");

    objetoRetorno = true;
  } catch (error) {
    console.error("Falha ao conectar com o banco de dados:", error);
  }

  return objetoRetorno;
}

export async function removeDb(sequelizeAtual? : Sequelize): Promise<boolean> {
  let valorRetorno = false;

  const dadosSequelize = sequelizeAtual ?? getSequelize();

  try {
    const nomeTabela = dadosSequelize.getDatabaseName();

    if (!nomeTabela) throw new Error("Falha na captura do nome da tabela");

    console.log("Apagando os dados das tabelas!")

    //Irá apagar as tabelas do banco de dados
    await dadosSequelize.drop();

    await dadosSequelize.sync({force: true})

    console.log("Dados das tabelas apagados com sucesso!")

    
  } catch (error) {
    console.error(error);

    valorRetorno = true;
  }

  return valorRetorno;
}
