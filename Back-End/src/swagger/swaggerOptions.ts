import packageJson from "../../package.json" with {type: 'json'};

function swaggerOptions() {
  const title = "Back End Project To-Do"

  return {
    openapi: "3.0.0",
    info: {
      title: title,
      version: packageJson.version,
      description: packageJson.description,
    },
    paths: {
      "/user": {
        get: {
          summary: "Retorna o token do usuário",
          responses: {
            "200": {
              description: "Usuário Encontrado",
              content: {
                "application/json": {
                  example: {
                    message: "Usuário Encontrado",
                  },
                },
              },
            },
            "401":{
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
        },
      },
    },
  };
}

export default swaggerOptions