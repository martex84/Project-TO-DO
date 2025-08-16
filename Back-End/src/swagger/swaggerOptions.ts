import packageJson from "../../package.json";

function swaggerOptions() {
  const title = "Back End Project To-Do";

  return {
    openapi: "3.0.0",
    info: {
      title: "Rotas do Back-end do Projeto TODO",
      version: packageJson.version,
      description: "Rotas utilizadas no back-end do projeto TODO",
    },
    paths: {
      "/user": {
        get: {
          tags: ["User"],
          summary: "Retorna os dados básicos do usuário",
          parameters: [
            {
              in: "header",
              name: "token",
              schema: {
                type: "string",
              },
              required: true,
            },
          ],
          responses: {
            "200": {
              description: "Usuário Encontrado",
              content: {
                "application/json": {
                  example: {
                    message: "Usuário Encontrado",
                    dadosUsuario: {
                      nome: "nomeUsuario",
                      email: "emailUsuario",
                    },
                  },
                },
              },
            },
            "401": {
              description: "Token Inválido",
              content: {
                "application/json": {
                  example: {
                    message: "Token Inválido",
                  },
                },
              },
            },
            "500": {
              description: "Falha na captura do usuário",
              content: {
                "application/json": {
                  example: {
                    message: "Falha na captura do usuário",
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ["User"],
          summary: "Cria um novo usuário no sistema",
          parameters: [
            {
              in: "header",
              name: "nome",
              schema: {
                type: "string",
              },
              required: true,
            },
            {
              in: "header",
              name: "email",
              schema: {
                type: "string",
              },
              required: true,
            },
            {
              in: "header",
              name: "password",
              schema: {
                type: "string",
              },
              required: true,
            },
          ],
          responses: {
            "200": {
              description: "Usuário criado com sucesso!",
              content: {
                "application/json": {
                  example: {
                    message: "Usuário criado com sucesso!",
                    token: "TOKEN"
                  },
                },
              },
            }
          },
        },
      },
      "/user/authenticate": {
        get: {
          tags: ["User"],
          summary: "Realiza a autenticação do usuário",
          parameters: [
            {
              in: "header",
              name: "email",
              schema: {
                type: "string",
              },
              required: true,
            },
            {
              in: "header",
              name: "password",
              schema: {
                type: "string",
              },
              required: true,
            },
          ],
          responses: {
            "200": {
              description: "Usuário Encontrado",
              content: {
                "application/json": {
                  example: {
                    message: "Usuário Encontrado",
                    token: "TOKEN"
                  },
                },
              },
            },
            "401": {
              description: "Usuário não encontrado",
              content: {
                "application/json": {
                  example: {
                    message: "Usuário não encontrado",
                  },
                },
              },
            }
          },
        }
      },
      "/task": {
        get: {
          tags: ["Task"],
          summary: "Retorna as task do usuário",
          parameters: [
            {
              in: "header",
              name: "token",
              schema: {
                type: "string",
              },
              required: true,
            },
          ],
          responses: {
            "200": {
              description: "Task encontrada",
              content: {
                "application/json": {
                  example: {
                    message: "Task encontrada",
                    tasks: [
                      {
                        descricao: "descricaoTask",
                        status: "statusTask",
                      }
                    ],
                  },
                },
              },
            },
            "401": {
              description: "Token Inválido",
              content: {
                "application/json": {
                  example: {
                    message: "Token Inválido",
                  },
                },
              },
            },
            "500": {
              description: "Falha na busca da task",
              content: {
                "application/json": {
                  example: {
                    message: "Falha na busca da task",
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ["Task"],
          summary: "Cria uma nova task para o usuário",
          parameters: [
            {
              in: "header",
              name: "descrição",
              schema: {
                type: "string",
              },
              required: true,
            },
            {
              in: "header",
              name: "status",
              schema: {
                type: "string",
              },
              required: true,
            }
          ],
          responses: {
            "200": {
              description: "Task criada com sucesso",
              content: {
                "application/json": {
                  example: {
                    message: "Task criada com sucesso"
                  },
                },
              },
            },
            "401": {
              description: "Token inválido",
              content: {
                "application/json": {
                  example: {
                    message: "Token inválido",
                  },
                },
              }
            },
            "500": {
              description: "Falha na criação da task",
              content: {
                "application/json": {
                  example: {
                    message: "Falha na criação da task",
                  },
                },
              },
            }
          },
        },
      },
    },
  };
}

export default swaggerOptions;
