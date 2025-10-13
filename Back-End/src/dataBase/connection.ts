import { DataTypes, Sequelize } from "sequelize";
import config from "./config.ts";

import {UserFunctions} from "../model/user.ts";
import User from "../model/user.ts";

import {TodoFunctions} from "../model/todo.ts";
import Todo from "../model/todo.ts";

const sequelize = () => {
  try {
    const sequelize = new Sequelize(config.getConfig());

    return sequelize;
  } catch (error) {
    throw new Error("Falha na captura do dos dados do sequelize", {
      cause: error,
    });
  }
};

export async function initDb() {
  try {
    const dadosSequelize = sequelize();

    if (!dadosSequelize) throw new Error("Falha no sequelize");

    await dadosSequelize.authenticate();

    console.log("Banco de dados Inicializado/Acessado!");

    UserFunctions.inicializar(dadosSequelize);

    TodoFunctions.inicializar(dadosSequelize)

    await dadosSequelize.sync();

    console.log("Tabelas sincronizadas");
  } catch (error) {
    console.error("Falha ao conectar com o banco de dados:", error);
  }
}

export default sequelize;
