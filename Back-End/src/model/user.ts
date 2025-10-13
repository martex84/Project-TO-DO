import { Model, DataType, Optional, DataTypes, Sequelize } from "sequelize";
import sequelize from "../dataBase/connection.ts";

import type { UserAtributes } from "../types/dataBase.ts";

//Tipagem Campos

interface UserCreationAtributes extends Optional<UserAtributes, "id"> {}

class User
  extends Model<UserAtributes, UserCreationAtributes>
  implements UserAtributes
{
  public id!: number;
  public nome!: string;
  public email!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function inicializar(sequelize : Sequelize) {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true, //Desativo para deixar os testes mais fáceis
        validate:{
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "user",
      modelName: "User",
    }
  );
}

export const UserFunctions = {
  inicializar
}

export default User;
