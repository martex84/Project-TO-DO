import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./swagger/swaggerOptions.ts";
import routes from "./Routes/index.ts";
import cors from "cors";

function app() {
  try {
    const app = express();

    app.use(express.json());

    app.use(cors());

    app.get("/", (req, res) => {
      res.send({ conexao: true });
    });

    app.use(routes);

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions()));

    return app;
  } catch (error) {}
}

async function server() {
  const port = 3000;
  const link = "http://localhost:";

  const appIniciada = app();

  if (!appIniciada) throw new Error("Falha ao localizar o app");

  return new Promise((resolve, reject) => {
    try {
      appIniciada.listen({ port: port }, (req) => {
        if (req) throw req;

        console.log("Server iniciado em '" + link + port + "'");

        resolve(true);
      });
    } catch (error) {
      console.error("Foi encontrado a seguinte falha no servidor:\n" + error);

      reject(error);
    }
  });
}

function verificaLoginSenha(email: string, password: string) {
  let retorno = true;

  if (!email || !password) throw new Error("Falha ao receber login e senha!");

  if (email !== "email") retorno = false;

  if (retorno && password !== "password") retorno = false;

  return retorno;
}

const dadosServidor = {
  app,
  server,
};

export default dadosServidor;
