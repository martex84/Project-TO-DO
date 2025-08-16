import sqlite3 from "sqlite3";
import {open} from "sqlite";
import user from "./user.ts";
import todo from "./todo.ts";

const fileName = "./src/dataBase/dataBase.db";

async function initDataBase(){
    let returno = false;

    const dataBase = getDataBase();

  await dataBase.then(async db => {
    //Irá realizar a verificação/criação da tabela pessoa
    await db.exec(user.createTableUser()).then(()=> {
        console.log("Criando a tabela Pessoa!");
        returno = true;
    });

    //Irá realizar a verificação/criação da tabela todo
    await db.exec(todo.createTableTodo()).then(()=> {
        console.log("Criando a tabela TODO!");
        returno = true;
    });
   }).catch(error => {
    console.log(error);
   })

   return returno
}

async function getDataBase(){
   return open({
        filename: fileName,
        driver: sqlite3.Database
    })
}

const dataBase = {
    fileName,
    initDataBase,
    getDataBase
}

export default dataBase;