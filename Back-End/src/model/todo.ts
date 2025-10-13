import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import type { TodoAtributes } from "../types/dataBase.ts";

interface TodoCreationAtributes extends Optional<TodoAtributes, "id"> {}

export default class Todo
  extends Model<TodoAtributes, TodoCreationAtributes>
  implements TodoAtributes {
    public id!: number;
    public id_pessoa!: number;
    public descricao!: string;
    public status!: string;
    public concluido!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date
  }

function inicializar(sequelize: Sequelize){
    Todo.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        id_pessoa: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        descricao: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        status: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        concluido: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },{
        sequelize,
        tableName: "todo",
        modelName: "Todo"
    })
}

export const TodoFunctions = {
    inicializar
}
