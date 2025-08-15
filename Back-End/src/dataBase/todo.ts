import { SimpleTodo } from "../types/dataBase.ts";
import dataBase from "./index.ts";

/**
 * Função responsável por retornar a query para realizar a criação da tabela TODO
 * @returns Retorna a query para a crição da tabela TODO
 */
function createTableTodo() {
  return "CREATE TABLE IF NOT EXISTS TODO (ID INTEGER PRIMARY KEY, ID_PESSOA TEXT , DESCRICAO TEXT, STATUS TEXT, CONCLUIDO INTEGER)";
}

/**
 * Função responsável por inserir uma nova task para o TODO
 * @param idPessoa Recebe o id do usuário
 * @param descricao Recebe a descrição da task
 * @param status Recebe o status da task
 */
async function createTaskTodo(
  idPessoa: number,
  descricao: string,
  status: string
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    dataBase
      .getDataBase()
      .then((db) => {
        db.run(`INSERT INTO TODO (ID_PESSOA, DESCRICAO, STATUS, CONCLUIDO) VALUES (?,?,?,?)`, [
          idPessoa,
          descricao,
          status,
          0
        ])
          .then((dados) => {
            const lastId = dados.lastID;

            if (lastId) {
              console.log("Inserindo task");
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
 * Função responsável por trazer as task pendentes
 * @param idPessoa Recebe o id que irá realizar a pesquisa
 * @returns Retorna os dados de nome e e-mail do usuário em caso de sucesso, em caso de falha irá retornar undefined
 */
async function getTask(idPessoa: number): Promise<SimpleTodo | undefined> {
  //Verifica usuário por meio do id e traz todos os dados
  //Verifica usário por meio do e-mail e senha e retorna o id
  return new Promise((resolve, reject) => {
    dataBase
      .getDataBase()
      .then((db) => {
        db.get(`SELECT DESCRICAO, STATUS FROM TODO WHERE CONCLUIDO = 0 AND ID_PESSOA = ?`, [idPessoa])
          .then((dados: SimpleTodo) => {
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

const todo = {
    createTableTodo,
    createTaskTodo,
    getTask 
}

export default todo;