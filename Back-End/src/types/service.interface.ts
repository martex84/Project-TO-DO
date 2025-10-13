export interface CreateUser {
  /**Recebe o email do usuário*/
  email: string;

  /**Recebe o nome do usuário*/
  nome: string;

  /**Recebe a senha do usuário*/
  password: string;
}

export interface CreateTokenUser{
  /**Recebe o e-mail que será usado na criação do token*/
  email: string,

  /**Recebe a senha que será usado na criação do token*/
  password: string
}

export interface GetIdByEmailPasswordUser{
  /**Recebe o e-mail do usuário*/
  email: string,

  /**Recebe a senha do usuário*/
  password: string
}

export interface GetDadosSimplesUser{
  nome: string,
  email: string
}

export interface CreateTodo{
  /**Recebe o id da pessoa que criou a task*/
  idPessoa: number,

  /**Recebe a descrição da task*/
  descricao: string

    /**Recebe o status da task*/
  status: string
}