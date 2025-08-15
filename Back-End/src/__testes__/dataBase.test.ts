import dataBase from "../dataBase/index.ts";
import todo from "../dataBase/todo.ts";
import user from "../dataBase/user.ts";
import { UserTable, SimplesUserTable } from "../types/dataBase.ts";

describe("Testes Data Base", () => {
  test("Teste verificação/criação de banco de dados", async () => {
    console.log("Iniciando teste verificação");
    const resultado = await dataBase.initDataBase();
    expect(resultado).toBeTruthy();
  });
});

describe("Testes Tabela User", () => {
  let usuario: UserTable;

  test("Teste na captura de usuário", async () => {
    console.log("Iniciando a verificação de captura do primeiro usuário");

    const objeto = await user.getDataUser(1);

    expect(
      objeto === undefined || (objeto && Object.keys(objeto))
    ).toBeTruthy();
  });

  test("Teste na checkagem do usuário", async () => {
    console.log("Iniciando a verificação da checagem do usuário");

    const objeto = await user.checkUser("teste@teste", "teste");

    expect(typeof objeto === "boolean").toBeTruthy();
  });

  test.skip("Teste na criação de usuário", async () => {
    console.log("Iniciando a verificação da criação do usuário");

    const resultado = await user.createUser(
      "testeNome",
      "teste@teste",
      "teste"
    );

    expect(resultado).toBeTruthy();
  });

  test("Teste na criação do token de acesso", async () => {
    console.log("Inicio da criação do token de acesso!");
    const token = await user.createToken("email", "senha");

    console.log("token: '" + token + "'");

    expect(typeof token === "string").toBeTruthy();
  });

  test("Teste na verificação do token de acesso", async () => {
    console.log("Inicio da verificação do token de acesso!");

    const token = await user.createToken("email", "senha");

    if (!token) throw new Error("Falha na captura do token");

    const resultado = await user.verificToken(token);

    expect(resultado).toBeTruthy();
  });

  test("Teste na verificação do id do usuário por meio do token de acesso", async () => {
    console.log(
      "Inicio da verificação do id do usuário por meio do token de acesso!"
    );

    const token = await user.createToken("teste@teste", "teste");

    if (!token) throw new Error("Falha na captura do token");

    const resultado = await user.getIdByToken(token);

    expect(resultado).toBeTruthy();
  });
});

describe("Testes Tabela TODO", () => {
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlQHRlc3RlIiwicGFzc3dvcmQiOiJ0ZXN0ZSIsImlhdCI6MTc1NTI1MTQwMCwiZXhwIjoxNzU1MjU1MDAwfQ.W18zyWtt6HW8Olr9llwCCQvUF8blDnBH6EV_9K7wd4E";

  test("Teste na captura de task", async () => {
    console.log(
      "Iniciando a verificação de captura de task do usuário do token"
    );

    const idUsuario = await user.getIdByToken(token);

    if (!idUsuario)
      throw new Error("Falha ao localizar o usuário a partir do seu token");

    const objeto = await todo.getTask(idUsuario);

    expect(
      objeto === undefined || (objeto && Object.keys(objeto))
    ).toBeTruthy();
  });

  test("Teste na criação de task", async () => {
    console.log("Iniciando a verificação da criação do task");

    const idUsuario = await user.getIdByToken(token);

    if (!idUsuario)
      throw new Error("Falha ao localizar o usuário a partir do seu token");

    const resultado = await todo.createTaskTodo(
      idUsuario,
      "testeDescrição",
      "testeStatus"
    );

    expect(resultado).toBeTruthy();
  });
});
