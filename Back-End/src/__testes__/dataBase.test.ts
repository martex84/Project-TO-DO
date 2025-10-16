import { Sequelize } from "sequelize";
import { getSequelize, initDb, removeDb } from "../dataBase/connection.ts";
import { carregarEnv } from "../env";
import userService from "../service/user.service.ts";
import todoService from "../service/todo.service.ts";
import { envVariables } from "../enums/envs.ts";
import valorEnv from "../env";

interface dadosUsuario {
  nome: string;
  email: string;
  password: string;
}

describe("Testes Data Base", () => {
  afterAll(async () => {
    removeDb();
  });

  test("DATA BASE - Carregamento dotenv", async () => {
    const resutado = carregarEnv();

    expect(resutado).toBeTruthy();
  });

  test("DATA BASE - Teste verificação/criação de banco de dados", async () => {
    console.log("Iniciando teste verificação");

    await carregarEnv();

    const resultado = await initDb();

    expect(resultado).toBeTruthy();
  });
});

describe("Testes Tabelas", () => {
  let idUsuario: number | undefined;

  let sequelize: Sequelize | null = null;

  let dadosUsuario: dadosUsuario = {
    nome: "",
    email: "",
    password: "",
  };

  beforeAll(async () => {
    try {
      console.log("Preprando configurações para os testes!");

      await carregarEnv();

      dadosUsuario = {
        nome: valorEnv(envVariables.DADOS_USUARIO_TESTE_NOME),
        email: valorEnv(envVariables.DADOS_USUARIO_TESTE_EMAIL),
        password: valorEnv(envVariables.DADOS_USUARIO_TESTE_PASSWORD),
      };

      sequelize = getSequelize();

      await initDb(sequelize);

      //Criando usuário teste
      idUsuario = await userService.createUser(dadosUsuario);

      if (!idUsuario) throw new Error("Falha na captura do id do usuário");
    } catch (error) {
      console.error(
        "Erro na preparação das configurações para os testes!" + "\n" + error
      );
    }
  });

  afterAll(async () => {
    try {
      console.log("Preparando os processo para o encerramento dos testes!");

      if (!sequelize) throw new Error("Falha ao localizar o sequeliza aberto");

      await removeDb(sequelize);
    } catch (error) {
      console.error(
        "Falha no preparo dos processo para o encerramento dos testes!" +
          "\n" +
          error
      );
    }
  });

  /**
   * TESTES USER
   */

  test("USER - Teste na captura de usuário", async () => {
    console.log("Iniciando a verificação de captura de um usuário teste");

    if (!idUsuario) throw new Error("Falha na captura do id do usuário");

    const busca = await userService.getDataUser(idUsuario);

    expect(!(busca === undefined || busca === null)).toBeTruthy();
  });

  test("USER - Teste na checkagem do usuário", async () => {
    console.log("Iniciando a verificação da checagem do usuário");

    if (!idUsuario) throw new Error("Falha na captura do id do usuário");

    const retorno = await userService.checkUser(
      dadosUsuario.email,
      dadosUsuario.password
    );

    expect(typeof retorno === "boolean").toBeTruthy();
  });

  test("USER - Teste na criação de usuário", async () => {
    console.log("Iniciando a verificação da criação do usuário");

    //Remove usuários antigos
    if (!sequelize) throw new Error("Falha ao localizar o sequelize");

    await removeDb(sequelize);

    const resultado = await userService.createUser(dadosUsuario);

    expect(resultado).toBeTruthy();
  });

  test("USER - Teste na criação do token de acesso", async () => {
    console.log("Inicio da criação do token de acesso!");

    const token = await userService.createToken({
      email: dadosUsuario.email,
      password: dadosUsuario.password,
    });

    if (!token || token.length === 0)
      throw new Error("Falha na criação do token de acesso!");

    expect(typeof token === "string").toBeTruthy();
  });

  test("USER - Teste na verificação do token de acesso", async () => {
    console.log("Inicio da verificação do token de acesso!");

    const token = await userService.createToken({
      email: dadosUsuario.email,
      password: dadosUsuario.password,
    });

    if (!token || token.length === 0)
      throw new Error("Falha na criação do token de acesso!");

    const resultado = await userService.verificToken(token);

    expect(resultado).toBeTruthy();
  });

  test("USER - Teste na verificação do id do usuário por meio do token de acesso", async () => {
    console.log(
      "Inicio da verificação do id do usuário por meio do token de acesso!"
    );

    const token = await userService.createToken({
      email: dadosUsuario.email,
      password: dadosUsuario.password,
    });

    if (!token || token.length === 0)
      throw new Error("Falha na criação do token de acesso!");

    const resultado = await userService.getIdByToken(token);

    expect(resultado).toBeTruthy();
  });

  /**
   * TESTES USER
   */

  /**
   * TESTES TODO
   */

  test("TODO - Teste na captura de task", async () => {
    console.log(
      "Iniciando a verificação de captura de task do usuário do token"
    );

    const token = await userService.createToken({
      email: dadosUsuario.email,
      password: dadosUsuario.password,
    });

    if (!token || token.length === 0)
      throw new Error("Falha na criação do token de acesso!");

    const idUsuario = await userService.getIdByToken(token);

    if (!idUsuario)
      throw new Error("Falha ao localizar o usuário a partir do seu token");

    const objeto = await todoService.getTask(idUsuario);

    expect(
      objeto === undefined || (objeto && Object.keys(objeto))
    ).toBeTruthy();
  });

  test("TODO - Teste na criação de task", async () => {
    console.log("Iniciando a verificação da criação do task");

    const token = await userService.createToken({
      email: dadosUsuario.email,
      password: dadosUsuario.password,
    });

    if (!token || token.length === 0)
      throw new Error("Falha na criação do token de acesso!");

    const idUsuario = await userService.getIdByToken(token);

    if (!idUsuario)
      throw new Error("Falha ao localizar o usuário a partir do seu token");

    const resultado = await todoService.createTaskTodo({
      idPessoa: idUsuario,
      descricao: "testeDescrição",
      status: "testeStatus",
    });

    expect(resultado).toBeTruthy();
  });

  /**
   * TESTES TODO
   */
});
