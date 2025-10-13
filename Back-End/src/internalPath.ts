import path from "path";
import { EnumPath } from "./enums/path";

export default function caminho(caminho : EnumPath){
    switch(caminho){
        case EnumPath.ENV:{
            return path.resolve(".","src", "env")
            break;     
        }
        
        default:{
            throw new Error("Falha na captura do caminho escolhido")
        }
    }
}
