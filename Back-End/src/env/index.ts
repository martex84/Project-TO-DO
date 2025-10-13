import { EnvDevelopment } from "../enums/envs";

export default (variavel: EnvDevelopment) => {
  let retorno = undefined;

  switch (variavel) {
    case EnvDevelopment.DIALECT: {
      retorno = process.env.DIALECT;
      break;
    }

    case EnvDevelopment.STORAGE: {
      retorno = process.env.STORAGE;

      break;
    }

    default: {
      throw new Error("Falha ao encontrar a variável informada");
    }
  }

  return retorno || "";
};
