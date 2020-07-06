import { Express } from "express";
import fs from "fs";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { CodeGen } from "swagger-typescript-codegen";

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
  console.log(swaggerSpec);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const codeGenApi = CodeGen.getTypescriptCode({ swagger: swaggerSpec as any });
  fs.writeFile("api.ts", codeGenApi, err => err && console.error(err));

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
