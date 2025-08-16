import dataBase from "./index.ts";
import jwt, { JwtPayload } from "jsonwebtoken";
import type { DadosToken, SimplesUserTable } from "../types/dataBase.ts";

const secretKey = "teste";

/**
 * Função responsável por retornar a query para realizar a criação da tabela Pessoa
 * @returns Retorna a query para a crição da tabela Pessoa
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
    getIdByEmailPassword(email,password).then(dados => {
      resolve(!!dados);
    }).catch(()=> {
      resolve(false)
    })
  });
}

/**
 * Função responsável por captar o id do usuário a partir de seu e-mail e senha
 * @param email Recebe o e-mail do usuário
 * @param password Recebe a senha do usuário
 * @returns Caso tenha sucesso na busca irá retornar o id do usuário, do contrário irá retornar undefined
 */
async function getIdByEmailPassword(
  email: string,
  password: string
): Promise<number | undefined> {
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
            const verificacaoId = !(dados === undefined || dados === null);

            //Caso o id não seja encontrado
            if (verificacaoId === false) resolve(undefined);

            resolve(dados.ID);
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

/**
 * Função responsável por trazer os dados mais simples do usuário a partir de seu ID
 * @param id Recebe o id que irá realizar a pesquisa
 * @returns Retorna os dados de nome e e-mail do usuário em caso de sucesso, em caso de falha irá retornar undefined
 */
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

/**
 * Função responsável por criar token de acesso com base no e-mail e senha do usuário
 * @param email Recebe o e-mail que será usado na criação do token
 * @param password Recebe a senha que será usado na criação do token
 * @returns Retorna o token de acesso em caso de sucesso e em caso falha irá retornar undefined
 */
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

/**
 * Função responsável por verificar o token de acesso do usuário
 * @param token Recebe o token de acesso que irá ser utilizado na verificação
 * @returns Retorna true para caso o token seja válido, do contrário irá retornar false
 */
async function verificToken(token: string): Promise<boolean> {
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

async function getIdByToken(token: string): Promise<number | undefined> {
  return new Promise((resolve, reject) => {
    try {
      //Verifica se o token é valido
      verificToken(token)
        .then(() => {
          const dadosToken: any = jwt.verify(token, secretKey);

          getIdByEmailPassword(dadosToken.email, dadosToken.password)
            .then((dados) => {
              resolve(dados);
            })
            .catch((erro) => {
              throw new Error(erro);
            });
        })
        .catch(() => resolve(undefined));
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
  getIdByToken,
};

export default user;
