import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const swaggerDef = {
  swaggerDefinition: {
    info: {
      title: "error-logger", // Title (required)
      version: "1.0.0", // Version (required)
      description: "Error Logger API" // Description (optional)
    },
    basePath: "/api" // Base path (optional)
  },
  apis: ["**/*.ts"] // Path to the API docs
};
const swaggerSpec = swaggerJSDoc(swaggerDef);

export default function(app: Express): void {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
