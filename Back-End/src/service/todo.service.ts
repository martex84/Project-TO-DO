import Todo from "../model/todo";
import { SimpleTodo } from "../types/dataBase";
import { CreateTodo } from "../types/service.interface";

/**
 * Função responsável por inserir uma nova task para o TODO
 * @param dados Recebe o objeto com os dados para a criação da task
 */
async function createTaskTodo(dados: CreateTodo): Promise<boolean> {
  return new Promise(async (resolve) => {
    let retorno = false;

    try {
      await Todo.create({
        concluido: 0,
        id_pessoa: dados.idPessoa,
        descricao: dados.descricao,
        status: dados.status,
      });

      retorno = true;
    } catch (error) {
      console.error("Falha ao executar a inserção!" + "\n" + error);
    }

    return resolve(retorno);

    //     dataBase
    //       .getDataBase()
    //       .then((db) => {
    //         db.run(
    //           `INSERT INTO TODO (ID_PESSOA, DESCRICAO, STATUS, CONCLUIDO) VALUES (?,?,?,?)`,
    //           [idPessoa, descricao, status, 0]
    //         )
    //           .then((dados) => {
    //             const lastId = dados.lastID;

    //             if (lastId) {
    //               console.log("Inserindo task");
    //               resolve(true);
    //             } else {
    //               console.error("Falha ao executar a inserção");
    //               resolve(false);
    //             }
    //           })
    //           .catch((error) => {
    //             console.error("Falha ao executar a inserção");

    //             throw new Error(error);
    //           });
    //       })
    //       .catch((error) => {
    //         console.log("Falha ao tentar realizar a execução" + "\n\n" + error);

    //         reject(error);
    //       });
  });
}

/**
 * Função responsável por trazer as task pendentes
 * @param idPessoa Recebe o id que irá realizar a pesquisa
 * @returns Retorna os dados de nome e e-mail do usuário em caso de sucesso, em caso de falha irá retornar undefined
 */
async function getTask(idPessoa: number): Promise<SimpleTodo[] | undefined> {
  //Verifica usuário por meio do id e traz todos os dados
  //Verifica usário por meio do e-mail e senha e retorna o id
  return new Promise(async (resolve, reject) => {
    const dados = await Todo.findAll({
      where: {
        concluido: 0,
        id_pessoa: idPessoa,
      },
    });

    if (!dados) return resolve(undefined);

    const listaDados: SimpleTodo[] = [];

    try {
      dados.forEach((item) => {
        const dataValue = item.dataValues;

        if (!dataValue) throw new Error("Erro Task");

        listaDados.push({
          descricao: dataValue.descricao,
          status: dataValue.status
        })
      });

      if(listaDados.length === 0) return resolve(undefined);

      return resolve(listaDados)
    } catch (error) {

      console.error(error);

      return resolve(undefined);
    }

    // dataBase
    //   .getDataBase()
    //   .then((db) => {
    //     db.all(`SELECT DESCRICAO, STATUS FROM TODO WHERE CONCLUIDO = 0 AND ID_PESSOA = ?`, [idPessoa])
    //       .then((dados: any[]) => {
    //         if (!dados) resolve(undefined);

    //         const listaDados : SimpleTodo[] = [];

    //         if(!Array.isArray(dados)) return resolve(undefined)

    //         dados.forEach(item => {
    //           listaDados.push({
    //             descricao: item["DESCRICAO"],
    //             status: item["STATUS"]
    //           })
    //         })

    //         resolve(listaDados);
    //       })
    //       .catch((error) => {
    //         console.error("Falha ao executar a busca");

    //         reject(error);
    //       });
    //   })
    //   .catch((error) => {
    //     console.log("Falha ao tentar realizar a execução" + "\n\n" + error);

    //     reject(error);
    //   });
  });
}

export default {
  createTaskTodo,
  getTask,
};
