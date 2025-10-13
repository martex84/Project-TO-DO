import { InferAttributes, InferCreationAttributes, Model } from "sequelize";

export interface UserTable {
  id: number;
  nome: string;
  email: string;
  password: string;
}

export interface SimplesUserTable {
  nome: string;
  email: string;
}

export interface SimpleTodo {
  descricao: string;
  status: string;
}

export interface DadosToken {
  email: string;
  password: string;
}

export interface TodoModel
  extends Model<InferAttributes<TodoModel>, InferCreationAttributes<TodoModel>> {
    id: number,
    id_pessoa: number,
    descricao: string,
    status: string,
    concluido: number
  }

export interface UserModel
  extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {}

export interface UserAtributes{
  id: number,
  nome: string,
  email: string,
  password: string
}
export interface TodoAtributes{
  id: number,
  id_pessoa: number,
  descricao: string,
  status: string,
  concluido: number
}