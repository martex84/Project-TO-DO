import dataBase from "./dataBase/index.ts";
import dadosServidor from "./server.ts";

//Inicia o banco de dados de Usuario
dataBase.initDataBase();

//Inicia o servidor
dadosServidor.server();