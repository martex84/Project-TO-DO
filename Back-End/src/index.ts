import { initDb } from "./dataBase/connection.ts";
import {carregarEnv} from "./env"
import dadosServidor from "./server.ts";


//Carrega os dados do env
carregarEnv();

//Inicia o banco de dados
initDb().then(() => {
  //Inicia o servidor
  dadosServidor.server();
});
