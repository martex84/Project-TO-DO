import dataBase from "./index.ts";
import jwt from "jsonwebtoken";
import type { SimplesUserTable } from "../types/dataBase.ts";

const secretKey = "teste";

/**
 * Função responsável por retornar a query para realizar a criação da tabela Pessoa
 * @returns Retorna a query para a crição da tabela pessoa
 */
function createTableUser() {
  return "CREATE TABLE IF NOT EXISTS PESSOA (ID INTEGER PRIMARY KEY, NOME TEXT , EMAIL TEXT, PASSWORD TEXT)";
}

/**
 * Função responsável por inserir um novo usuário no sistema
 * @param nome Recebe o nome do usuário
 * @param email Recebe o e-mail do usuário
 * @param password Recebe a senha do usuário
 */
async function createUser(
  nome: string,
  email: string,
  password: string
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    dataBase
      .getDataBase()
      .then((db) => {
        db.run(`INSERT INTO PESSOA (NOME, EMAIL, PASSWORD) VALUES (?,?,?)`, [
          nome,
          email,
          password,
        ])
          .then((dados) => {
            const lastId = dados.lastID;

            if (lastId) {
              console.log("Inserindo usuário");
              resolve(true);
            } else {
              console.error("Falha ao executar a inserção");
              resolve(false);
            }
          })
          .catch((error) => {
            console.error("Falha ao executar a inserção");

            throw new Error(error);
          });
      })
      .catch((error) => {
        console.log("Falha ao tentar realizar a execução" + "\n\n" + error);

        reject(error);
      });
  });
}

/**
 * Função responsável por verificar se um usuário contem cadastro a partir de seu e-mail e senha
 * @param email Recebe o e-mail do usuário
 * @param password Recebe a senha do usuário
 * @returns Retorna true caso o usuário seja encontrado do contrário irá retornar false
 */
async function checkUser(email: string, password: string): Promise<boolean> {
  //Verifica usário por meio do e-mail e senha e retorna o id
  return new Promise((resolve, reject) => {
    dataBase
      .getDataBase()
      .then((db) => {
        db.get(`SELECT ID FROM PESSOA WHERE EMAIL = ? AND PASSWORD = ?`, [
          email,
          password,
        ])
          .then((dados) => {
            resolve(!(dados === undefined || dados === null));
          })
          .catch((error) => {
            console.error("Falha ao executar a busca");

            reject(error);
          });
      })
      .catch((error) => {
        console.log("Falha ao tentar realizar a execução" + "\n\n" + error);

        reject(error);
      });
  });
}

async function getDataUser(id: number): Promise<SimplesUserTable | undefined> {
  //Verifica usuário por meio do id e traz todos os dados
  //Verifica usário por meio do e-mail e senha e retorna o id
  return new Promise((resolve, reject) => {
    dataBase
      .getDataBase()
      .then((db) => {
        db.get(`SELECT NOME, EMAIL FROM PESSOA WHERE ID = ?`, [id])
          .then((dados: SimplesUserTable) => {
            if (!dados) resolve(undefined);

            resolve(dados);
          })
          .catch((error) => {
            console.error("Falha ao executar a busca");

            reject(error);
          });
      })
      .catch((error) => {
        console.log("Falha ao tentar realizar a execução" + "\n\n" + error);

        reject(error);
      });
  });
}

async function createToken(
  email: string,
  password: string
): Promise<string | undefined> {
  return new Promise((resolve, reject) => {
    try {
      const expiracao = "1h";

      const token = jwt.sign({ email, password }, secretKey, {
        expiresIn: expiracao,
      });

      resolve(token);
    } catch (error) {
      reject(error);
    }
  });
}

async function verificToken(token: string) : Promise<boolean>{
  return new Promise((resolve, reject) => {
    try {
      try {
        jwt.verify(token, secretKey);

        resolve(true);
      } catch (error) {
        return resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
}

const user = {
  createTableUser,
  createUser,
  checkUser,
  getDataUser,
  createToken,
  verificToken,
};

export default user;
