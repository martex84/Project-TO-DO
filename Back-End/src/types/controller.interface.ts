import {SimpleTodo} from "./dataBase"

export interface ObjetoRetornoCreateUser {
  mensagem: string;
  token?: string;
}

export interface ObjetoRetornoGetUser {
  status: number;
  message: string;
  dadosUsuario?: {
    nome: string;
    email: string;
  };
}

/**
 * Interface para o objeto de retorno da autenticacão
 */
export interface ObjetoRetornoAuthenticate{
  /**
   * Número do status da conexão
   */
  status: number;

  /**
   * Mensagem sobre a autenticação
   */
  message: string;

  /**
   * Objeto com dados do retorno
   */
  return?:{

    /**
     * Token de acesso
     */
    token: string
  }
}

export interface ObjetoRetornoCreateTodo{
  message: string,
  status: number
}

export interface ObjetoRetornoGetTodo{
  message: string,
  status: number,
  task?: SimpleTodo[]
}
