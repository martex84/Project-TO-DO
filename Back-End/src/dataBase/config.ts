import type { Options, Dialect } from "sequelize";
import {envVariables} from "../enums/envs"
import env from "../env";

function getDialect () : Dialect{
    const valorEnv = env(envVariables.DIALECT).toLowerCase();

    switch(valorEnv){
        case "sqlite":{
            return "sqlite"
        }

        default:{
            throw new Error("Não foi possível localizar o tipo de banco de dados")
        }
    }
}

function getConfig() : Options{
    const dialect = getDialect();

    const options : Options = {
        dialect: dialect,
        storage: env(envVariables.STORAGE),
        logging: false,
        database: env(envVariables.NAME)
    }

    return options
}



export default{
    getConfig
}



// export default options