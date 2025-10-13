import User from "../model/user.ts";
import jwt, { JwtPayload } from "jsonwebtoken";
import type { DadosToken, SimplesUserTable } from "../types/dataBase.ts";
import type {
  CreateUser,
  CreateTokenUser,
  GetIdByEmailPasswordUser,
  GetDadosSimplesUser,
} from "../types/service.interface.ts";

const secretKey = "teste";

/**
 * Função responsável por inserir um novo usuário no sistema
 * @param {Object} dados - Recebe o objeto com os dados do usuário
 * @returns {Promise<boolean>} - Retorna true para caso o usuário tenha sido criado e false para caso não tenha
 */
async function createUserService(dados: CreateUser): Promise<boolean> {
  try {
    const user = await User.create({
      email: "email@email.com",
      nome: "Nome Teste",
      password: "SenhaTeste",
    });

    if (!user) throw new Error("Falha na criação do usuário");

    return true;
  } catch (error) {
    console.error(error);

    return false;
  }
}

/**
 * Função responsável por captar o id do usuário a partir de seu e-mail e senha
 * @param dadosUsuario Recebe o objeto contendo os dados do usuário
 * @returns Caso tenha sucesso na busca irá retornar o id do usuário, do contrário irá retornar undefined
 */
async function getIdByEmailPassword(
  dadosUsuario: GetIdByEmailPasswordUser
): Promise<number | undefined> {
  const { email, password } = dadosUsuario;

  return new Promise(async (resolve) => {
    const dados = await User.findOne({
      where: { email: email, password: password },
    });

    if (dados === null) return resolve(undefined);

    const dadosUsuario = dados.dataValues;

    resolve(dadosUsuario.id);
  });
}

/**
 * Função responsável por trazer os dados mais simples do usuário a partir de seu ID
 * @param id Recebe o id que irá realizar a pesquisa
 * @returns Retorna os dados de nome e e-mail do usuário em caso de sucesso, em caso de falha irá retornar undefined
 */
async function getDataUser(id: number): Promise<GetDadosSimplesUser | undefined> {
  //Verifica usuário por meio do id e traz todos os dados
  //Verifica usário por meio do e-mail e senha e retorna o id
  return new Promise(async (resolve) => {
    const dados = await User.findOne({where:{id: id}});

    if(!dados) return undefined

    const dadosUsuario = dados.dataValues

    resolve({
      email: dadosUsuario.email,
      nome: dadosUsuario.nome
    })

    // dataBase
    //   .getDataBase()
    //   .then((db) => {
    //     db.get(`SELECT NOME, EMAIL FROM PESSOA WHERE ID = ?`, [id])
    //       .then((dados: SimplesUserTable) => {
    //         if (!dados) resolve(undefined);

    //         resolve(dados);
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

/**
 * Função responsável por verificar se um usuário contem cadastro a partir de seu e-mail e senha
 * @param email Recebe o e-mail do usuário
 * @param password Recebe a senha do usuário
 * @returns Retorna true caso o usuário seja encontrado do contrário irá retornar false
 */
async function checkUser(email: string, password: string): Promise<boolean> {
  //Verifica usário por meio do e-mail e senha e retorna o id
  return new Promise((resolve) => {
    getIdByEmailPassword({email,password}).then(dados => {
      resolve(!!dados);
    }).catch(()=> {
      resolve(false)
    })
  });
}

/**
 * TOKEN
 */

/**
 * Função responsável por criar token de acesso com base no e-mail e senha do usuário
 * @param {Object} dadosCriacaoToken Recebe os dados para criação do token
 * @returns Retorna o token de acesso em caso de sucesso e em caso falha irá retornar undefined
 */
async function createToken(
  dadosCriacaoToken: CreateTokenUser
): Promise<string> {
  return new Promise((resolve, reject) => {
    const { email, password } = dadosCriacaoToken;
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
  return new Promise(async (resolve, reject) => {
    try {
      try {
        const dadosToken: any = jwt.verify(token, secretKey);

        const dadosUsuario = await getIdByEmailPassword({
          email: dadosToken.email,
          password: dadosToken.password,
        });

        if (dadosUsuario) resolve(true);
        else resolve(false);
      } catch (error) {
        console.error(error);

        return resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Função responsável por captar o id do usuário a partir do seu token de acesso
 * @param token Recebe o token de acesso do usuário
 * @returns Retorna o id do usuário em caso de sucesso
 */
async function getIdByToken(token: string): Promise<number | undefined> {
  return new Promise((resolve, reject) => {
    try {
      //Verifica se o token é valido
      verificToken(token)
        .then(() => {
          const dadosToken: any = jwt.verify(token, secretKey);

          getIdByEmailPassword({
            email: dadosToken.email,
            password: dadosToken.password,
          })
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

export default {
  createUserService,
  getIdByEmailPassword,
  checkUser,
  getDataUser,
  getIdByToken,
  createToken,
  verificToken,
};
