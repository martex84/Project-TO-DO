import dataBase from "../dataBase/index.ts";
import user from "../dataBase/user.ts";
import { UserTable, SimplesUserTable } from "../types/dataBase.ts";

describe("Testes Data Base", () => {
  let usuario: UserTable;

  test("Teste verificação/criação de banco de dados", async () => {
    console.log("Iniciando teste verificação");
    const resultado = await dataBase.initDataBase();
    expect(resultado).toBeTruthy();
  });

  test("Teste na captura de usuário", async () => {
    console.log("Iniciando a verificação de captura do primeiro usuário");

    const objeto = await user.getDataUser(1);

    expect(
      objeto === undefined || (objeto && Object.keys(objeto))
    ).toBeTruthy();
  });

  test("Teste na checkagem do usuário", async () => {
    console.log("Iniciando a verificação da checagem do usuário");

    const objeto = await user.checkUser("teste@teste1", "teste");

    expect(typeof objeto === "boolean").toBeTruthy();
  });

  test.skip("Teste na criação de usuário", async () => {
    console.log("Iniciando a verificação da criação do usuário");

    const resultado = await user.createUser(
      "nomeTeste",
      "teste@teste1",
      "teste"
    );

    expect(resultado).toBeTruthy();
  });

  let token: string | undefined;

  test("Teste na criação do token de acesso", async () => {
    console.log("Inicio da criação do token de acesso!");
    token = await user.createToken("email", "senha");

    console.log("token: '" + token + "'");

    expect(typeof token === "string").toBeTruthy();
  });

  test("Teste na verificação do token de acesso", async () => {
    console.log("Inicio da verificação do token de acesso!");

    if (!token) throw new Error("Falha na captura do token");


    // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsIiwicGFzc3dvcmQiOiJzZW5oYSIsImlhdCI6MTc1NTIxNTUyMSwiZXhwIjoxNzU1MjE1NTIyfQ.0MwiZloHIDQ191l-1A3V3xXGcpmFHI8YPyWDRvE3yOo"

    const resultado = await user.verificToken(token);

    expect(resultado).toBeTruthy();
  });
});
