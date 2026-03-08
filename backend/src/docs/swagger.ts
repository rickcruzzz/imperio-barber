import { Express } from "express";
import swaggerUi from "swagger-ui-express";

const document = {
  openapi: "3.0.0",
  info: {
    title: "Barbershop API",
    version: "1.0.0",
    description: "API REST para sistema de barbearia premium",
  },
  servers: [{ url: "http://localhost:4000/api/v1" }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  paths: {
    "/auth/login": { post: { summary: "Login" } },
    "/auth/register": { post: { summary: "Cadastro" } },
    "/appointments": { get: { summary: "Listar agendamentos" }, post: { summary: "Criar agendamento" } },
    "/services": { get: { summary: "Listar servicos" } },
    "/barbers": { get: { summary: "Listar barbeiros" } },
  },
};

export function setupSwagger(app: Express) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(document));
}
