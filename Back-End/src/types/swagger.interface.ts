export interface Path{
    rote: string,
    get?: TypePath,
    post?: TypePath
}

interface TypePath{
    sumary: string,
    response:{
        "200"?: Response,
        "404"?: Response
    }
}

interface Response{
    description: string,
    content:{
        "application/json"?: Content
    }
}

interface Content{
    example: {
        message: string
    }
}