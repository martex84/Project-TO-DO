export interface UserTable{
    id: number,
    nome: string,
    email: string,
    password: string
}

export interface SimplesUserTable{
    nome: string,
    email: string,
}

export interface SimpleTodo{
    descricao: string,
    status: string
}

export interface DadosToken{
    email: string,
    password: string
}