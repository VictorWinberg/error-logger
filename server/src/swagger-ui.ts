import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const swaggerDef = {
  swaggerDefinition: {
    info: {
      title: "Glitchy", // Title (required)
      version: "1.0.0", // Version (required)
      description: "Glitchy API" // Description (optional)
    },
    basePath: "/api" // Base path (optional)
  },
  apis: ["**/*.ts"] // Path to the API docs
};
export const swaggerSpec = swaggerJSDoc(swaggerDef);

export default function(app: Express): void {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
