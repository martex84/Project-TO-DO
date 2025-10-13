// import dataBase from "./dataBase/connectionAntiga.ts";
import dataBase from "./dataBase/connection.ts";
import { initDb } from "./dataBase/connection.ts";
import dotenv from "dotenv";
import { nameTables } from "./enums/dataBase.ts";
import dadosServidor from "./server.ts";
import internalPath from "./internalPath.ts";
import { EnumPath } from "./enums/path.ts";
import { AMBIENTES } from "./enums/ambientes.ts";

//Carrega os dados do env
dotenv.config({
  path: internalPath(EnumPath.ENV) + "/.env",
});

const ambienteAtual = process.env.NODE_ENV;

//Carrega dados do env no ambiente de desenvolvimento
if (ambienteAtual === AMBIENTES.DEVELOPMENT) {
  dotenv.config({
    path: internalPath(EnumPath.ENV) + "/.env.development",
  });
}
else if(ambienteAtual === AMBIENTES.TEST)

//Inicia o banco de dados
initDb().then(() => {
  //Inicia o servidor
  dadosServidor.server();

  // dataBase.createTables(dataBase.connectionDataBase());

  // console.log(dataBase.getTables(dataBase.connectionDataBase(), nameTables.TODO).then(conecao => {
  //     return conecao.findAll();
  // }));
});
