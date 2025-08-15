import supertest from "supertest";
import dadosServidor from "../server.ts";
import { Server } from "http";
import { SimplesUserTable } from "../types/dataBase.ts";

describe.skip("Teste", () => {
  let server: Server | undefined;

  const app = dadosServidor.app();

  if (!app) throw new Error("Falha ao encontrar o app");

  beforeAll(() => {
    console.log("Conectando o servidor");

    server = app.listen(3000);
  });

  afterAll((done) => {
    if (server) {
      console.log("Encerrando o servidor");

      server.close(() => done());
    }
  });

  test("Conexao com Servidor", async () => {
    console.log("Iniciando a verificação da conexão do servidor!");

    expect(server).toBeTruthy();
  });

  test("Conexao rota padrao", async () => {
    const dados = await supertest(app).get("/");

    expect(dados).toBeTruthy();
  });

  test("Conexao para captura de dados do usuário", async () => {
    console.log("Iniciando a verificação da captura de dados do usuário!");

    const dados = await supertest(app).get("/user");

    const dadosBody = dados.body;

    expect(dadosBody).toBeTruthy();
  });

  test("Conexao para inclusão de novo do usuário", async () => {
    console.log("Iniciando a verificação da inclusão de novo usuário!");

    const dados = await supertest(app).post("/user").send({
      nome: "testeNome",
      email: "teste@teste",
      password: "teste",
    });

    const dadosBody = dados.body;

    expect(dadosBody).toBeTruthy();
  });

  test("Conexao para realizar a utenticação do usuário", async () => {
    console.log("Iniciando a verificação da autenticação do usuário!");

    const dados = await supertest(app).get("/user/authenticate").send({
      email: "teste@teste1",
      password: "teste",
    });

    expect(dados.status === 200 || dados.status === 401).toBeTruthy();
  });
});
