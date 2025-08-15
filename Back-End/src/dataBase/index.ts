import sqlite3 from "sqlite3";
import {open} from "sqlite";
import user from "./user.ts";

const fileName = "./src/dataBase/dataBase.db";

async function initDataBase(){
    let returno = false;

    const dataBase = getDataBase();

  await dataBase.then(async db => {
    await db.exec(user.createTableUser()).then(()=> {
        console.log("Criando a tabela Pessoa!");
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