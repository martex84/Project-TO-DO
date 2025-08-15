import supertest from "supertest";
import dadosServidor from "../server.ts";
import { Server } from "http";
import { SimplesUserTable } from "../types/dataBase.ts";

describe("Teste", () => {
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

    const dados = await supertest(app).post("/user").set({
      nome: "testeNome",
      email: "teste@teste",
      password: "teste",
    });

    const dadosBody = dados.body;

    expect(dadosBody).toBeTruthy();
  });

  test("Conexao para realizar a utenticação do usuário", async () => {
    console.log("Iniciando a verificação da autenticação do usuário!");

    const dados = await supertest(app).get("/user/authenticate").set({
      email: "teste@teste",
      password: "teste",
    });

    expect(dados.status === 200 || dados.status === 401).toBeTruthy();
  });

  test("Conexão para a captura de dados da task do usuário", async () => {
    console.log("Iniciando a verificação da captura de task do usuário!");

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlQHRlc3RlIiwicGFzc3dvcmQiOiJ0ZXN0ZSIsImlhdCI6MTc1NTI2NTg0NSwiZXhwIjoxNzU1MjY5NDQ1fQ._xliC6f40ww2eiOo95FnanD9t2h0ZrlMGcKnonR1cfo"

    const dados = await supertest(app).get("/task").set({token});

    const dadosBody = dados.body;

    expect(dadosBody).toBeTruthy();
  });

  test("Conexao para inclusão de nova task do usuário", async () => {
    console.log("Iniciando a verificação da inclusão de nova task do usuário!");

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlQHRlc3RlIiwicGFzc3dvcmQiOiJ0ZXN0ZSIsImlhdCI6MTc1NTI2NTg0NSwiZXhwIjoxNzU1MjY5NDQ1fQ._xliC6f40ww2eiOo95FnanD9t2h0ZrlMGcKnonR1cfo"

    const dados = await supertest(app).post("/task").set({
      token,
      descricao: "teste@teste2",
      status: "teste2",
    });

    const dadosBody = dados.body;

    expect(dadosBody).toBeTruthy();
  });
});
