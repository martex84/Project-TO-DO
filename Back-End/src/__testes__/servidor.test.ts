import supertest from "supertest";
import dadosServidor from "../server.ts";
import { Server } from "http";
import { SimplesUserTable } from "../types/dataBase.ts";
import { getSequelize, initDb, removeDb } from "../dataBase/connection.ts";
import { Sequelize } from "sequelize";
import { carregarEnv } from "../env/index.ts";
import valorEnv from "../env/index.ts";
import { envVariables } from "../enums/envs.ts";
import userService from "../service/user.service.ts";

interface DadosUsuario {
  nome: string;
  email: string;
  password: string;
}

interface DadosTask {
  descricao: string;
  status: string;
}

describe("Teste Servidor", () => {
  let server: Server | undefined;

  let sequelize: Sequelize | null = null;

  let dadosUsuario: DadosUsuario = {
    nome: "",
    email: "",
    password: "",
  };

  let dadosTask: DadosTask = {
    descricao: "Descrição Teste",
    status: "Status",
  };

  const app = dadosServidor.app();

  if (!app) throw new Error("Falha ao encontrar o app");

  beforeAll(async () => {
    console.log("Preprando configurações para os testes!");

    //Conectando com o banco de dados
    try {
      await carregarEnv();

      dadosUsuario = {
        nome: valorEnv(envVariables.DADOS_USUARIO_TESTE_NOME),
        email: valorEnv(envVariables.DADOS_USUARIO_TESTE_EMAIL),
        password: valorEnv(envVariables.DADOS_USUARIO_TESTE_PASSWORD),
      };

      let idUsuario: number | undefined;

      sequelize = getSequelize();

      await initDb(sequelize);

      //Criando usuário teste
      idUsuario = await userService.createUser(dadosUsuario);

      if (!idUsuario) throw new Error("Falha na captura do id do usuário");
    } catch (error) {
      console.error(
        "Falha na configuração do banco de dados nas configurações inicias!" +
          "\n" +
          error
      );
    }

    try {
      console.log("Conectando o servidor");

      server = app.listen(3000);
    } catch (error) {
      console.error("Falha na coneção com o servidor!" + "\n" + error);
    }
  });

  afterAll(async () => {
    //Encerramento do servidor
    try {
      if (server) {
        console.log("Encerrando o servidor");

        server.close();
      }
    } catch (error) {
      console.error("Falha no encerramento do servidor!" + "\n" + error);
    }

    //Apagando os dados das tabelas
    try {
      await removeDb();
    } catch (error) {
      console.error(
        "Falha na remoção das tabelas do banco de dados!" + "\n" + error
      );
    }
  });

  test("SERVIDOR - Conexao com Servidor", async () => {
    console.log("Iniciando a verificação da conexão do servidor!");

    expect(server).toBeTruthy();
  });

  test("SERVIDOR - Conexao rota padrao", async () => {
    const dados = await supertest(app).get("/");

    expect(dados).toBeTruthy();
  });

  test("SERVIDOR - Conexao para captura de dados do usuário", async () => {
    console.log("Iniciando a verificação da captura de dados do usuário!");

    const token = await userService.createToken({
      email: dadosUsuario.email,
      password: dadosUsuario.password,
    });

    const dados = await supertest(app).get("/user").set({ token });

    const dadosBody = dados.body;

    expect(dadosBody).toBeTruthy();
  });

  test("SERVIDOR - Conexao para inclusão de novo do usuário", async () => {
    console.log("Iniciando a verificação da inclusão de novo usuário!");

    const dados = await supertest(app).post("/user").set({
      nome: dadosUsuario.nome,
      email: dadosUsuario.email,
      password: dadosUsuario.password,
    });

    const dadosBody = dados.body;

    expect(dadosBody).toBeTruthy();
  });

  test("SERVIDOR - Conexao para realizar a autenticação do usuário", async () => {
    console.log("Iniciando a verificação da autenticação do usuário!");

    const dados = await supertest(app).get("/user/authenticate").set({
      email: dadosUsuario.email,
      password: dadosUsuario.password,
    });

    expect(dados.status === 200 || dados.status === 401).toBeTruthy();
  });

  test("SERVIDOR - Conexão para a captura de dados da task do usuário", async () => {
    console.log("Iniciando a verificação da captura de task do usuário!");

    const token = await userService.createToken({
      email: dadosUsuario.email,
      password: dadosUsuario.password,
    });

    const dados = await supertest(app).get("/task").set({ token });

    const dadosBody = dados.body;

    expect(dadosBody).toBeTruthy();
  });

  test("SERVIDOR - Conexao para inclusão de nova task do usuário", async () => {
    console.log("Iniciando a verificação da inclusão de nova task do usuário!");

    const token = await userService.createToken({
      email: dadosUsuario.email,
      password: dadosUsuario.password,
    });

    const dados = await supertest(app).post("/task").set({
      token,
      descricao: dadosTask.descricao,
      status: dadosTask.status,
    });

    const dadosBody = dados.body;

    expect(dadosBody).toBeTruthy();
  });
});
