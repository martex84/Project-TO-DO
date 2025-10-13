import sqlite3 from "sqlite3";
import { open } from "sqlite";
import user from "./user.ts";
import todo from "./todo.ts";
import { DataTypes, Sequelize, Model } from "sequelize";
import path from "path";
import { nameTables } from "../enums/dataBase.ts";
import { TodoModel, UserModel } from "../types/dataBase.ts";

const fileName = "./src/dataBase/dataBase.db";

function connectionDataBase(): Sequelize {
  const storage = path.resolve("src", "dataBase", "dataBase.sqlite");

  const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: storage,
  });

  return sequelize;
}

async function getTables(
  sequelize: Sequelize,
  nomeTabela: nameTables
): Promise<TodoModel | UserModel> {
  const colunaId = {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  };

  return new Promise((resolve, reject) => {
    const sequelize = connectionDataBase();

    switch (nomeTabela) {
      case nameTables.TODO: {
        const Todo = sequelize.define<TodoModel>("TODO", {
          id: colunaId,
          id_pessoa: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          descricao: {
            type: DataTypes.STRING,
          },
          status: {
            type: DataTypes.STRING,
            // type: DataTypes.ENUM,
            // values:[""],
            allowNull: false,
          },
          concluido: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
        });

        Todo.sync();

        break;
      }

      case nameTables.USERS: {
        const User = sequelize.define("USER", {
          id: colunaId,
          nome: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false,
          },
        });

        User.sync();
        return User;
      }
    }
  });
}

async function createTables(sequelize: Sequelize) {
  getTables(sequelize, nameTables.TODO);
  getTables(sequelize, nameTables.USERS);
}

async function initDataBase() {
  let returno = false;

  const dataBase = getDataBase();

  await dataBase
    .then(async (db) => {
      //Irá realizar a verificação/criação da tabela pessoa
      await db.exec(user.createTableUser()).then(() => {
        console.log("Criando a tabela Pessoa!");
        returno = true;
      });

      //Irá realizar a verificação/criação da tabela todo
      await db.exec(todo.createTableTodo()).then(() => {
        console.log("Criando a tabela TODO!");
        returno = true;
      });
    })
    .catch((error) => {
      console.log(error);
    });

  return returno;
}

async function getDataBase() {
  return open({
    filename: fileName,
    driver: sqlite3.Database,
  });
}

const dataBase = {
  fileName,
  initDataBase,
  getDataBase,
  connectionDataBase,
  createTables,
  getTables
};

export default dataBase;
